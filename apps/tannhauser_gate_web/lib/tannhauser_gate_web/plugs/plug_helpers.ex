defmodule TannhauserGateWeb.PlugHelpers do
  import Plug.Conn
  import Phoenix.Controller
  import TannhauserGateWeb.Helpers
  import TannhauserGateWeb.JwtToken

  @session_cookie_key "x-session-token"

  @spec put_error_response(Plug.Conn.t(), String.t()) :: Plug.Conn.t()
  def put_error_response(conn, reason) do
    conn
    |> put_view(TannhauserGateWeb.ErrorView)
    |> render("error.json", error: reason)
    |> halt()
  end

  @spec check_cookie(Plug.Conn.t(), String.t()) :: Plug.Conn.t()
  def check_cookie(conn, cookie, block_unauthorized \\ true)

  def check_cookie(conn, "", false), do: conn

  def check_cookie(conn, "", true), do:
    conn
    |> put_error_response("User not logged")

  def check_cookie(conn, cookie, block_unauthorized) do
    case {validate_jwt_token(cookie), block_unauthorized} do
      {{:ok, user_id}, _} ->
        conn
        |> assign_tokens(user_id)
      {_, false} ->
        conn
      {{:error, reason}, _} ->
        IO.inspect reason
        conn
        |> put_error_response("User unauthorized")
    end
  end

  @spec assign_tokens(Plug.Conn.t(), String.t()) :: Plug.Conn.t()
  def assign_tokens(conn, user_id) do
    conn
    |> assign(:user_id, user_id)
  end

  @spec call_impl(Plug.Conn.t(), bool) :: Plug.Conn.t()
  def call_impl(conn, block_unauthorized) do
    # Getting session cookie token from connection
    case {get_cookie(conn, @session_cookie_key), block_unauthorized} do
      {{:ok, cookie}, _} when cookie != "" ->
        conn |> check_cookie(cookie, block_unauthorized)
      {{:ok, _}, true} ->
        conn |> put_error_response("Cookie null")
      {_, false} ->
        conn
      {{:error, reason}, _} ->
        conn |> put_error_response(reason)
    end
  end
end
