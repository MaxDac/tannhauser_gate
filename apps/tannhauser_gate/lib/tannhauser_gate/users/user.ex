defmodule TannhauserGate.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :form_password, :string, virtual: true
    field :password, :string
    field :username, :string
    field :admin, :boolean

    timestamps()
  end

  defp put_pass_hash(changeset) do
    case changeset do
      %Ecto.Changeset {
        valid?: true,
        changes: %{form_password: pass}
      } -> put_change(changeset, :password, Pbkdf2.hash_pwd_salt(pass))
      _ -> changeset
    end
  end

  def update_changeset(user, params) do
    user
    |> changeset(params)
    |> cast(params, [:email])
    |> validate_required([:email])
  end

  def registration_changeset(user, params) do
    user
    |> changeset(params)
    |> cast(params, [:form_password])
    |> validate_required([:form_password])
    |> validate_length(:form_password, min: 6, max: 20)
    |> put_pass_hash()
  end

  def elevation_changeset(user, params) do
    user
    |> changeset(params)
    |> cast(params, [:admin])
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email])
    |> validate_required([:username, :email])
  end
end
