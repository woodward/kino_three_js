defmodule Kino.ThreeJS do
  @moduledoc """
  A kino wrapping [three.js](https://threejs.org/)
  """

  use Kino.JS, assets_path: "lib/assets/three_js"
  use Kino.JS.Live

  defstruct spec: %{}, events: %{}

  @type t :: Kino.JS.Live.t()

  @doc """
  Creates a new kino
  """
  @spec new(String.t()) :: t()
  def new(three_js) do
    Kino.JS.Live.new(__MODULE__, three_js)
  end

  @doc false
  def static(three_js) do
    data = %{spec: three_js.spec, events: three_js.events}
    Kino.JS.new(__MODULE__, data, export_info_string: "three_js")
  end

  @impl true
  def init(three_js, ctx) do
    {:ok, assign(ctx, three_js: three_js)}
  end

  @impl true
  def handle_connect(ctx) do
    {:ok, %{}, ctx}
  end
end