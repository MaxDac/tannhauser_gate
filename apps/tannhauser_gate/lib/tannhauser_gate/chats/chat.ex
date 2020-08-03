defmodule TannhauserGate.Chats.Chat do
  use Ecto.Schema
  import Ecto.Changeset

  schema "chat" do
    field :date, :integer
    field :text, :string
    field :character_id, :id

    timestamps()
  end

  @doc false
  def changeset(chat, attrs) do
    chat
    |> cast(attrs, [:text, :date])
    |> validate_required([:text, :date])
  end
end
