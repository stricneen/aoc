Code.require_file("intcomp.ex")

defmodule Day7 do

  def permutations([]), do: [[]]
def permutations(list), do: for elem <- list, rest <- permutations(list--[elem]), do: [elem|rest]

  def amplify([a,b,c,d,e], prog) do

    res1 = IntComp.tick({[a, 0], prog})
    res2 = IntComp.tick({[b, Enum.at(res1, 0)], prog})
    res3 = IntComp.tick({[c, Enum.at(res2, 0)], prog})
    res4 = IntComp.tick({[d, Enum.at(res3, 0)], prog})
    res5 = IntComp.tick({[e, Enum.at(res4, 0)], prog})

    res5
  end

  def run(prog) do
    results = Day7.permutations(([0,1,2,3,4]))
    |> Enum.map(fn x -> amplify(x, prog) end)

  end

end

# Part 1




prog = IntComp.load("7")
r = Day7.run(prog)



# out = Day7.amplify([4,3,2,1,0], prog)
# IO.puts("\n---output---")
IO.inspect Enum.max(r), charlists: :as_lists

# x = Day7.permutations(([0,1,2,3,4]))
# IO.inspect x, charlists: :as_lists
