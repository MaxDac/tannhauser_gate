defmodule TannhauserGate.ChatRooms.ChatRoom do
  use Ecto.Schema
  import Ecto.Changeset

  schema "chat_rooms" do
    field :description, :string
    field :image, :string
    field :name, :string
    field :coords, :string
    field :chat_id, :id

    timestamps()
  end

  @doc false
  def changeset(chat_room, attrs) do
    chat_room
    |> cast(attrs, [:name, :description, :image, :coords])
    |> validate_required([:name, :coords])
  end
end
