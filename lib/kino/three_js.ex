defmodule Kino.ThreeJS do
  @moduledoc """
  A kino wrapping [three.js](https://threejs.org/)
  """

  use Kino.JS, assets_path: "lib/assets/three_js"
  use Kino.JS.Live

  @delta_t_ms 50

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
  def static(three_js) do
    data = %{spec: three_js.spec, events: three_js.events}
    Kino.JS.new(__MODULE__, data, export_info_string: "three_js")
  end

  @impl true
  def init(three_js, ctx) do
    number = Keyword.get(three_js, :number, 4)
    {:ok, assign(ctx, number: number, time: 0, running?: false)}
  end

  @impl true
  def handle_connect(ctx) do
    {:ok, ctx.assigns.number, ctx}
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
