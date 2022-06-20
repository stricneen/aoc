Code.require_file("intcomp.ex")

defmodule Day7 do
  def permutations([]), do: [[]]

  def permutations(list),
    do: for(elem <- list, rest <- permutations(list -- [elem]), do: [elem | rest])

  def step(prog, a, b) do
    amp = spawn(fn -> IntComp.init() end)
    send(amp, {:start, prog, nil, self()})
    send(amp, {:input, a})
    send(amp, {:input, b})

    receive do
      {:result, r} -> r
    end
  end

  def amplify([a, b, c, d, e], prog) do
    r1 = step(prog, a, 0)
    r2 = step(prog, b, r1)
    r3 = step(prog, c, r2)
    r4 = step(prog, d, r3)
    step(prog, e, r4)
  end

  def run(prog) do
    Day7.permutations([0, 1, 2, 3, 4])
    |> Enum.map(fn x -> amplify(x, prog) end)
  end

  def feedback([a, b, c, d, e], prog) do
    ampa = spawn(fn -> IntComp.init() end)
    ampb = spawn(fn -> IntComp.init() end)
    ampc = spawn(fn -> IntComp.init() end)
    ampd = spawn(fn -> IntComp.init() end)
    ampe = spawn(fn -> IntComp.init() end)

    send(ampa, {:start, prog, ampb, nil})
    send(ampb, {:start, prog, ampc, nil})
    send(ampc, {:start, prog, ampd, nil})
    send(ampd, {:start, prog, ampe, nil})
    send(ampe, {:start, prog, ampa, self()})

    send(ampa, {:input, a})
    send(ampb, {:input, b})
    send(ampc, {:input, c})
    send(ampd, {:input, d})
    send(ampe, {:input, e})

    send(ampa, {:input, 0})

    receive do
      {:result, r} ->
        r
    end
  end

  def run2(prog) do
    Day7.permutations([5, 6, 7, 8, 9])
    |> Enum.map(fn x -> feedback(x, prog) end)
  end
end

# Part 1
prog = IntComp.load("7")
r1 = Day7.run(prog)
IO.inspect(Enum.max(r1), charlists: :as_lists)

# Part 2
r2 = Day7.run2(prog)
IO.inspect(Enum.max(r2))
