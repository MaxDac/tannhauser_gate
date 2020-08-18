defmodule TannhauserGateWeb.CharacterControllerTest do
  use TannhauserGateWeb.ConnCase

  alias TannhauserGate.Users
  alias TannhauserGate.Users.User
  alias TannhauserGate.Characters
  alias TannhauserGate.Characters.Character

  @user_attrs %{
    "email" => "test@character.com",
    "username" => "test_char",
    "form_password" => "test_pass"
  }

  @other_user_attrs %{
    "email" => "casual@email.com",
    "username" => "casual_usernam",
    "form_password" => "casual_pass"
  }

  @create_attrs %{
    avatar: "some avatar",
    description: "some description",
    name: "some name",
    notes: "some notes"
  }
  @update_attrs %{
    avatar: "some updated avatar",
    description: "some updated description",
    notes: "some updated notes"
  }
  @invalid_attrs %{avatar: nil, description: nil, notes: nil}

  def fixture(:character) do
    {:ok, user} = Users.create_user(@user_attrs)

    {:ok, character} = Characters.create_character(@create_attrs |> Map.put(:user_id, user.id))
    character
  end

  setup %{conn: conn} do
    {:ok, conn:
      conn
      |> put_req_header("accept", "application/json")
    }
  end

  describe "index" do
    test "lists all characters when logged", %{conn: conn} do
      conn =
        conn
        |> create_login_user(@other_user_attrs)
        |> perform_test_login(&post/3, @other_user_attrs)
        |> get(Routes.character_path(conn, :index))

      assert json_response(conn, 200) == []
    end

    test "does not lists all characters when not logged", %{conn: conn} do
      conn = get(conn, Routes.character_path(conn, :index))
      assert response(conn, 401)
    end
  end

  describe "create character" do
    test "renders character when data is valid and the user is logged", %{conn: conn} do
      {:ok, user} = Users.create_user(@user_attrs)

      conn =
        conn
        |> perform_test_login(&post/3, @user_attrs)
        |> post(Routes.character_path(conn, :create), character: @create_attrs |> Map.put(:user_id, user.id))

      assert %{"id" => id} = json_response(conn, 201)

      conn = get(conn, Routes.character_path(conn, :show, id))

      assert %{
               "id" => id,
               "avatar" => "some avatar",
               "description" => "some description",
               "name" => "some name",
               "notes" => "some notes"
             } = json_response(conn, 200)
    end

    test "does not renders character when data is valid but the user is not logged", %{conn: conn} do
      {:ok, user} = Users.create_user(@user_attrs)

      conn =
        conn
        |> post(Routes.character_path(conn, :create), character: @create_attrs |> Map.put(:user_id, user.id))

      assert response(conn, 401)
    end

    test "renders errors when data is invalid", %{conn: conn} do
      {:ok, user} = Users.create_user(@user_attrs)

      conn =
        conn
        |> perform_test_login(&post/3, @user_attrs)
        |> post(Routes.character_path(conn, :create), character: @invalid_attrs |> Map.put(:user_id, user.id))

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update character" do
    setup [:create_character]

    test "renders character when data is valid and user is logged ", %{
      conn: conn,
      character: %Character{id: id, user_id: user_id} = character} do

      conn =
        conn
        |> perform_test_login(&post/3, @user_attrs)
        |> put(Routes.character_path(conn, :update, character), character: @update_attrs)

      assert %{"id" => ^id} = json_response(conn, 200)

      conn = get(conn, Routes.character_path(conn, :show, id))

      assert %{
               "id" => id,
               "avatar" => "some updated avatar",
               "description" => "some updated description",
               "notes" => "some updated notes"
             } = json_response(conn, 200)
    end

    test "does not render character when data is valid but the user is not logged ", %{
      conn: conn,
      character: %Character{id: id, user_id: user_id} = character} do

      conn =
        conn
        |> put(Routes.character_path(conn, :update, character), character: @update_attrs)

      assert response(conn, 401)
    end
  end

  describe "delete character" do
    setup [:create_character]

    test "deletes chosen character when character belongs to the user", %{conn: conn, character: character} do
      conn =
        conn
        |> perform_test_login(&post/3, @user_attrs)
        |> delete(Routes.character_path(conn, :delete, character))

      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.character_path(conn, :show, character))
      end
    end
  end

  defp create_character(_) do
    character = fixture(:character)
    {:ok, character: character}
  end
end
