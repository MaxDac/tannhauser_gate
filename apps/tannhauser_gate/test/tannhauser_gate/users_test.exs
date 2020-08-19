defmodule TannhauserGate.UsersTest do
  use TannhauserGate.DataCase

  alias TannhauserGate.Users

  describe "users" do
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

    test "list_users/0 returns all users" do
      user = user_fixture()
      user = %{ user | :form_password => nil }
      assert Users.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      user = %{ user | :form_password => nil }
      assert Users.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Users.create_user(@valid_attrs)
      assert user.email == "some email"
      # assert user.password == "some password"
      assert user.username == "some username"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Users.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, %User{} = user} = Users.update_user(user, @update_attrs)
      assert user.email == "some updated email"
      # assert user.password == "some updated password"
      assert user.username == "some updated username"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Users.update_user(user, @invalid_attrs)
      test_user = Users.get_user!(user.id)
      assert user.id == test_user.id
      assert user.username == test_user.username
      assert user.email == test_user.email
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Users.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Users.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Users.change_user(user)
    end

    test "toggle_admin/1 make admin a non admin" do
      user = user_fixture()
      user = Users.toggle_admin(user)

      assert user.admin
    end

    test "toggle_admin/1 make an admin a non admin" do
      user = user_fixture()
      user = Users.toggle_admin(user)

      assert user.admin

      user = Users.toggle_admin(user)

      assert user.admin == false
    end
  end
end
