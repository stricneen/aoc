Code.require_file("intcomp.ex")

# Part 1
prog = IntComp.load("2")
res = IntComp.tick({0, prog})
IO.puts(List.first(res))

# Part 2
required = 19_690_720

Enum.each(0..99, fn noun ->
  Enum.each(0..99, fn verb ->
    l1 = List.replace_at(prog, 1, noun)
    l2 = List.replace_at(l1, 2, verb)

    res = IntComp.tick({0, l2})
    output = List.first(res)

    if(output === required) do
      IO.puts(noun * 100 + verb)
    end

  end)
end)
