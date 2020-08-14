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
  @spec decode_api(String.t(), Regex.t()) :: %{}
  def decode_api(body, regex \\ @chat_pod_name) do
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

  @spec call_api(String.t()) :: %{}
  def call_api(url) do
    case HTTPoison.get url do
      {:ok, %HTTPoison.Response{body: body}} ->
        {:ok, decode_api(body)}
      {:error, e} ->
        Logger.error("Error while interrogating the api: #{inspect e}")
        {:error}
    end
  end

  def build_api_url(pod_namespace), do:
    "http://localhost:8001/api/v1/namespaces/#{pod_namespace}/pods"

  def connect_node(pod_namespace, %{pod_ip: pod_ip}) do
    pod_identifier = "#{pod_namespace}@#{pod_ip}}"
    case Node.connect(pod_identifier) do
      true ->
        Logger.info("Node #{pod_identifier} connected")
      false ->
        Logger.info("Node #{pod_identifier} not connected")
    end

    {:ok}
  end

  def connect_nodes() do
    try do
      pod_namespace = System.get_env(@env_pod_namespace)
      pod_name      = System.get_env(@env_pod_name)

      cond do
        not Node.alive? ->
          Logger.info("Node is not alive")
        is_nil(pod_namespace) or is_nil(pod_name) ->
          Logger.info("Name and namespace env don't have value")
        true ->
          build_api_url(pod_namespace)
          |> call_api()
          |> Enum.each(&connect_node(pod_namespace, &1))
      end
    catch
      ex ->
        Logger.info("Error while connecting nodes: #{inspect ex}")
    end

    {:ok}
  end

  def init(params) do
    {:ok, params}
  end

  def start_link(state) do
    connect_nodes()
    GenServer.start_link(__MODULE__, state, name: __MODULE__)
  end

end
