Code.require_file("intcomp.ex")

# Part 1
prog = IntComp.load("7")

res1 = IntComp.tick({[4, 0], prog})
res2 = IntComp.tick({[3, Enum.at(res1, 0)], prog})
res3 = IntComp.tick({[2, Enum.at(res2, 0)], prog})
res4 = IntComp.tick({[1, Enum.at(res3, 0)], prog})
res5 = IntComp.tick({[0, Enum.at(res4, 0)], prog})

IO.puts("\n---output---")
IO.inspect res5, charlists: :as_lists
