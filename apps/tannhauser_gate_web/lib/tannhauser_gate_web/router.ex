defmodule TannhauserGateWeb.Router do
  use TannhauserGateWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug TannhauserGateWeb.TokenPlug
  end

  pipeline :whitelisted_api do
    plug :accepts, ["json"]
    plug TannhauserGateWeb.TokenPlug
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug TannhauserGateWeb.AuthorizationPlug
  end

  scope "/", TannhauserGateWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/index.html", PageController, :index
  end

  scope "/", TannhauserGateWeb do
    pipe_through :whitelisted_api

    get "/manifest.json", GenericController, :get_manifest
  end

  # Other scopes may use custom stacks.
  scope "/api", TannhauserGateWeb do
    pipe_through :whitelisted_api

    post "/login", AuthenticationController, :authenticate
    post "/logout", AuthenticationController, :logout
    post "/verify", AuthenticationController, :verify_token
    post "/users", UserController, :create
  end

  scope "/api", TannhauserGateWeb do
    pipe_through :api

    resources "/users", UserController, except: [:create]
    resources "/characters", CharacterController
    get "/characters/list/:user_id", CharacterController, :index_by_user
    get "/rooms", ChatController, :get_chat_rooms
    get "/rooms/:id", ChatController, :get_chat_room
    get "/chat/logs/:room_id", ChatController, :get_chat_logs_by_room
  end
end
