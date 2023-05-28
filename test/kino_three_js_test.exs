defmodule KinoThreeJsTest do
  use ExUnit.Case
  doctest KinoThreeJs

  test "greets the world" do
    assert KinoThreeJs.hello() == :world
  end
end
