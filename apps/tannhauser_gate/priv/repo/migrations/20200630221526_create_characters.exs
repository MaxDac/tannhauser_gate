defmodule TannhauserGate.Repo.Migrations.CreateCharacters do
  use Ecto.Migration

  def change do
    create table(:characters) do
      add :name, :string
      add :avatar, :text
      add :description, :string
      add :notes, :string
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:characters, [:user_id])
  end
end
