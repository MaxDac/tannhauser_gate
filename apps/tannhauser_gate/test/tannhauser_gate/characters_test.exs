defmodule TannhauserGate.CharactersTest do
  use TannhauserGate.DataCase

  alias TannhauserGate.Users
  alias TannhauserGate.Characters
  alias TannhauserGate.Repo

  describe "characters" do
    alias TannhauserGate.Characters.Character

    @valid_user_attrs %{email: "some email", form_password: "some password", username: "some username"}
    @valid_attrs %{avatar: "some avatar", description: "some description", name: "some name", notes: "some notes"}
    @update_attrs %{avatar: "some updated avatar", description: "some updated description", name: "some updated name", notes: "some updated notes"}
    @invalid_attrs %{name: nil}

    def user_id() do
      {:ok, user} = Users.create_user(@valid_user_attrs)
      user.id
    end

    def character_fixture(attrs \\ %{}) do
      {:ok, character} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Map.put(:user_id, user_id())
        |> Characters.create_character()

      character
    end

    test "list_characters/0 returns all characters" do
      character = character_fixture()
      [found] = Characters.list_characters()
      assert(found.id == character.id)
      assert(found.user_id == character.user_id)
      assert(found.name == character.name)
    end

    test "get_character!/1 returns the character with given id" do
      character = character_fixture()
      assert %{Characters.get_character!(character.id) | user: nil} == %{character | user: nil}
    end

    test "get_character/1 returns the character with given id" do
      character = character_fixture()
      {:ok, found} = Characters.get_character(character.id)
      assert %{found | user: nil} == %{character | user: nil}
    end

    test "create_character/1 with valid data creates a character" do
      assert {:ok, %Character{} = character} = Characters.create_character(@valid_attrs)
      assert character.avatar == "some avatar"
      assert character.description == "some description"
      assert character.name == "some name"
      assert character.notes == "some notes"
    end

    test "create_character/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Characters.create_character(@invalid_attrs)
    end

    test "update_character/2 with valid data updates the character" do
      character = character_fixture()
      assert {:ok, %Character{} = character} = Characters.update_character(character, @update_attrs)
      assert character.avatar == "some updated avatar"
      assert character.description == "some updated description"
      assert character.notes == "some updated notes"
    end

    test "delete_character/1 deletes the character" do
      character = character_fixture()
      assert {:ok, %Character{}} = Characters.delete_character(character)
      assert_raise Ecto.NoResultsError, fn -> Characters.get_character!(character.id) end
    end

    test "change_character/1 returns a character changeset" do
      character = character_fixture()
      assert %Ecto.Changeset{} = Characters.change_character(character)
    end

    test "list_characters_by_user/1 correctly returns the user character" do
      user_id = user_id()

      {:ok, character} =
        @valid_attrs
        |> Map.put(:user_id, user_id)
        |> Characters.create_character()

      [first | _] = Characters.list_characters_by_user(user_id)
      assert first.user_id == user_id
      assert first.name == character.name
      assert first.id == character.id
    end
  end
end
