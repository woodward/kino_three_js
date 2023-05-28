defmodule KinoThreeJs.MixProject do
  use Mix.Project

  def project do
    [
      app: :kino_three_js,
      version: "0.1.0",
      elixir: "~> 1.14",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      extra_applications: [:logger]
    ]
  end

  defp deps do
    [
      {:kino, "~> 0.7"}
    ]
  end
end
