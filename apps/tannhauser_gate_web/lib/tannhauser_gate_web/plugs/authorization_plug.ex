defmodule TannhauserGateWeb.AuthorizationPlug do
  import Plug.Conn
  import Phoenix.Controller
  import TannhauserGateWeb.Helpers
  import TannhauserGateWeb.JwtToken

  @session_cookie_key "x-session-token"

  def init(default), do: default

  @spec put_error_response(Plug.Conn.t(), String.t()) :: Plug.Conn.t()
  defp put_error_response(conn, reason) do
    conn
    |> put_view(TannhauserGateWeb.ErrorView)
    |> render("error.json", error: reason)
    |> halt()
  end

  @spec check_cookie(Plug.Conn.t(), String.t()) :: Plug.Conn.t()
  defp check_cookie(conn, cookie) do
    IO.puts "cookie: #{inspect cookie}"
    case validate_jwt_token(cookie) do
      {:ok, username} ->
        conn |> assign(:username, username)
      {:error, reason} ->
        conn |> put_error_response(inspect reason)
    end
  end

  def call(conn, _default) do
    # Getting session cookie token from connection
    case get_cookie(conn, @session_cookie_key) do
      {:ok, cookie} ->
        conn |> check_cookie(cookie)
      {:error, reason} ->
        conn |> put_error_response(reason)
    end
  end

end
