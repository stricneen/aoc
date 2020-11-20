-module(day17).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day.txt"),
 
    Parsed = lists:foldl(fun(X, Acc) ->
        L = string:lexemes(X, ","),
        {A,B} = {hd(L), hd(tl(L))},
        F = list_to_integer(string:sub_string(A,3)),
        S = string:sub_string(B, 4),
        SS = string:lexemes(S, ".."),
        {S1, S2} = {list_to_integer(hd(SS)), list_to_integer(hd(tl(SS)))},
        Pin = hd(X),
        case Pin of
            120 -> lists:foldl(fun(IX, InnAcc) -> [{F, IX}] ++ InnAcc end, [], lists:seq(S1,S2));
            121 -> lists:foldl(fun(IX, InnAcc) -> [{IX, F}] ++ InnAcc end, [], lists:seq(S1,S2))
        end ++ Acc
        end, [], Input),


    % MinX = lists:foldl(fun({X,_}, A) -> if X < A -> X; true -> A end end, 100000, Parsed),
    MinX = lists:foldl(fun({X,_}, A) -> if X < A -> X; true -> A end end, 100000, Parsed),
    Origins = lists:map(fun({X,Y}) -> {X,Y} end, Parsed),
    Spring = {500,0},


    print_g(Spring, Origins, MinX).

    % io:format("~nMin : ~p~n", [MinX]),
        
%  io:format("~nPart 1 : ~p~n", [Origins]).


print_g({SX,SY}, L, MinX) ->
    aoc:clear_screen(),
    aoc:print(SX-MinX+2,SY+1, "+"),
    lists:foldl(fun({X,Y},_) -> 
        aoc:print(X-MinX+2,Y+1 , "#")
        end, [], L),
    aoc:print(20,20,"").




