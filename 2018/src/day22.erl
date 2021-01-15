-module(day22).
-export([run/0]).

run() ->
    % Test = calc(510, {10,10}),
    % Risk = lists:map(fun({_,_,{erosion,E},_}) -> E end, Test),
    % io:format("Test : ~p~n", [Risk]),
    % io:format("Test : ~p~n", [lists:sum(Risk)]),

    Depth = 11394,
    Target = {7,701},
    
    Cave = calc(Depth, Target),
    Risk = lists:map(fun({_,_,_,{type, _, E}}) -> E end, Cave),

    io:format("Test : 114 = ~p~n", [Cave]),
    io:format("Part 1 : ~p~n", [lists:sum(Risk)]). %calc(Depth, Target)]).


calc(Depth, {Xt, Yt}) ->
    Locs = [ {X,Y} || X <- lists:seq(0, Xt), Y <- lists:seq(0, Yt)],
    scan(Depth, {Xt, Yt}, Locs, []).

scan(_, _, [], A) -> A;
scan(Depth, {Xt, Yt}, [{X,Y}|T], A) ->

    Geo = case {X,Y} of
        {0,0} -> 0;
        {Xt, Yt} -> 0;
        {X, 0} -> 16807 * X;
        {0, Y} -> 48271 * Y;
        _ -> geo({X,Y},A)
    end,

    Erosion = (Geo + Depth) rem 20183,

    Type = case Erosion rem 3 of
        0 -> rocky;
        1 -> wet;
        2 -> narrow
    end,

    scan(Depth, {Xt, Yt}, T, [{{location, {X,Y}}, {geologic, Geo}, {erosion, Erosion }, {type, Type, Erosion rem 3}}] ++ A).

geo({X,Y}, L) ->
    {_, _, {erosion, A}, _} = lists:keyfind({location, {X-1,Y}},1, L),
    {_, _, {erosion, B}, _} = lists:keyfind({location, {X,Y-1}},1, L),
    A * B.
