defmodule TannhauserGateWeb.AuthenticationControllerTest do
  use TannhauserGateWeb.ConnCase

  def create_login_user() do
    Users.create_user(%{
      "email"         => "test@email.com",
      "username"      => "some_user",
      "form_password" => "some_pass"
    })
  end

  def perform_test_login(conn) do
    user = create_login_user()
    conn = post(conn, Routes.character_path(conn, :index), user: %{
      "username" => "test@email.com",
      "password" => "some_pass"
    })

    IO.inspect conn

    conn
  end
end
