defmodule IntComp do
  def load(day) do
    path = "data/day#{day}.txt"
    # IO.puts("loading #{path}...")
    {:ok, file} = File.read(path)
    file
    |> String.split(",", trim: true)
    |> Enum.map(&String.to_integer/1)
  end

  def p(ptr, prog) do
    IO.puts("#{inspect(ptr)} ->  #{inspect(prog)}")
  end

  def tick({:done, prog}) do
    prog
  end

  def tick({ptr, prog}) do
    instr =
      {Enum.at(prog, ptr), Enum.at(prog, Enum.at(prog, ptr + 1)),
       Enum.at(prog, Enum.at(prog, ptr + 2)), Enum.at(prog, ptr + 3)}

    next =
      case instr do
        {1, a, b, c} ->
          {ptr + 4, List.replace_at(prog, c, a + b)}

        {2, a, b, c} ->
          {ptr + 4, List.replace_at(prog, c, a * b)}

        _ ->
          {:done, prog}
      end

      IntComp.tick(next)
  end
end
