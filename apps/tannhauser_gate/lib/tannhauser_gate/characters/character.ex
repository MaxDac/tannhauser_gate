defmodule TannhauserGate.Characters.Character do
  use Ecto.Schema
  import Ecto.Changeset
  alias TannhauserGate.Users.User

  schema "characters" do
    field :avatar, :string
    field :description, :string
    field :name, :string
    field :notes, :string

    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(character, attrs) do
    character
    |> cast(attrs, [:name, :avatar, :description, :notes, :user_id])
    |> validate_required([:name])
    |> assoc_constraint(:user)
  end

  def update_changeset(character, attrs) do
    character
    |> cast(attrs, [:avatar, :description, :notes])
  end
end
