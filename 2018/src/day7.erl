-module(day7).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day7.txt"),
    Start = lists:map(fun(X) -> 
         Id = string:tokens(X, " "),
         {lists:nth(2, Id), lists:nth(8, Id)} 
            end, Input),

    P1 = next(Start, [], ""),

    io:format("~nPart 1 : ~p~n", [P1]).


next([], _, C) -> C;
next([{A,B}], _, C) -> C ++ A ++ B; 
next(Actions, Done, P1) ->
    Pre = lists:map(fun({X,_}) -> X end, Actions),
    Pst = lists:map(fun({_,Y}) -> Y end, Actions),
    Can = lists:sort(dedup(lists:filter(fun(X) -> not lists:member(X, Pst) end,Pre))),
    Next = hd(Can),
    Action2 = lists:filter(fun({S,_}) -> S /= Next end, Actions),
    next(Action2, [Next] ++ Done, P1 ++ Next).



dedup(L) -> 
    S = sets:from_list(L),
    sets:to_list(S).