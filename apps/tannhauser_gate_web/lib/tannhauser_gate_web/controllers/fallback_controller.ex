defmodule TannhauserGateWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use TannhauserGateWeb, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    IO.puts "Error!"
    IO.inspect changeset

    conn
    |> put_status(:unprocessable_entity)
    |> put_view(TannhauserGateWeb.ChangesetView)
    |> render("error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    IO.puts "not found"

    conn
    |> put_status(:not_found)
    |> put_view(TannhauserGateWeb.ErrorView)
    |> render(:"404")
  end

  def call(conn, {:error, :not_authorized}) do
    conn
    |> put_status(:unauthorized)
    |> put_view(TannhauserGateWeb.ErrorView)
    |> render("unauthorized.json", %{})
  end
end
