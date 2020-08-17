defmodule TannhauserGate.ChatsTest do
  use TannhauserGate.DataCase

  alias TannhauserGate.Users
  alias TannhauserGate.Users.User

  alias TannhauserGate.Characters
  alias TannhauserGate.Characters.Character

  alias TannhauserGate.ChatRooms
  alias TannhauserGate.ChatRooms.ChatRoom

  alias TannhauserGate.Chats

  describe "chat" do
    alias TannhauserGate.Chats.Chat

    @user_attrs %{email: "some email", form_password: "some password", username: "some username"}
    @character_attrs %{avatar: "some avatar", description: "some description", name: "some name", notes: "some notes"}
    @chat_rooms_attrs %{description: "some description", image: "some image", name: "some name", coords: "100,100,20"}

    @valid_attrs %{chat_rooms_id: nil, character_id: nil, date: 42, text: "some text"}
    @update_attrs %{date: 43, text: "some updated text"}
    @invalid_attrs %{date: nil, text: nil}

    def chat_fixture(attrs \\ %{}) do
      {:ok, %User{id: user_id}} =
        @user_attrs
        |> Users.create_user()

      {:ok, %Character{id: character_id}} =
        @character_attrs
        |> Map.put(:user_id, user_id)
        |> Characters.create_character()

      {:ok, %ChatRoom{id: chat_rooms_id}} =
        @chat_rooms_attrs
        |> ChatRooms.create_chat_room()

      chat_attrs =
        @valid_attrs
        |> Map.put(:character_id, character_id)
        |> Map.put(:chat_rooms_id, chat_rooms_id)

      {:ok, chat} =
        attrs
        |> Enum.into(chat_attrs)
        |> Chats.create_chat()

      chat
    end

    test "list_chat/0 returns all chat" do
      chat = chat_fixture()
      assert Chats.list_chat() == [chat]
    end

    test "get_chat!/1 returns the chat with given id" do
      chat = chat_fixture()
      result = Chats.get_chat!(chat.id)
      assert result.character.name == "some name"
      assert %{result | character: nil, chat_rooms: nil } == %{chat | character: nil, chat_rooms: nil }
    end

    test "get_chat_with_room!/1 returns the chat with given id" do
      chat = chat_fixture()
      result = Chats.get_chat_with_room!(chat.id)
      assert result.character.name == "some name"
      assert result.chat_rooms.coords == "100,100,20"
      assert %{result | character: nil, chat_rooms: nil } == %{chat | character: nil, chat_rooms: nil }
    end

    test "create_chat/1 with valid data creates a chat" do
      assert {:ok, %Chat{} = chat} = Chats.create_chat(@valid_attrs)
      assert chat.date == 42
      assert chat.text == "some text"
    end

    # test "create_chat/1 with invalid data returns error changeset" do
    #   assert {:error, %Ecto.Changeset{}} = Chats.create_chat(@invalid_attrs)
    # end

    # test "update_chat/2 with valid data updates the chat" do
    #   chat = chat_fixture()
    #   assert {:ok, %Chat{} = chat} = Chats.update_chat(chat, @update_attrs)
    #   assert chat.date == 43
    #   assert chat.text == "some updated text"
    # end

    # test "update_chat/2 with invalid data returns error changeset" do
    #   chat = chat_fixture()
    #   assert {:error, %Ecto.Changeset{}} = Chats.update_chat(chat, @invalid_attrs)
    #   assert chat == Chats.get_chat!(chat.id)
    # end

    # test "delete_chat/1 deletes the chat" do
    #   chat = chat_fixture()
    #   assert {:ok, %Chat{}} = Chats.delete_chat(chat)
    #   assert_raise Ecto.NoResultsError, fn -> Chats.get_chat!(chat.id) end
    # end

    # test "change_chat/1 returns a chat changeset" do
    #   chat = chat_fixture()
    #   assert %Ecto.Changeset{} = Chats.change_chat(chat)
    # end
  end
end
