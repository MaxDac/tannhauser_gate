defmodule TannhauserGate.Umbrella.MixProject do
  use Mix.Project

  def project do
    [
      apps_path: "apps",
      start_permanent: Mix.env() == :prod,
#      deps: deps(),
      releases: [
        tannhauser_gate: [
          version: "0.0.1",
          applications: [tannhauser_gate: :permanent, tannhauser_gate_web: :permanent]
        ]
      ]
    ]
  end

  # Dependencies can be Hex packages:
  #
  #   {:mydep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:mydep, git: "https://github.com/elixir-lang/mydep.git", tag: "0.1.0"}
  #
  # Type "mix help deps" for more examples and options.
  #
  # Dependencies listed here are available only for this project
  # and cannot be accessed from applications inside the apps folder
#  defp deps do
#    [
#      {:pbkdf2_elixir, "~> 1.2"},
#      {:pbkdf2, "~> 2.0"}
#    ]
#  end
end
