defmodule KinoThreeJs.MixProject do
  use Mix.Project

  @version "0.1.0"
  @description "three.js integration with Livebook"

  def project do
    [
      app: :kino_three_js,
      version: @version,
      description: @description,
      name: "KinoThreeJS",
      elixir: "~> 1.14",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      docs: docs(),
      package: package()
    ]
  end

  def application do
    [
      mod: {KinoThreeJS.Application, []}
    ]
  end

  defp deps do
    [
      {:kino, "~> 0.7"},
      {:ex_doc, "~> 0.28", only: :dev, runtime: false}
    ]
  end

  defp docs do
    [
      main: "components",
      source_url: "https://github.com/woodward/kino_three_js",
      source_ref: "v#{@version}",
      extras: ["guides/components.livemd"],
      groups_for_modules: [
        Kinos: [
          Kino.ThreeJS
        ]
      ]
    ]
  end

  def package do
    [
      licenses: ["Apache-2.0"],
      links: %{
        "GitHub" => "https://github.com/woodward/kino_three_js"
      }
    ]
  end
end
