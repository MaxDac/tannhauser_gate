defmodule TannhauserGateWeb.AppConnector do
  @moduledoc false

  use GenServer
  require Logger

  @chat_pod_name      ~r/^(chat)(.*)$/
  @env_pod_namespace  "MY_POD_NAMESPACE"
  @env_pod_name       "MY_POD_NAME"

  @doc """
  This function decodes the JSON from the Kubernetes API,
  extracting the name and the IP.
  """
  @spec decode_api!(String.t(), Regex.t()) :: %{}
  def decode_api!(body, regex \\ @chat_pod_name) do
    case Poison.decode(body) do
      {:ok, %{"items" => items}} ->
        items
        |> Enum.map(fn
          %{
            "metadata" => %{
              "name" => name
            },
            "status" => %{
              "podIP" => pod_ip
            }
          } ->
            Logger.info("Found #{name}: #{pod_ip}")
            %{name: name, pod_ip: pod_ip}
        end)
        |> Enum.filter(fn %{name: name} -> String.match?(name, regex) end)
      {:error, _} ->
        %{}
    end
  end

  @spec call_api!(String.t()) :: %{}
  def call_api!(url) do
    case HTTPoison.get url do
      {:ok, %HTTPoison.Response{body: body}} ->
        decode_api!(body)
      {:error, e} ->
        Logger.error("Error while interrogating the api: #{inspect e}")
        raise e
    end
  end

  @spec build_api_url(String.t()) :: String.t()
  def build_api_url(pod_namespace), do:
    "http://localhost:8001/api/v1/namespaces/#{pod_namespace}/pods"

  @spec connect_node(any, %{pod_ip: String.t()}) :: {:error} | {:ok}
  def connect_node(pod_namespace, %{pod_ip: pod_ip}) do
    pod_identifier = String.to_atom(pod_namespace <> "@" <> pod_ip)
    case Node.connect(pod_identifier) do
      true ->
        Logger.info("Node #{pod_identifier} connected")
        {:ok}
      false ->
        Logger.info("Node #{pod_identifier} not connected")
        {:error}
    end
  end

  @spec connect_nodes :: {:ok} | {:error, String.t()}
  def connect_nodes() do
    try do
      pod_namespace = System.get_env(@env_pod_namespace)
      pod_name      = System.get_env(@env_pod_name)

      cond do
        # not Node.alive? ->
        #   error = "Node is not alive"
        #   Logger.info(error)
        #   {:error, error}

        is_nil(pod_namespace) or is_nil(pod_name) ->
          error = "Name and namespace env don't have value"
          Logger.info(error)
          {:error, error}

        true ->
          build_api_url(pod_namespace)
          |> call_api!()
          |> Enum.each(&connect_node(pod_namespace, &1))
          {:ok}

      end
    rescue
      ex ->
        Logger.info("Error while connecting nodes: #{inspect ex}")
        {:error, inspect ex}
    end
  end

  def init(params) do
    {:ok, params}
  end

  def start_link(state) do
    result = GenServer.start_link(__MODULE__, state, name: __MODULE__)
    GenServer.cast(TannhauserGateWeb.AppConnector, :try_connect)
    result
  end

  def handle_cast(:try_connect, _state) do
    case connect_nodes() do
      {:ok}             ->
        {:noreply, :ok}
      {:error, reason}  ->
        Logger.info "Connection failed for #{reason}. Retrying in 5 seconds."
        :timer.sleep(5000)
        GenServer.cast(TannhauserGateWeb.AppConnector, :try_connect)
        {:noreply, :error}
    end
  end

end
