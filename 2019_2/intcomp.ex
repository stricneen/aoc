defmodule IntComp do
  def load(day) do
    path = "data/day#{day}.txt"
    # IO.puts("loading #{path}...")
    {:ok, file} = File.read(path)

    file
    |> String.split(",", trim: true)
    |> Enum.map(&String.to_integer/1)
  end

  def print(prog) do
    IO.puts("   ->  #{inspect(prog)}")
  end

  def p(ptr, prog) do
    IO.puts("#{inspect(ptr)} ->  #{inspect(prog)}")
  end

  # cmd, r1,r1,r3, a1,a2
  def parse(ptr, prog) do
    full = String.pad_leading(Integer.to_string(Enum.at(prog, ptr)), 5, "0")

    # print(full)
    # print(prog)

    cmd = String.to_integer(String.slice(full, 3..4))

    # IO.puts(cmd)

    first =
      if String.slice(full, 2..2) === "0" && cmd != 99,
        do: Enum.at(prog, Enum.at(prog, ptr + 1)),
        else: Enum.at(prog, ptr + 1)

    second =
      if String.slice(full, 1..1) === "0" && cmd != 99,
        do: Enum.at(prog, Enum.at(prog, ptr + 2)),
        else: Enum.at(prog, ptr + 2)

    third =
      if String.slice(full, 0..0) === "0" && cmd != 99,
        do: Enum.at(prog, Enum.at(prog, ptr + 3)),
        else: Enum.at(prog, ptr + 3)

        # 4880388 low
        # 5000972
        # 5064712 high

    # instr =
    if cmd === 99,
      do: {cmd, 0, 0, 0, 0, 0, 0},
      else:
        {cmd, Enum.at(prog, ptr + 1), Enum.at(prog, ptr + 2), Enum.at(prog, ptr + 3), first,
         second, third}

    # {cmd, Enum.at(prog, ptr + 1), Enum.at(prog, ptr + 2), Enum.at(prog, ptr + 3), first, second, third}
  end

  def tick({:done, prog, output}) do
    output
  end

  def tick({ptr, prog}) do
    tick({ptr, prog, []})
  end

  def tick({ptr, prog, output}) do
    # p(ptr, prog)
    instr = parse(ptr, prog)
    print(instr)
    # IO.puts("")

    next =
      case instr do
        # add
        {1, _, _, c, a1, a2, a3} ->
          {ptr + 4, List.replace_at(prog, c, a1 + a2), output}

        # mult
        {2, _, _, c, a1, a2, a3} ->
          {ptr + 4, List.replace_at(prog, c, a1 * a2), output}

        {3, _, _, c, _, _, _} ->
          # hard coded input
          {ptr + 2, List.replace_at(prog, c, 5), output}

        {4, _, _, _, a1, _, _} ->
          {ptr + 2, prog, [a1 | output]}

        # jump-if-true
        {5, _, _, _, 0, _, _} ->
          {ptr + 3, prog, output}

        {5, _, _, _, _, a, _} ->
          {a, prog, output}

        # jump-if-false
        {6, _, _, _, 0, a, _} ->
          {a, prog, output}

        {6, _, _, _, _, _, _} ->
          {ptr + 3, prog, output}

        # less than
        {7, r1, r2, c, a1, a2, a3} ->
          out =
            if a1 < a2,
              do: 1,
              else: 0

          {ptr + 4, List.replace_at(prog, c, out), output}

        {8, r1, r2, c, a1, a2, a3} ->
          out =
            if a1 === a2,
              do: 1,
              else: 0

          {ptr + 4, List.replace_at(prog, c, out), output}

        {99, _, _, _, _, _, _} ->
          {:done, prog, output}

        _ ->
          {:done, prog, ['FAIL' | output]}
      end

    IntComp.tick(next)
  end
end
