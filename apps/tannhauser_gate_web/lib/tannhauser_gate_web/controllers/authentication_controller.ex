defmodule TannhauserGateWeb.AuthenticationController do
  use TannhauserGateWeb, :controller

  alias TannhauserGate.Users
  alias TannhauserGateWeb.ErrorView
  alias TannhauserGateWeb.GenericView
  alias TannhauserGateWeb.UserView
  alias TannhauserGateWeb.JwtToken

  import Plug.Conn

  @session_cookie_key "x-session-token"

  @spec authenticate(Plug.Conn.t(), map) :: Plug.Conn.t()
  def authenticate(conn, %{
    "username" => username,
    "password" => password
  }) do
    case Users.authenticate(username, password) do
      {:error, _} ->
        conn
        |> put_view(ErrorView)
        |> render("error.json", error: "User unauthorized")

      {:ok, user} ->
        {:ok, token} = JwtToken.get_jwt_token(user.id)

        conn
        |> put_resp_cookie(@session_cookie_key, token)
        |> put_view(UserView)
        |> render("show.json", user: user)
    end
  end

  @spec assign_tokens(Plug.Conn.t(), String.t()) :: Plug.Conn.t()
  def assign_tokens(conn, user_id) do
    token = Phoenix.Token.sign(conn, "user socket", user_id)

    conn
    |> assign(:user_id, user_id)
    |> assign(:user_token, token)
  end

  @spec request_chat_token(Plug.Conn.t(), map) :: Plug.Conn.t()
  def request_chat_token(conn, _) do
    user_id = conn.assigns[:user_id]
    token = Phoenix.Token.sign(conn, "user socket", user_id)

    conn
      |> put_view(GenericView)
      |> render("code.json", code: token)
  end

  @spec logout(Plug.Conn.t(), map) :: Plug.Conn.t()
  def logout(conn, %{}) do
    conn
    |> put_resp_cookie(@session_cookie_key, "")
    |> put_view(UserView)
    |> render("logout.json", %{})
  end

  def verify_token(conn, %{
    "token" => token
  }) do
    case JwtToken.validate_jwt_token(token) do
      {:ok, username} ->
        user = Users.get_user_by_name(username)
        conn |> render("user.json", user: user)

      {:error, _} ->
        conn
        |> put_view(ErrorView)
        |> render("error.json", error: "User unauthorized")
    end
  end
end
