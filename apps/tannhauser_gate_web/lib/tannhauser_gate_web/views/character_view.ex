defmodule TannhauserGateWeb.CharacterView do
  use TannhauserGateWeb, :view
  alias TannhauserGateWeb.CharacterView

  def render("index.json", %{characters: characters}) do
    %{data: render_many(characters, CharacterView, "character-short.json")}
  end

  def render("show.json", %{character: character}) do
    %{data: render_one(character, CharacterView, "character.json")}
  end

  def render("character-short.json", %{character: character}) do
    %{id: character.id,
      name: character.name,
      user_id: character.user_id}
  end

  def render("character.json", %{character: character}) do
    %{id: character.id,
      name: character.name,
      avatar: character.avatar,
      user_id: character.user_id,
      description: character.description,
      notes: character.notes}
  end
end
