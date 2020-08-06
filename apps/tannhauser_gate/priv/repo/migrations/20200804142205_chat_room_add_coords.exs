defmodule TannhauserGate.Repo.Migrations.ChatRoomAddCoords do
  use Ecto.Migration

  def change do
    alter table("chat_rooms") do
      add :coords, :text
    end
  end
end
