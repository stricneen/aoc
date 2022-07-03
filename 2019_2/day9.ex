Code.require_file("intcomp.ex")

defmodule Day9 do

  def run(prog) do
    comp = spawn(fn -> IntComp.init() end)
    send(comp, {:start, prog, nil, self()})

    send(comp, {:input, 1})

    receive do
      {:result, r} -> r
    end
  end



end

# Part 1
prog = IntComp.load("9")
r1 = Day9.run(prog)
IO.inspect(r1, charlists: :as_lists)
