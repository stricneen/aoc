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
    Clay = lists:map(fun({X,Y}) -> {X,Y} end, Parsed),
    Spring = {500,0},

    Water = tick([Spring], [], Clay, 0),
    % io:format("~p~n : ", [XX]),
    print_g(Spring, Clay, Water, MinX).

tick(Lead, Wet, Clay, C) ->
    io:format("~p~n", [C]),
    case C > 15 of
        true -> Wet;
        false -> 
            
            Spread = lists:foldl(fun({X,Y},Acc) ->
                case lists:member({X,Y+1}, Clay) of
                    false -> [{X,Y+1}] ++ Acc;
                    true -> Acc
                end
                end, Wet, Lead),
%   io:format("~p~n", [Spread]),
        tick(Spread, aoc:dedup(Lead ++ Wet), Clay, C+1)
    end.
        

            
    % io:format("~nMin : ~p~n", [MinX]),
        
%  io:format("~nPart 1 : ~p~n", [Origins]).


print_g({SX,SY}, Clay, Water, MinX) ->
    aoc:clear_screen(),
    aoc:print(SX-MinX+2,SY+1, "+"),

    lists:foldl(fun({X,Y},_) -> 
        aoc:print(X-MinX+2,Y+1 , "#")
        end, [], Clay),

    lists:foldl(fun({X,Y},_) -> 
        aoc:print(X-MinX+2,Y+1 , "|")
        end, [], Water),

    aoc:print(20,20,"").




