-module(day11).
-export([run/0]).

run() ->
    Serial = 4172,

    Grid = [{X,Y} || X <-lists:seq(1,298), Y<-lists:seq(1,298)],

    Cells = lists:map(fun({X,Y}) -> 
        Quads = [{X1,Y1} || X1 <- lists:seq(X, X+2), Y1 <- lists:seq(Y, Y+2) ],
        Power = lists:map(fun({QX,QY}) -> {_,_,P} = power({QX,QY}, Serial), P end, Quads),
        {X,Y,lists:sum(Power)}
        end, Grid),
g
    Powers = lists:map(fun({_,_,P}) -> P end, Cells),
    Max = lists:max(Powers),
    Highest = lists:keyfind(Max, 3, Cells),

    io:format("~nPart 1 : ~p~n", [Highest]).

power({X,Y}, Serial) ->
     Calc = (((X + 10) * Y) + Serial) * (X + 10),
     Val = lists:nth(3,lists:reverse(integer_to_list(Calc)))-48-5,
     {X,Y,Val}.



