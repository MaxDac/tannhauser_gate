defmodule TannhauserGate.Repo.Migrations.RemDateFromChat do
  use Ecto.Migration

  def change do
    alter table(:chat) do
      remove (:date)
    end
  end
end
