defmodule TannhauserGate.Characters.Character do
  use Ecto.Schema
  import Ecto.Changeset

  schema "characters" do
    field :avatar, :string
    field :description, :string
    field :name, :string
    field :notes, :string
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(character, attrs) do
    character
    |> cast(attrs, [:name, :avatar, :description, :notes])
    |> validate_required([:name, :avatar, :description, :notes])
  end
end
