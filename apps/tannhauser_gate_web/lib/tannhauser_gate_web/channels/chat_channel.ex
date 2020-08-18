defmodule TannhauserGateWeb.ChatChannel do
  use TannhauserGateWeb, :channel

  alias TannhauserGate.Chats
  alias TannhauserGate.Chats.Chat

  @spec map_chat(Chat.t()) :: %{}
  defp map_chat(c), do:
    %{ "id" => c.id, "text" => c.text, "date" => c.inserted_at, "character_name" => c.character }

  def join("chats:" <> chat_room_id, _params, socket) do
    IO.puts "Joining"

    chats =
      Chats.get_last_chats_by_room(chat_room_id)
      |> Enum.map(fn c ->
        %{ "id" => c.id,
           "text" => c.text,
           "date" => c.inserted_at,
           "character_id" => c.character.id,
           "character_name" => c.character.name } end)

    {:ok, %{"chats" => chats}, assign(socket, :chat_id, String.to_integer(chat_room_id))}
  end

  def handle_in("new_chat_log_insert", attrs, socket) do
    IO.puts "Handling"

    # Inserting chat
    user_id = socket.assigns[:user_id]
    chat_log =
      attrs
      |> Map.put("user_id", user_id)
      |> Chats.create_chat_with_character_id()

    broadcast!(socket, "new_chat_log",
      %{
        "id" => chat_log.id,
        "text" => chat_log.text,
        "date" => chat_log.inserted_at,
        "character_id" => chat_log.character.id,
        "character_name" => chat_log.character.name
      })

    {:reply, :ok, socket}
  end
end
