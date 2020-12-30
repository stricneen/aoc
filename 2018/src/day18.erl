-module(day18).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day18.txt"),
    Coords = [ {X,Y} || X <- lists:seq(1, length(Input)), Y <- lists:seq(1, length(Input))],
    GridList = lists:zip(Coords, lists:flatten(Input)), 
    Grid = dict:from_list(GridList),

    P1 = tick(Grid, 10),       
    io:format("Part 1 : ~p~n", [resource(P1)]),

    P2Tick = 1000000000,
    C = 600 + (P2Tick - 600) rem 28,
    P2 = tick(Grid, C),       
    io:format("Part 2 : ~p~n", [resource(P2)]).

resource(Grid) -> grid_has(35, Grid) * grid_has(124, Grid).

tick(Grid, 0) -> Grid;
tick(Grid, N) ->
    Next = dict:map(fun({X1,Y1},V) -> 
        Around = lists:map(fun({X2, Y2}) -> {X1+X2,Y1+Y2}  end,
            [ {X,Y} || X <- [-1,0,1], Y <- [-1,0,1], (X=/=0) or (Y=/=0) ]),
        Surround = lists:filter(fun(E) -> E =/= error end, lists:map(fun(E) -> dict:find(E, Grid) end, Around)),
        change(V, Surround)
        end, Grid),
    tick(Next, N-1).

 
% An acre containing a lumberyard will remain a lumberyard if it was adjacent to at least one other lumberyard and at least one acre containing trees. Otherwise, it becomes open.
change(35, L) ->
    case (len(35, L) > 0) and (len(124, L) > 0) of
        true -> 35;
        false -> 46
    end;

% An open acre will become filled with trees if three or more adjacent acres contained trees. Otherwise, nothing happens.
change(46, L) ->
    case len(124, L) >= 3 of
        true -> 124;
        false -> 46
    end;

% An acre filled with trees will become a lumberyard if three or more adjacent acres were lumberyards. Otherwise, nothing happens.
change(124, L) ->
    case len(35, L) >= 3 of
        true -> 35;
        false -> 124
    end.

len(N,L) -> length(lists:filter(fun({_,E}) -> E == N end, L)).

grid_has(Val, G) ->
    F = lists:filter(fun({_,V}) -> V == Val end, dict:to_list(G)),
    length(F).

print_dict(D) ->
    aoc:clear_screen(),
    L = dict:to_list(D),
    lists:foldl(fun({{X,Y},C},_) -> 
        aoc:print(Y,X+1, C)
        end, [], L),
    aoc:print(0, 20, "").