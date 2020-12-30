-module(day19).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day.txt"),

    Prog = device:parse(Input),
    Output = device:execute(Prog, [debug]),

    io:format("~nPart 1 : ~p~n", [Output]).