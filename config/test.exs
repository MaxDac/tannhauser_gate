use Mix.Config

# Configure your database
config :tannhauser_gate, TannhauserGate.Repo,
  username: "postgres",
  password: "tannhauser-db",
  database: "tannhauser_gate_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :tannhauser_gate_web, TannhauserGateWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
