defmodule KinoThreeJS.WebGLCell do
  @moduledoc false

  use Kino.JS, assets_path: "lib/assets/web_gl_cell"
  use Kino.JS.Live
  use Kino.SmartCell, name: "WebGL"

  @impl true
  def init(_attrs, ctx) do
    {:ok, ctx, reevaluate_on_change: true}
  end

  @impl true
  def handle_connect(ctx) do
    payload = %{}
    {:ok, payload, ctx}
  end

  @impl true
  def handle_event("update", foo, ctx) do
    broadcast_event(ctx, "update", foo)
    {:noreply, ctx}
  end

  @impl true
  def to_attrs(_ctx) do
    %{}
  end

  @impl true
  def to_source(_attrs) do
    # attrs["source"]
    ""
  end
end
