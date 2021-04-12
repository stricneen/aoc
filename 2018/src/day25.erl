-module(day25).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day.txt"),
    Parsed = parse(Input),
    
    % Dists = [ {A,B,dist(A,B)} || A <- Parsed, B <-Parsed ],

    io:format("~nPart 1 : ~p~n", [length(constellation(Parsed))]).

constellation(L) -> 
    N = neighbours(L,[]),
    io:format(" > : ~p~n", [N]),
    match_up(N, []).

match_up([], R) -> R;
match_up([H|T], R) -> 
    match_up(T, R).


neighbours([], R) -> lists:filter(fun(X) -> length(X) > 0 end, R);
neighbours([H|T], R) -> 
    Dist = lists:map(fun(E) -> {E, dist(H,E)} end, T),
    Near = lists:filter(fun({_,Y}) -> Y =< 3 end, Dist),
    %  io:format("~p > : ~p~n", [H, Near]),
    neighbours(T,[Near] ++ R).

dist({A1,A2,A3,A4},{B1,B2,B3,B4}) -> 
    abs(A1-B1) + abs(A2-B2) + abs(A3-B3) + abs(A4-B4).

parse(L) ->
    lists:map(fun(E) ->
        T = string:tokens(E, ","),
        { list_to_integer(lists:nth(1,T)),
          list_to_integer(lists:nth(2,T)),
          list_to_integer(lists:nth(3,T)),
          list_to_integer(lists:nth(4,T)) }end, L).
