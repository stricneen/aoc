defmodule IntComp do
  def init() do
    # IO.puts('init')

    receive do
      {:start, prog, output, result} ->
        tick({0, prog, output, result, nil, 0})
    end
  end

  def parse(ptr, prog, base) do

    full = String.pad_leading(Integer.to_string(Enum.at(prog, ptr)), 5, "0")

    cmd = String.to_integer(String.slice(full, 3..4))

    first =
      if String.slice(full, 2..2) === "0" && cmd != 99,
        do: Enum.at(prog, Enum.at(prog, ptr + 1)),
        else: Enum.at(prog, ptr + 1)

    second =
      if String.slice(full, 1..1) === "0" && cmd != 99 and cmd != 4,
        do: Enum.at(prog, Enum.at(prog, ptr + 2)),
        else: Enum.at(prog, ptr + 2)

    third =
      if String.slice(full, 0..0) === "0" && cmd != 99 and cmd != 4,
        do: Enum.at(prog, Enum.at(prog, ptr + 3)),
        else: Enum.at(prog, ptr + 3)

    # instr =
    if cmd === 99,
      do: {cmd, 0, 0, 0, 0, 0, 0},
      else:
        {cmd, Enum.at(prog, ptr + 1), Enum.at(prog, ptr + 2), Enum.at(prog, ptr + 3), first,
         second, third}
  end

  def tick({:done, _,_,_,_,_}) do
  end

  def tick({ptr, prog, outputPid, resultPid, out, base}) do
    # p(ptr, prog)
    instr = parse(ptr, prog, base)
    # print(instr)
    # print(resultPid)

    nbase =
      if elem(instr, 0) == 9 do
        IO.puts('base')
        IO.puts( base + elem(instr, 4))
        base + elem(instr, 4)
      else
        base
      end

    # input
    input =
      if elem(instr, 0) == 3 do
        # IO.puts('waiting .... ')

        receive do
          {:input, value} ->
            value
        end
      end

    # output
    nout =
      if elem(instr, 0) == 4 do
        if (outputPid != nil) do
          send(outputPid, {:input, elem(instr, 4)})
        end
          elem(instr, 4)
      else
        out
      end

    # result
    if elem(instr, 0) == 99 and resultPid != nil do
      send(resultPid, {:result, nout})
    end

    {nptr, nprog} =
      case instr do
        # add
        {1, _, _, c, a1, a2, _} ->
          {ptr + 4, List.replace_at(prog, c, a1 + a2)}

        # mult
        {2, _, _, c, a1, a2, _} ->
          {ptr + 4, List.replace_at(prog, c, a1 * a2)}

        # input
        {3, c, _, _, _, _, _} ->
          {ptr + 2, List.replace_at(prog, c, input)}

        # ouput
        {4, _, _, _, _, _, _} ->
          {ptr + 2, prog}

        # jump-if-true
        {5, _, _, _, 0, _, _} ->
          {ptr + 3, prog}

        {5, _, _, _, _, a, _} ->
          {a, prog}

        # jump-if-false
        {6, _, _, _, 0, a, _} ->
          {a, prog}

        {6, _, _, _, _, _, _} ->
          {ptr + 3, prog}

        # less than
        {7, _, _, c, a1, a2, _} ->
          out =
            if a1 < a2,
              do: 1,
              else: 0

          {ptr + 4, List.replace_at(prog, c, out)}

        {8, _, _, c, a1, a2, _} ->
          out =
            if a1 === a2, do: 1, else: 0

          {ptr + 4, List.replace_at(prog, c, out)}

        {9, _, _, _, _, _, _} ->
            {ptr + 2, prog}

        {99, _, _, _, _, _, _} ->
          {:done, nout}
      end

    IntComp.tick({nptr, nprog, outputPid, resultPid, nout, nbase})
  end

  # Utils

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
end
