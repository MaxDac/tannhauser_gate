defmodule TannhauserGate.Chats.Chat do
  use Ecto.Schema
  import Ecto.Changeset
  alias TannhauserGate.Characters.Character
  alias TannhauserGate.ChatRooms.ChatRoom

  schema "chat" do
    field :date, :integer
    field :text, :string

    belongs_to :character, Character
    belongs_to :chat_rooms, ChatRoom

    timestamps()
  end

  @doc false
  def changeset(chat, attrs) do
    chat
    |> cast(attrs, [:text, :character_id, :chat_rooms_id])
    |> validate_required([:text, :character_id, :chat_rooms_id])
    |> assoc_constraint(:character)
    |> assoc_constraint(:chat_rooms)
  end
end
