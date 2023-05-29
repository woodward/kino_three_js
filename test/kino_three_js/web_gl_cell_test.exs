defmodule KinoVegaLite.WebGLCellTest do
  use ExUnit.Case, async: true

  import Kino.Test

  alias KinoThreeJS.WebGLCell

  test "finds tabular data in binding and sends new options to the client" do
    {_kino, _source} = start_smart_cell!(WebGLCell, %{})
  end
end
