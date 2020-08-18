defmodule TannhauserGate.AuthenticationTest do
  use TannhauserGate.DataCase

  alias TannhauserGate.Users

  describe "authentication" do
    alias TannhauserGate.Users.User

    @valid_attrs %{email: "some email", form_password: "some password", username: "some username"}
    @update_attrs %{email: "some updated email", form_password: "some updated password", username: "some updated username"}
    @invalid_attrs %{email: nil, form_password: nil, username: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Users.create_user()

      user
    end

    test "The user should authenticate with the correct e-mail/pass" do
      user = user_fixture()
      {:ok, found_user} = Users.authenticate(user.email, user.form_password)
      assert(user.id == found_user.id)
    end

    test "Returns the correct error when the user does not exist" do
      {:error, reason} = Users.authenticate("some_user", "some_pass")
      assert(reason == :not_found)
    end

    test "Returns the correct error with an invalid password" do
      user = user_fixture()
      {:error, reason} = Users.authenticate(user.email, "some_pass")
      assert(reason == :unauthorized)
    end
  end
end
