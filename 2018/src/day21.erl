-module(day21).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day21.txt"),

    Prog = device:parse(Input),
    Output = device:execute(Prog, [ debug, {ticks, 10000}, {registers, {7216956,0,0,0,0,0}}]),

    device:output(Output),

    io:format("~nPart 1 : ~p~n", [Output]).

