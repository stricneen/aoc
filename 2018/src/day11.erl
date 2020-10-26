-module(day11).
-export([run/0]).

run() ->
    Serial = 18,
    GridSize = 300,

    Grid = [{X,Y} || X <-lists:seq(1,GridSize+3), Y<-lists:seq(1,GridSize+3)],

    Cells = lists:map(fun({X,Y}) -> 
        Quads = [{X1,Y1} || X1 <- lists:seq(X, X+2), Y1 <- lists:seq(Y, Y+2) ],
        Power = lists:map(fun({QX,QY}) -> {_,_,P} = power({QX,QY}, Serial), P end, Quads),
        {X,Y,lists:sum(Power)}
        end, Grid),

    Powers = lists:map(fun({_,_,P}) -> P end, Cells),
    Max = lists:max(Powers),
    Highest = lists:keyfind(Max, 3, Cells),

    io:format("~nPart 1 : ~p~n", [Highest]),


    CellGrid = dict:from_list(lists:map(fun({X,Y}) -> {{X,Y}, power({X,Y}, Serial)} end, Grid)),


    S = lists:map(fun({X,Y}) -> 
        io:format("~p~n", [{X,Y}]),

        Sizes = lists:seq(3, max(3,GridSize + 3 - max(X,Y))), % all the sizes
        Squares = lists:map(fun(S) -> {X,Y,S,square(X,Y,S,Serial, CellGrid)} end, Sizes),

        PowerList = lists:map(fun({_,_,_,Z}) -> Z end, Squares),

        MaxPower = lists:max(PowerList),
        Biggest = lists:filter(fun({_,_,_,P}) -> P == MaxPower end, Squares),
        io:format("~p~n", [{X,Y,Biggest}]),
        hd(Biggest)

    end, Grid),

    %MHighest = 0,
    io:format("~nPart 2 : ~p~n", [S])



    % Squares = [{X,Y,L} || {X,Y} <- Grid, L <- lists:seq(3, max(3,303 - max(X,Y)))],

    % MCells = lists:map(fun({X,Y,S}) -> 
    %     Quads = [{X1,Y1} || X1 <- lists:seq(X, X+S-1), Y1 <- lists:seq(Y, Y+S-1) ],
    %     Power = lists:map(fun({QX,QY}) -> {_,_,P} = power({QX,QY}, Serial), P end, Quads),
    %     {X,Y,S,lists:sum(Power)}
    %     end, Squares),

    % MPowers = lists:map(fun({_,_,_,P}) -> P end, MCells),
    % MMax = lists:max(MPowers),
    % MHighest = lists:keyfind(MMax, 3, MCells),

.

square(X,Y,L,Serial, CellGrid) ->
    Grid = [ {X1,Y1} || X1 <- lists:seq(X,X+L-1), Y1 <- lists:seq(Y,Y+L-1)], 
    Vals = lists:map(fun(Coords) -> 
        {_,_,V} = dict:fetch(Coords ,CellGrid), 
        V end, Grid),     
    lists:sum(Vals).

power({X,Y}, Serial) ->
     Calc = (((X + 10) * Y) + Serial) * (X + 10),
     Val = lists:nth(3,lists:reverse(integer_to_list(Calc)))-48-5,
     {X,Y,Val}.



