-module(day19).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day19.txt"),

    Prog = device:parse(Input),
    Output = device:execute(Prog, [ debug, {ticks, 25}, {registers, {1,0,0,0,0,0}}]),

    io:format("~nPart 1 : ~p~n", [Output]).