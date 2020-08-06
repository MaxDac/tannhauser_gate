defmodule TannhauserGate.Repo.Migrations.CreateChatRooms do
  use Ecto.Migration

  def change do
    create table(:chat_rooms) do
      add :name, :string
      add :description, :text
      add :image, :text
      add :chat_id, references(:chat_rooms, on_delete: :nothing)

      timestamps()
    end

    create index(:chat_rooms, [:chat_id])
  end
end
