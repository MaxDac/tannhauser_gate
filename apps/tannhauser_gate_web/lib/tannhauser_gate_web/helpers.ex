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

  @spec is_current_user(%Plug.Conn{}, any()) :: boolean()
  def is_current_user(%Plug.Conn{
    assigns: assigns
  }, id), do: to_string(assigns[:user_id]) == to_string(id)
end
