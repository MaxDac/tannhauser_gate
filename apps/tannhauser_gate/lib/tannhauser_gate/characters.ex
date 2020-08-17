defmodule TannhauserGate.Characters do
  @moduledoc """
  The Characters context.
  """

  import Ecto.Query, warn: false
  alias TannhauserGate.Repo

  alias TannhauserGate.Characters.Character

  def list_characters_query, do:
    from c in Character, select: %Character{
      id: c.id,
      user_id: c.user_id,
      name: c.name
    }

  @doc """
  Returns the list of characters.

  ## Examples

      iex> list_characters()
      [%Character{}, ...]

  """
  def list_characters do
    Repo.all(list_characters_query())
  end

  def list_characters_by_user(user_id) do
    result = Repo.all(from c in list_characters_query(), where: c.user_id == ^user_id)
    IO.inspect result
    result
  end

  @doc """
  Gets a single character.

  Raises `Ecto.NoResultsError` if the Character does not exist.

  ## Examples

      iex> get_character!(123)
      %Character{}

      iex> get_character!(456)
      ** (Ecto.NoResultsError)

  """
  def get_character(id) do
    use MonadMacro

    case Repo.get(Character, id) do
      nil -> {:error, :not_found}
      c   -> {:ok, c}
    end
    |> Repo.preload(:user)
  end

  def get_character!(id), do:
    Repo.get!(Character, id) |> Repo.preload(:user)

  @doc """
  Creates a character.

  ## Examples

      iex> create_character(%{field: value})
      {:ok, %Character{}}

      iex> create_character(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_character(attrs \\ %{}) do
    %Character{}
    |> Character.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a character.

  ## Examples

      iex> update_character(character, %{field: new_value})
      {:ok, %Character{}}

      iex> update_character(character, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_character(%Character{} = character, attrs) do
    character
    |> Character.update_changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a character.

  ## Examples

      iex> delete_character(character)
      {:ok, %Character{}}

      iex> delete_character(character)
      {:error, %Ecto.Changeset{}}

  """
  def delete_character(%Character{} = character) do
    Repo.delete(character)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking character changes.

  ## Examples

      iex> change_character(character)
      %Ecto.Changeset{source: %Character{}}

  """
  def change_character(%Character{} = character) do
    Character.changeset(character, %{})
  end
end
