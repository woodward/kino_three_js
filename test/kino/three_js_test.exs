defmodule Kino.ThreeJSTest do
  use ExUnit.Case, async: true

  import Kino.Test

  setup :configure_livebook_bridge

  test "works" do
    assert true
  end
end
