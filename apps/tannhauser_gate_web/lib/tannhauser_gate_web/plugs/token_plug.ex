defmodule TannhauserGateWeb.TokenPlug do
  import Plug.Conn
  import Phoenix.Controller
  import TannhauserGateWeb.Helpers
  import TannhauserGateWeb.JwtToken
  import TannhauserGateWeb.PlugHelpers

  def init(default), do: default

  def call(conn, _default), do: call_impl(conn, false)
end
