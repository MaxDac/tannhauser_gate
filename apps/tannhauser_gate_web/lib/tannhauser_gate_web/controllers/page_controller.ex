defmodule TannhauserGateWeb.PageController do
  use TannhauserGateWeb, :controller

  import Plug.Conn

  def index(conn, _params) do
#    render(conn, "index.html")
    conns
    |> put_resp_header("content-type", "text/html; charset=utf-8")
    |> send_file(200, Application.app_dir(:tannhauser_gate_web, "priv/static/index.html"))
  end
end
