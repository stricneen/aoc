-module(day23).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day23.txt"),
    
    Bots = lists:map(fun(E) -> 
        T = string:tokens(E, " <>,="),
        { list_to_integer(lists:nth(2,T)),
          list_to_integer(lists:nth(3,T)),
          list_to_integer(lists:nth(4,T)),
          list_to_integer(lists:nth(6,T)) } end, Input),
    
    % io:format("~p~n", [Bots]),

    Largest = hd(lists:reverse(lists:keysort(4, Bots))),
    InRange = lists:filter(fun(X) -> dist(Largest, X) =< element(4,Largest) end, Bots),

    io:format("~nPart 1 : ~p~n", [length(InRange)]).

dist({Xs, Ys, Zs, _}, {Xt, Yt, Zt, _}) ->
    abs(Xs - Xt) + abs(Ys - Yt) + abs(Zs - Zt).