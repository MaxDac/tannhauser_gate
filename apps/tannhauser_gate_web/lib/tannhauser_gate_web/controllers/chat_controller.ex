defmodule TannhauserGateWeb.ChatController do
  use TannhauserGateWeb, :controller

  alias TannhauserGate.Chats
  alias TannhauserGate.ChatRooms
  alias TannhauserGate.ChatRooms.ChatRoom

  action_fallback TannhauserGateWeb.FallbackController

  def get_chat_rooms(conn, _params) do
    rooms = ChatRooms.list_chat_rooms()
    render(conn, "rooms.json", rooms: rooms)
  end

  def get_chat_room(conn, %{"id" => id}) do
    room = ChatRooms.get_chat_room!(id)
    render(conn, "room.json", room: room)
  end

  def get_chat_logs_by_room(conn, %{"room_id" => room_id}) do
    logs = Chats.get_last_chats_by_room(room_id)
    render(conn, "logs.json", logs: logs)
  end

end
