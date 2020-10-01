-module(day6).
-export([run/0]).



run() ->
    Input = aoc:readlines("../data/day.txt"),
    %io:format(Input),

    Coords = lists:map(fun(X) -> 
        [A,B] = string:lexemes(X, ", "),
        {list_to_integer(A),list_to_integer(B)}
        end, Input),
    
    {X1, Y1} = lists:foldl(fun({X,Y}, {AX,AY}) -> {min(X, AX), min(Y, AY)} end, {1000,1000}, Coords),
    {X2, Y2} = lists:foldl(fun({X,Y}, {AX,AY}) -> {max(X, AX), max(Y, AY)} end, {0,0}, Coords),
            
    AllCoords = [ {X,Y} || X <- lists:seq(X1,X2), Y <- lists:seq(Y1,Y2)],

    io:format("TL : ~p~n", [{X1, Y1}]),
    io:format("BR : ~p~n", [{X2, Y2}]),
    io:format("Part 1 : ~p~n", [AllCoords])

.

% max(X,Y) -> 
%     case X > Y of
%         true -> X;
%         false -> Y
%     end.

% min(X,Y) -> 
%     case X < Y of
%         true -> X;
%         false -> Y
%     end.