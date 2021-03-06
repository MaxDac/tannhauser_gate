defmodule TannhauserGateWeb.AuthorizationPlug do
  import Plug.Conn
  import Phoenix.Controller
  import TannhauserGateWeb.Helpers
  import TannhauserGateWeb.JwtToken
  import TannhauserGateWeb.PlugHelpers

  @session_cookie_key "x-session-token"

  def init(default), do: default

  def call(conn, _default), do: call_impl(conn, true)
end
