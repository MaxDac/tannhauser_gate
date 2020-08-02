defmodule TannhauserGateWeb.Helpers do
  import Plug.Conn

  @spec get_cookie(Plug.Conn.t(), String.t()) :: {:ok, String.t()} | {:error, String.t()}
  def get_cookie(conn, key) do
    conn = conn |> fetch_cookies()

    try do
      case conn.req_cookies[key] do
        nil -> {:error, :not_found}
        c   -> {:ok, c}
      end
    catch
      e ->
        {:error, inspect e}
    end
  end
end
