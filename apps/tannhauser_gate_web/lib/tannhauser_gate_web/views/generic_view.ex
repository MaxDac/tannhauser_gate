defmodule TannhauserGateWeb.GenericView do
  use TannhauserGateWeb, :view

  def render("code.json", %{code: code}) do
    %{code: code}
  end

  def render("manifest.json", _) do
    %{
      "short_name" => "React App",
      "name" => "Create React App Sample",
      "icons" => [
        %{
          "src" => "favicon.ico",
          "sizes" => "64x64 32x32 24x24 16x16",
          "type" => "image/x-icon"
        },
        %{
          "src" => "images/icon-192.png",
          "type" => "image/png",
          "sizes" => "192x192"
        },
        %{
          "src" => "images/icon-512.png",
          "type" => "image/png",
          "sizes" => "512x512"
        }],
      "start_url" => "/",
      "display" => "standalone",
      "theme_color" => "#000000",
      "background_color" => "#ffffff"
    }

  end
end
