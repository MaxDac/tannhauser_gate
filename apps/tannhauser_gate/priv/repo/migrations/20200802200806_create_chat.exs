defmodule TannhauserGate.Repo.Migrations.CreateChat do
  use Ecto.Migration

  def change do
    create table(:chat) do
      add :text, :string
      add :date, :integer
      add :character_id, references(:characters, on_delete: :nothing)

      timestamps()
    end

    create index(:chat, [:character_id])
  end
end
