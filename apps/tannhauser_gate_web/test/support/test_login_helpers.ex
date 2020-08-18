defmodule TannhauserGateWeb.TestLoginHelpers do
  import Plug.Conn

  alias TannhauserGateWeb.Router.Helpers, as: Routes
  alias TannhauserGate.Users

  def extract_credentials(%{
    "email" => username,
    "form_password" => password
  }), do: %{
    "username" => username,
    "password" => password
  }

  def create_login_user(conn, user) do
    Users.create_user(user)
    conn
  end

  def perform_test_login(conn, post, user), do:
    post.(conn, Routes.authentication_path(conn, :authenticate), user |> extract_credentials())
end
