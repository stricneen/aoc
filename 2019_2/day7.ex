Code.require_file("intcomp.ex")

defmodule Day7 do
  def permutations([]), do: [[]]

  def permutations(list),
    do: for(elem <- list, rest <- permutations(list -- [elem]), do: [elem | rest])

  def amplify([a, b, c, d, e], prog) do
    res1 = IntComp.tick({[a, 0], prog})
    res2 = IntComp.tick({[b, Enum.at(res1, 0)], prog})
    res3 = IntComp.tick({[c, Enum.at(res2, 0)], prog})
    res4 = IntComp.tick({[d, Enum.at(res3, 0)], prog})
    res5 = IntComp.tick({[e, Enum.at(res4, 0)], prog})
    res5
  end

  # 38834

  def run(prog) do
    results =
      Day7.permutations([0, 1, 2, 3, 4])
      |> Enum.map(fn x -> amplify(x, prog) end)
  end

  def feedback([a, b, c, d, e], prog) do
    ampa = spawn(fn -> IntComp.init() end)
    ampb = spawn(fn -> IntComp.init() end)
    ampc = spawn(fn -> IntComp.init() end)
    ampd = spawn(fn -> IntComp.init() end)
    ampe = spawn(fn -> IntComp.init() end)

    send(ampa, {:start, prog, ampb})
    send(ampb, {:start, prog, ampc})
    send(ampc, {:start, prog, ampd})
    send(ampd, {:start, prog, ampe})
    send(ampe, {:start, prog, ampa})

    send(ampa, {:input, a})
    send(ampb, {:input, b})
    send(ampc, {:input, c})
    send(ampd, {:input, d})
    send(ampe, {:input, e})

    send(ampa, {:input, 0})


    ref = Process.monitor(ampe)
    receive do
      {:DOWN, ^ref, _, _, _} ->
        #IO.puts("Process #{inspect(ampe)} is down")
        IO.puts('Complete')
    end

    # Task.async(fn -> :timer.sleep(10000) end)
    # |> Task.await
  end

  def run2(prog) do
    #      Day7.permutations([5,6,7,8,9])
    results =
      [[9, 8, 7, 6, 5]]
      |> Enum.map(fn x -> feedback(x, prog) end)
  end
end

# Part 1
prog = IntComp.load("7")
# r = Day7.run(prog)
# IO.inspect(Enum.max(r), charlists: :as_lists)

r = Day7.run2(prog)
IO.inspect(Enum.max(r), charlists: :as_lists)

# Process.sleep(60000)
