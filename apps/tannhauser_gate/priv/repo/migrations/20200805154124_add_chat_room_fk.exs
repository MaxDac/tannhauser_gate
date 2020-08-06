defmodule TannhauserGate.Repo.Migrations.AddChatRoomFk do
  use Ecto.Migration

  def change do
    alter table(:chat) do
      add :chat_rooms_id, references(:chat_rooms, on_delete: :nothing)
    end
  end
end
