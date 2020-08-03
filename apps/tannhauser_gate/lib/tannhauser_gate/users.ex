defmodule TannhauserGate.Users do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias TannhauserGate.Repo

  alias TannhauserGate.Users.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  defp user_by_name_query(name) do
    from u in User,
    where: u.username == ^name
  end

  @spec get_user_by_name(String.t()) :: User
  def get_user_by_name(name) do
    Repo.one(user_by_name_query name)
  end

  @spec exist_user_with_name(any) :: boolean
  def exist_user_with_name(name) do
    name
    |> user_by_name_query
    |> Repo.exists?
  end

  @spec get_user_by_email(String.t()) :: User
  def get_user_by_email(email) do
    query = from u in User, where: u.email == ^email
    Repo.one(query)
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.registration_changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.registration_changeset(attrs)
    |> Repo.update()

  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.registration_changeset(user, %{})
  end

  def authenticate(email, password) do
    user = get_user_by_email email

    cond do
      user && Pbkdf2.verify_pass(password, user.password) ->
        {:ok, user}

      user ->
        {:error, :unauthorized}

      true ->
        Pbkdf2.no_user_verify()
        {:error, :not_found}
    end
  end

end
