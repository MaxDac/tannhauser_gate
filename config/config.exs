# This file is responsible for configuring your umbrella
# and **all applications** and their dependencies with the
# help of Mix.Config.
#
# Note that all applications in your umbrella share the
# same configuration and dependencies, which is why they
# all use the same configuration file. If you want different
# configurations or dependencies per app, it is best to
# move said applications out of the umbrella.
use Mix.Config

# Configure Mix tasks and generators
config :tannhauser_gate,
  ecto_repos: [TannhauserGate.Repo]

config :tannhauser_gate_web,
  ecto_repos: [TannhauserGate.Repo],
  generators: [context_app: :tannhauser_gate]

# Configures the endpoint
config :tannhauser_gate_web, TannhauserGateWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "Dl/8Q4eZPKWX4WCExFva+vVDCrlRQa0cGyExUKdqK7z3aWIaYyh5gIHK3puz2EBd",
  render_errors: [view: TannhauserGateWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: TannhauserGateWeb.PubSub, adapter: Phoenix.PubSub.PG2],
  live_view: [signing_salt: "M8ZRRO9f"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :joken, default_signer: "secret"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
