defmodule TannhauserGateWeb.PageController do
  use TannhauserGateWeb, :controller

  import Plug.Conn

  def index(conn, _params) do
#    render(conn, "index.html")
    conn
    |> put_resp_header("content-type", "text/html; charset=utf-8")
    |> send_file(200, "/index.html")
  end
end
