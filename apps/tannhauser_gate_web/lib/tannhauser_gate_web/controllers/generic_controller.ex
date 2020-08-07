defmodule TannhauserGateWeb.GenericController do
  use TannhauserGateWeb, :controller

  def get_manifest(conn, _params) do
    render(conn, "manifest.json")
  end

end
