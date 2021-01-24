-module(day23).
-export([run/0]).


run() ->
    Input = aoc:readlines("../data/day.txt"),
    
    Bots = lists:map(fun(E) -> 
        T = string:tokens(E, " <>,="),
        { list_to_integer(lists:nth(2,T)),
          list_to_integer(lists:nth(3,T)),
          list_to_integer(lists:nth(4,T)),
          list_to_integer(lists:nth(6,T)) } end, Input),
    
    io:format("~p~n", [Bots]),


    io:format("~nPart 1 : ~p~n", [0]).