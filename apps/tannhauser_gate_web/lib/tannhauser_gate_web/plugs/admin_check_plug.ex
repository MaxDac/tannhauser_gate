defmodule TannhauserGateWeb.AdminCheckPlug do
  import Plug.Conn
  import Phoenix.Controller
  import TannhauserGateWeb.Helpers

  def init(default), do: default

  def call(conn, _default) do
    cond do
      is_admin(conn) -> conn
      true ->
        conn
        |> put_view(TannhauserGateWeb.ErrorView)
        |> put_status(:unauthorized)
        |> render("error.json", error: :unauthorized)
        |> halt()
    end
  end
end
