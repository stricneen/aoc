Code.require_file("intcomp.ex")

# Part 1
prog = IntComp.load("5")
res = IntComp.tick({0, prog})

# IO.puts("")
IO.puts("#{inspect(res)}")
