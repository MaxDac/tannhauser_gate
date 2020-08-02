defmodule TannhauserGateWeb.Router do
  use TannhauserGateWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :whitelisted_api do
    plug :accepts, ["json"]
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug TannhauserGateWeb.AuthorizationPlug
  end

  scope "/", TannhauserGateWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", TannhauserGateWeb do
    pipe_through :whitelisted_api

    post "/login", AuthenticationController, :authenticate
    post "/verify", AuthenticationController, :verify_token
  end

  scope "/api", TannhauserGateWeb do
    pipe_through :api

    resources "/users", UserController
    resources "/characters", CharacterController
  end
end
