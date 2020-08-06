defmodule TannhauserGateWeb.ChatView do
  use TannhauserGateWeb, :view

  alias TannhauserGateWeb.ChatView

  def render("rooms.json", %{rooms: rooms}) do
    render_many(rooms, ChatView, "room-short.json")
  end

  def render("room.json", %{room: room}) do
    %{
      id: room.id,
      name: room.name,
      image: room.image,
      description: room.description,
      coords: room.coords
    }
  end

  def render("room-short.json", %{chat: chat}) do
    %{
      id: chat.id,
      name: chat.name,
      coords: chat.coords
    }
  end

  def render("logs.json", %{logs: logs}) do
    render_many(logs, ChatView, "single-log.json")
  end

  def render("single-log.json", %{chat: chat}) do
    %{
      id: chat.id,
      date: chat.inserted_at,
      text: chat.text,
      character: chat.character
    }
  end

end
