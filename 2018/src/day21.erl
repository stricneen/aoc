-module(day21).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day.txt"),
    Prog = device:parse(Input),

    % Part 1
    Output = device:execute(Prog, [ debug, {ticks, 10000}, {registers, {7216956,0,0,0,0,0}}]),
    io:format("~nPart 1 : ~p~n", [Output]),
    device:output(Output),

    Output2 = device:execute(Prog, [ {registers, {0,0,0,0,0,0}}]),
    device:output(Output2).




% c(device), c(day21), day21:run().
% th 16540506

% 14596916

% tl 13183
