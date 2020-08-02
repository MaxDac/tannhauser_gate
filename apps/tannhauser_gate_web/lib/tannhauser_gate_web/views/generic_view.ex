defmodule TannhauserGateWeb.GenericView do
  use TannhauserGateWeb, :view

  def render("code.json", %{code: code}) do
    %{code: code}
  end
end
