-module(day11).
-export([run/0]).

run() ->
    Serial = 4172,
    GridSize = 300,

    Grid = [{X,Y} || X <-lists:seq(1,GridSize-2), Y<-lists:seq(1,GridSize-2)],

    Cells = lists:map(fun({X,Y}) -> 
        Quads = [{X1,Y1} || X1 <- lists:seq(X, X+2), Y1 <- lists:seq(Y, Y+2) ],
        Power = lists:map(fun({QX,QY}) -> {_,_,P} = power({QX,QY}, Serial), P end, Quads),
        {X,Y,lists:sum(Power)}
        end, Grid),

    Powers = lists:map(fun({_,_,P}) -> P end, Cells),
    Max = lists:max(Powers),
    Highest = lists:keyfind(Max, 3, Cells),

    io:format("~nPart 1 : ~p~n", [Highest]),

    S = lists:map(fun({X,Y}) -> 
        %io:format("~p~n", [{X,Y}]),

        Sizes = lists:seq(10, 20),
        Squares = lists:map(fun(S) -> {X,Y,S,square(X,Y,S,Serial)} end, Sizes),
        PowerList = lists:map(fun({_,_,_,Z}) -> Z end, Squares),

        MaxPower = lists:max(PowerList),
        Biggest = lists:filter(fun({_,_,_,P}) -> P == MaxPower end, Squares),
        %io:format("~p~n", [{X,Y,Biggest}]),
        hd(Biggest)

    end, Grid),

     P2PowerList = lists:map(fun({_,_,_,Z}) -> Z end, S),
     P2MaxPower = lists:max(P2PowerList),
     P2Biggest = lists:filter(fun({_,_,_,P}) -> P == P2MaxPower end, S),

    io:format("~nPart 2 : ~p~n", [P2Biggest])
.

square(X,Y,L,Serial) ->
    Grid = [ {X1,Y1} || X1 <- lists:seq(X,X+L-1), Y1 <- lists:seq(Y,Y+L-1)], 
    Vals = lists:map(fun(Coords) -> 
        {_,_,V} = power(Coords,Serial), 
        V end, Grid),     
    lists:sum(Vals).

power({X,Y}, Serial) ->
     Calc = (((X + 10) * Y) + Serial) * (X + 10),
     Val = lists:nth(3,lists:reverse(integer_to_list(Calc)))-48-5,
     {X,Y,Val}.



