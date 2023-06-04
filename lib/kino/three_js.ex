defmodule Kino.ThreeJS do
  @moduledoc """
  A kino wrapping [three.js](https://threejs.org/)
  """

  use Kino.JS, assets_path: "lib/assets/three_js"
  use Kino.JS.Live

  @thirty_fps 30
  @delta_t_ms trunc(1 / @thirty_fps * 1000)

  defstruct spec: %{}, events: %{}

  @type t :: Kino.JS.Live.t()

  @doc """
  Creates a new kino
  """
  @spec new(String.t()) :: t()
  def new(three_js) do
    Kino.JS.Live.new(__MODULE__, three_js)
  end

  def start_simulation(kino) do
    Kino.JS.Live.cast(kino, :start_simulation)
  end

  def stop_simulation(kino) do
    Kino.JS.Live.cast(kino, :stop_simulation)
  end

  @doc false
  def static(_three_js) do
    data = %{}
    Kino.JS.new(__MODULE__, data, export_info_string: "three_js")
  end

  @impl true
  def init(three_js, ctx) do
    number = Keyword.get(three_js, :number, 4)
    type = Keyword.get(three_js, :type, :pendulums)
    {:ok, assign(ctx, number: number, type: type, time: 0, running?: false)}
  end

  @impl true
  def handle_connect(ctx) do
    {:ok, %{number: ctx.assigns.number, type: ctx.assigns.type}, ctx}
  end

  @impl true
  def handle_info({:update_time, time}, ctx) do
    broadcast_event(ctx, "update_time", time)

    if ctx.assigns.running? do
      Process.send_after(self(), {:update_time, time + @delta_t_ms}, @delta_t_ms)
    end

    {:noreply, assign(ctx, time: time)}
  end

  @impl true
  def handle_cast(:start_simulation, ctx) do
    Process.send_after(self(), {:update_time, @delta_t_ms}, @delta_t_ms)
    {:noreply, assign(ctx, time: 0, running?: true)}
  end

  @impl true
  def handle_cast(:stop_simulation, ctx) do
    {:noreply, assign(ctx, running?: false)}
  end
end
