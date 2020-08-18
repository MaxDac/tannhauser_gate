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
    test_user = %{
      "email" => "casual@email.com",
      "username" => "casual_usernam",
      "form_password" => "casual_pass"
    }

    {:ok, conn:
      conn
      |> put_req_header("accept", "application/json")
      |> create_login_user(test_user)
      |> perform_test_login(&post/3, test_user)
    }
  end

  # describe "index" do
  #   test "lists all characters", %{conn: conn} do
  #     route = Routes.character_path(conn, :index)
  #     IO.puts "Route: #{route}"
  #     conn = get(conn, route)
  #     assert json_response(conn, 200) == []
  #   end
  # end

  # describe "create character" do
  #   test "renders character when data is valid", %{conn: conn} do
  #     conn = post(conn, Routes.character_path(conn, :create), character: @create_attrs)
  #     assert %{"id" => id} = json_response(conn, 201)

  #     conn = get(conn, Routes.character_path(conn, :show, id))

  #     assert %{
  #              "id" => id,
  #              "avatar" => "some avatar",
  #              "description" => "some description",
  #              "name" => "some name",
  #              "notes" => "some notes"
  #            } = json_response(conn, 200)
  #   end

  #   test "renders errors when data is invalid", %{conn: conn} do
  #     conn = post(conn, Routes.character_path(conn, :create), character: @invalid_attrs)
  #     assert json_response(conn, 422)["errors"] != %{}
  #   end
  # end

  # describe "update character" do
  #   setup [:create_character]

  #   test "renders character when data is valid", %{conn: conn, character: %Character{id: id} = character} do
  #     conn = put(conn, Routes.character_path(conn, :update, character), character: @update_attrs)
  #     assert %{"id" => ^id} = json_response(conn, 200)

  #     conn = get(conn, Routes.character_path(conn, :show, id))

  #     assert %{
  #              "id" => id,
  #              "avatar" => "some updated avatar",
  #              "description" => "some updated description",
  #              "notes" => "some updated notes"
  #            } = json_response(conn, 200)
  #   end
  # end

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
