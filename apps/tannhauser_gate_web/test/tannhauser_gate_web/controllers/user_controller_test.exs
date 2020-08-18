defmodule TannhauserGateWeb.UserControllerTest do
  use TannhauserGateWeb.ConnCase

  alias TannhauserGate.Users
  alias TannhauserGate.Users.User

  @create_attrs %{
    "email" => "some@email.com",
    "form_password" => "some_password",
    "username" => "some_username"
  }
  @update_attrs %{
    "email" => "some.updated@email.com",
    "form_password" => "some_updated_password",
    "username" => "some_updated_username"
  }
  @invalid_attrs %{email: nil, form_password: nil, username: nil}

  @other_user %{
    "email" => "some_other@email.com",
    "form_password" => "some_password",
    "username" => "some_test2_username"
  }

  def fixture(:user) do
    {:ok, user} = Users.create_user(@create_attrs)
    user
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  # describe "index" do
  #   setup [:create_user]

  #   test "lists all users", %{conn: conn} do
  #     conn =
  #       conn
  #       |> perform_test_login(&post/3, @create_attrs)
  #       |> get(Routes.user_path(conn, :index))

  #     response = json_response(conn, 200)
  #     assert Enum.map(response, fn x -> Map.delete(x, "id") end) == [@create_attrs |> Map.delete("form_password")]
  #   end
  # end

  # describe "create user" do
  #   test "renders user when data is valid", %{conn: conn} do
  #     conn = post(conn, Routes.user_path(conn, :create), user: @create_attrs)
  #     assert %{"id" => id} = json_response(conn, 201)

  #     conn =
  #       conn
  #       |> create_login_user(@other_user)
  #       |> perform_test_login(&post/3, @other_user)
  #       |> get(Routes.user_path(conn, :show, id))

  #     response = json_response(conn, 200)

  #     assert %{
  #              "id" => id,
  #              "email" => "some@email.com",
  #              "username" => "some_username"
  #            } = response
  #   end

  #   test "renders errors when data is invalid", %{conn: conn} do
  #     conn = post(conn, Routes.user_path(conn, :create), user: @invalid_attrs)
  #     assert json_response(conn, 422) != %{}
  #   end
  # end

  # describe "update user" do
  #   setup [:create_user]

  #   test "renders user when data is valid and tries to update itself", %{conn: conn, user: %User{id: id} = user} do
  #     # Connecting as itself
  #     conn =
  #       conn
  #       |> perform_test_login(&post/3, @create_attrs)
  #       |> put(Routes.user_path(conn, :update, user), user: @update_attrs)

  #     assert %{"id" => ^id} = json_response(conn, 200)

  #     conn =
  #       conn
  #       |> perform_test_login(&post/3, @create_attrs)
  #       |> get(Routes.user_path(conn, :show, id))

  #     assert %{
  #              "id" => id,
  #              "email" => "some.updated@email.com",
  #              "username" => "some_updated_username"
  #            } = json_response(conn, 200)
  #   end

  #   test "renders error when data is valid but it's not itself", %{conn: conn, user: %User{id: id} = user} do
  #     conn =
  #       conn
  #       |> create_login_user(@other_user)
  #       |> perform_test_login(&post/3, @other_user)
  #       |> put(Routes.user_path(conn, :update, user), user: @update_attrs)

  #     assert json_response(conn, 401)["errors"] != %{}
  #   end

  #   test "renders errors when data is invalid", %{conn: conn, user: user} do
  #     conn =
  #       conn
  #       |> perform_test_login(&post/3, @create_attrs)
  #       |> put(Routes.user_path(conn, :update, user), user: @invalid_attrs)
  #     assert json_response(conn, 422)["errors"] != %{}
  #   end
  # end

  describe "delete user" do
    setup [:create_user]

    test "deletes chosen user when it is the user itself", %{conn: conn, user: user} do
      conn =
        conn
        |> perform_test_login(&post/3, @create_attrs)
        |> delete(Routes.user_path(conn, :delete, user))

      assert response(conn, 204)

      assert_error_sent 404, fn ->
        conn
        |> create_login_user(@other_user)
        |> perform_test_login(&post/3, @other_user)
        |> get(Routes.user_path(conn, :show, user))
      end
    end
  end

  defp create_user(_) do
    user = fixture(:user)
    {:ok, user: user}
  end
end
