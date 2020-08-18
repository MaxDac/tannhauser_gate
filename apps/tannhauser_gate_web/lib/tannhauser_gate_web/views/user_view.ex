defmodule TannhauserGateWeb.UserView do
  use TannhauserGateWeb, :view
  alias TannhauserGateWeb.UserView

  def render("index.json", %{users: users}) do
    render_many(users, UserView, "user.json")
  end

  def render("show.json", %{user: user}) do
    render_one(user, UserView, "user.json")
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      username: user.username,
      email: user.email}
  end

  def render("token.json", %{token: token}) do
    %{token: token}
  end

  def render("logout.json", %{}) do
    %{}
  end

  def render("error.json", %{error: error}) do
    %{
      errors: [error]
    }
  end
end
