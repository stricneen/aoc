-module(day25).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day25.txt"),
    Parsed = parse(Input),
    
    % Dists = [ {A,B,dist(A,B)} || A <- Parsed, B <-Parsed ],
    A = constellation(Parsed, []),
      io:format(" ~p~n", [A]),
    io:format("~nPart 1 : ~p~n", [length(A)]).

constellation(L, C) -> 

    io:format("~p~n", [L]),

    T = lists:foldl(fun(E,A) -> 
         io:format("Acc: ~p~n", [A]),

        Distances = lists:map(fun(X) -> 
            lists:map(fun(Y) -> {dist(Y,E), Y} end, X) end, A),

%   io:format("Dists: ~p~n", [Distances]),


        { Connections , Others } = lists:partition(
            fun(X) -> lists:any(fun({D,_}) -> D =< 3 end, X)
            end, Distances),


%   io:format("{ Connections , Others }: ~p~n", [{ Connections , Others }]),

Conn = lists:map(fun(Lx) -> lists:map(fun({_,Cx}) -> Cx end, Lx) end,Connections),
Othe = lists:map(fun(Lx) -> lists:map(fun({_,Cx}) -> Cx end, Lx) end,Others),

%   io:format("~p~n", [{ Conn , Othe }]),
        merge(E, Conn, Othe)
    
    end, [], L),
    
    T.

merge(E, [], O) -> [[E]] ++ O;
merge(E, C, O) -> [[E|lists:append(C)]] ++ O.


dist({A1,A2,A3,A4},{B1,B2,B3,B4}) -> 
    abs(A1-B1) + abs(A2-B2) + abs(A3-B3) + abs(A4-B4).

parse(L) ->
    lists:map(fun(E) ->
        T = string:tokens(E, ","),
        { list_to_integer(lists:nth(1,T)),
          list_to_integer(lists:nth(2,T)),
          list_to_integer(lists:nth(3,T)),
          list_to_integer(lists:nth(4,T)) } end, L).
