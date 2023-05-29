defimpl Kino.Render, for: ThreeJS do
  def to_livebook(three_js) do
    three_js |> Kino.ThreeJS.static() |> Kino.Render.to_livebook()
  end
end

defimpl Kino.Render, for: Kino.ThreeJS do
  def to_livebook(three_js) do
    three_js |> Kino.ThreeJS.static() |> Kino.Render.to_livebook()
  end
end
