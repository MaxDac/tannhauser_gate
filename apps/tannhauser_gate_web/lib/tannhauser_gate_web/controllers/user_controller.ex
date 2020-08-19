defmodule TannhauserGateWeb.UserController do
  use TannhauserGateWeb, :controller

  alias TannhauserGate.Users
  alias TannhauserGate.Users.User

  import TannhauserGateWeb.Helpers

  action_fallback TannhauserGateWeb.FallbackController

  @spec index(Plug.Conn.t(), any) :: Plug.Conn.t()
  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Users.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    cond do
      is_current_user(conn, id) ->
        IO.puts "is updating"
        with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
          render(conn, "show.json", user: user)
        end
      true ->
        {:error, :not_authorized}
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    if is_current_user(conn, id) do
      with {:ok, %User{}} <- Users.delete_user(user) do
        send_resp(conn, :no_content, "")
      end
    else
        {:error, :not_authorized}
    end
  end

  def toggle_admin(conn, %{"id" => id}) do
    with user <- Users.get_user!(id) do
      Users.toggle_admin(user)
      send_resp(conn, :no_content, "")
    end
  end
end
