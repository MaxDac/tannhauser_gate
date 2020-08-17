defmodule TannhauserGate.Chats do
  @moduledoc """
  The Chats context.
  """

  import Ecto.Query, warn: false
  alias Ecto.DateTime
  alias TannhauserGate.Repo

  alias TannhauserGate.Chats.Chat
  alias TannhauserGate.Characters
  alias TannhauserGate.Characters.Character

  @doc """
  Returns the list of chat.

  ## Examples

      iex> list_chat()
      [%Chat{}, ...]

  """
  def list_chat do
    Repo.all(Chat)
  end

  @doc """
  Gets a single chat.

  Raises `Ecto.NoResultsError` if the Chat does not exist.

  ## Examples

      iex> get_chat!(123)
      %Chat{}

      iex> get_chat!(456)
      ** (Ecto.NoResultsError)

  """
  def get_chat!(id), do: Repo.get!(Chat, id) |> Repo.preload(:character)

  def get_chat_with_room!(id), do:
    Repo.get!(Chat, id)
    |> Repo.preload(:character)
    |> Repo.preload(:chat_rooms)

  defp nested_character_query(), do:
    from c in Character, select: %{ id: c.id, name: c.name }

  def get_chat_by_room(room_id), do:
    Repo.all(from c in Chat, where: c.chat_rooms_id == ^room_id)
    |> Enum.map(fn c -> c |> Repo.preload([character: nested_character_query()]) end)

  def get_last_chats_by_room(room_id) do
    with query <-
      from c in Chat,
           where: c.chat_rooms_id == ^room_id,
           where: c.inserted_at > datetime_add(^NaiveDateTime.utc_now(), -2, "hour") do
      Repo.all(query)
      |> Repo.preload([character: nested_character_query()])
    end
  end

  @doc """
  Creates a chat.

  ## Examples

      iex> create_chat(%{field: value})
      {:ok, %Chat{}}

      iex> create_chat(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_chat(attrs \\ %{}) do
    %Chat{}
    |> Chat.changeset(attrs)
    |> Repo.insert()
  end

  def create_chat_with_user_id(%{
    "user_id" => user_id,
    "character_id" => character_id} = attrs) when character_id != "" do
    {:ok, %Chat{id: id}} = create_chat(attrs |> Map.put("character_id", character_id))
    get_chat!(id)
  end

  def create_chat_with_user_id(%{"user_id" => user_id} = attrs) do
    [character | _] = Characters.list_characters_by_user(user_id)
    {:ok, %Chat{id: id}} = create_chat(attrs |> Map.put("character_id", character.id))
    get_chat!(id)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking chat changes.

  ## Examples

      iex> change_chat(chat)
      %Ecto.Changeset{source: %Chat{}}

  """
  def change_chat(%Chat{} = chat) do
    Chat.changeset(chat, %{})
  end
end
