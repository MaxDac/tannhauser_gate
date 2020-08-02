defmodule TannhauserGateWeb.AuthenticationController do
  use TannhauserGateWeb, :controller

  alias TannhauserGate.Users
  alias TannhauserGateWeb.ErrorView
  alias TannhauserGateWeb.GenericView
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
        IO.puts "There was an error!!! #{"something"}"
        conn
        |> put_view(ErrorView)
        |> render("error.json", error: "User unauthorized")
      {:ok, user} ->
#        render(conn, "show.json", user: user)
        IO.puts("The username: #{user.username}")
        {:ok, token} = JwtToken.get_jwt_token(user.username)
        IO.puts("The token is: #{token}")

        conn
        |> put_resp_cookie(@session_cookie_key, token)
        |> put_view(GenericView)
        |> render("code.json", code: token)
    end
  end

  def verify_token(conn, %{
    "token" => token
  }) do
    case JwtToken.validate_jwt_token(token) do
      {:ok, username} ->
        IO.puts "The username is #{username}"
        user = Users.get_user_by_name(username)
        conn |> render("user.json", user: user)

      {:error, reason} ->
        IO.puts "Jwt token invalid! #{inspect reason}"

        conn
        |> put_view(ErrorView)
        |> render("error.json", error: "User unauthorized")
    end
  end
end
