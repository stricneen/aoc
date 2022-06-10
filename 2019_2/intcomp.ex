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

    # instr =
    if cmd === 99,
      do: {cmd, 0, 0, 0, 0, 0, 0},
      else:
        {cmd, Enum.at(prog, ptr + 1), Enum.at(prog, ptr + 2), Enum.at(prog, ptr + 3), first,
         second, third}

  end

  def tick({:done, _, _, output}) do
    output
  end

  def tick({input, prog}) do
    tick({0, prog, input, []})
  end

  def tick({ptr, prog, input, output}) do

     p(ptr, prog)
    instr = parse(ptr, prog)
    print(instr)


    print(input)
    # print(output)

    next =
      case instr do
        # add
        {1, _, _, c, a1, a2, _} ->
          {ptr + 4, List.replace_at(prog, c, a1 + a2), input, output}

        # mult
        {2, _, _, c, a1, a2, _} ->
          {ptr + 4, List.replace_at(prog, c, a1 * a2), input, output}

        # input
        {3, c, _, _, _, _, _} ->
          [h|t] = input
          {ptr + 2, List.replace_at(prog, c, h), t, output}

        # ouput
        {4, _, _, _, a1, _, _} ->
          {ptr + 2, prog, input, [a1 | output]}

        # jump-if-true
        {5, _, _, _, 0, _, _} ->
          {ptr + 3, prog, input, output}

        {5, _, _, _, _, a, _} ->
          {a, prog, input, output}

        # jump-if-false
        {6, _, _, _, 0, a, _} ->
          {a, prog, input, output}

        {6, _, _, _, _, _, _} ->
          {ptr + 3, prog, input, output}

        # less than
        {7, _, _, c, a1, a2, _} ->
          out =
            if a1 < a2,
              do: 1,
              else: 0

          {ptr + 4, List.replace_at(prog, c, out), input, output}

        {8, _, _, c, a1, a2, _} ->
          out =
            if a1 === a2,
              do: 1,
              else: 0

          {ptr + 4, List.replace_at(prog, c, out), input, output}

        {99, _, _, _, _, _, _} ->
          {:done, prog, input, output}

        _ ->
          {:done, prog, input, [0 | output]}
      end

    IntComp.tick(next)
  end
end
