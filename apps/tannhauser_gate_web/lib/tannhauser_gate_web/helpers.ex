defmodule TannhauserGateWeb.Helpers do
  import Plug.Conn

  alias TannhauserGate.Users

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

  @spec is_admin(%Plug.Conn{}) :: boolean()
  def is_admin(%Plug.Conn{
    assigns: %{
      :user_id => user_id
    }
  }) do
    with user <- Users.get_user!(user_id) do
      not is_nil(user.admin) and user.admin
    else
      _ -> false
    end
  end

  def is_admin(_), do: false
end
