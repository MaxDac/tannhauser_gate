defmodule TannhauserGateWeb.PageController do
  use TannhauserGateWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
