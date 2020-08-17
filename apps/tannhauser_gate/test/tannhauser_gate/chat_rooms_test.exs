defmodule TannhauserGate.ChatRoomsTest do
  use TannhauserGate.DataCase

  alias TannhauserGate.ChatRooms

  describe "chat_rooms" do
    alias TannhauserGate.ChatRooms.ChatRoom

    @valid_attrs %{description: "some description", image: "some image", name: "some name", coords: "100,100,20"}
    @update_attrs %{description: "some updated description",
                    image: "some updated image",
                    name: "some updated name",
                    coords: "100,100,20"
                  }
    @invalid_attrs %{name: nil, coords: nil}

    def chat_room_fixture(attrs \\ %{}) do
      {:ok, chat_room} =
        attrs
        |> Enum.into(@valid_attrs)
        |> ChatRooms.create_chat_room()

      chat_room
    end

    test "list_chat_rooms/0 returns all chat_rooms" do
      chat_room = chat_room_fixture()
      assert ChatRooms.list_chat_rooms() == [chat_room]
    end

    test "get_chat_room!/1 returns the chat_room with given id" do
      chat_room = chat_room_fixture()
      assert ChatRooms.get_chat_room!(chat_room.id) == chat_room
    end

    test "create_chat_room/1 with valid data creates a chat_room" do
      assert {:ok, %ChatRoom{} = chat_room} = ChatRooms.create_chat_room(@valid_attrs)
      assert chat_room.description == "some description"
      assert chat_room.image == "some image"
      assert chat_room.name == "some name"
    end

    test "create_chat_room/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = ChatRooms.create_chat_room(@invalid_attrs)
    end

    test "update_chat_room/2 with valid data updates the chat_room" do
      chat_room = chat_room_fixture()
      assert {:ok, %ChatRoom{} = chat_room} = ChatRooms.update_chat_room(chat_room, @update_attrs)
      assert chat_room.description == "some updated description"
      assert chat_room.image == "some updated image"
      assert chat_room.name == "some updated name"
    end

    test "update_chat_room/2 with invalid data returns error changeset" do
      chat_room = chat_room_fixture()
      assert {:error, %Ecto.Changeset{}} = ChatRooms.update_chat_room(chat_room, @invalid_attrs)
      assert chat_room == ChatRooms.get_chat_room!(chat_room.id)
    end

    test "delete_chat_room/1 deletes the chat_room" do
      chat_room = chat_room_fixture()
      assert {:ok, %ChatRoom{}} = ChatRooms.delete_chat_room(chat_room)
      assert_raise Ecto.NoResultsError, fn -> ChatRooms.get_chat_room!(chat_room.id) end
    end

    test "change_chat_room/1 returns a chat_room changeset" do
      chat_room = chat_room_fixture()
      assert %Ecto.Changeset{} = ChatRooms.change_chat_room(chat_room)
    end
  end
end
