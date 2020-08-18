defmodule TannhauserGateWeb.CharacterController do
  use TannhauserGateWeb, :controller

  alias TannhauserGate.Characters
  alias TannhauserGate.Characters.Character

  alias TannhauserGate.Users

  action_fallback TannhauserGateWeb.FallbackController

  def index(conn, _params) do
    characters = Characters.list_characters()
    render(conn, "index.json", characters: characters)
  end

  def index_by_user(conn, %{"user_id" => user_id}) do
    characters = Characters.list_characters_by_user(user_id)
    render(conn, "index.json", characters: characters)
  end

  def create(conn, %{"character" => character_params}) do
    with {:ok, %Character{} = character} <- Characters.create_character(character_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.character_path(conn, :show, character))
      |> render("show.json", character: character)
    end
  end

  def show(conn, %{"id" => id}) do
    character = Characters.get_character!(id)
    render(conn, "show.json", character: character)
  end

  def show_user(conn, %{"id" => id}) do
    IO.puts "passing"
    try do
      user = Users.get_user!(id)
      render(conn, "show.json", user: user)
    rescue
      ex ->
        IO.inspect ex
        raise ex
    end
  end

  def check_authorized(%Plug.Conn{
    assigns: assigns
  }, c = %Character{user_id: user_id}, action), do:
    if user_id == assigns[:user_id], do: action.(), else: {:error, :not_authorized}

  def update(conn, %{"id" => id, "character" => character_params}) do
    character = Characters.get_character!(id)
    check_authorized(conn, character, fn ->
      with {:ok, %Character{} = character} <- Characters.update_character(character, character_params) do
        render(conn, "show.json", character: character)
      end
    end)
  end

  def delete(conn, %{"id" => id}) do
    character = Characters.get_character!(id)
    check_authorized(conn, character, fn ->
      with {:ok, %Character{}} <- Characters.delete_character(character) do
        send_resp(conn, :no_content, "")
      end
    end)
  end
end
