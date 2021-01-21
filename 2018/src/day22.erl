-module(day22).
-export([run/0]).

run() ->

    Start = [{ {0,0}, rocky, torch, 0}, { {0,0}, rocky, climbing, 7}],

    Test = calc(510, {15,15}),
    TRisk = lists:map(fun({_,_,_,{type, _, E}}) -> E end, Test),
    io:format("Test : ~p~n", [lists:sum(TRisk)]),

    % Cave = calc(11394, {7,701}),
    % Risk = lists:map(fun({_,_,_,{type, _, E}}) -> E end, Cave),
    % io:format("Test : 114 = ~p~n", [Cave]),
    % io:format("Part 1 : ~p~n", [lists:sum(Risk)]),

    Map = lists:map(fun ({{location,{X,Y}},_,_,{type,Type,_}}) -> {{X,Y},Type} end, Test),
    % io:format("Map : ~p~n", [Map]),
   
    D = lists:foldl(fun({{X,Y},Type}, Acc) -> 
        {A,B} = permitted(Type),
        dict:store({X,Y,B}, start(X,Y,B),
        dict:store({X,Y,A}, start(X,Y,A), Acc))
        end, dict:new(), Map),

    Route = route(Start, Map, D),

    io:format("Part 2 : ~p~n", [Route]),
    io:format("Part 2 : ~p~n", [dict:find({10,10,torch}, Route)]),
    io:format("  - -- --->~n~n").

route([], _, Route) -> Route;
route(Edge, Map, Route) ->
    % Next = lists:foldl(fun({{X,Y},_,E,D},A) ->

    %      {ok, C} = dict:find({X,Y,E}, Route),
    %      case D


    %         A end, [], spread(Edge, Map, [])),

   Next = spread(Edge, Map, []),

% c(day22), day22:run().

    io:format("Next : ~p~n~n~n", [length(Edge)]),
    io:format("edge : ~p~n", [Edge]),
    io:format("Next : ~p~n~n~n", [Next]),

    { NextRoute, NextStep } = step(Next, Route, []),
% io:format("Next : ~p~n~n~n", [NextRoute]),

    route(NextStep, Map, NextRoute).

step([], R,W) -> {R,W};
step([{{X,Y},B,E,D}|T], Route, Nxt) ->

    {ok, C} = dict:find({X,Y,E}, Route),

    { Step, N } = case D < C of
        true -> { dict:store({X,Y,E}, D, Route), [{{X,Y},B,E,D}] ++ Nxt};
        false -> { Route, Nxt }
    end,

    step(T, Step, N).

start(0,0, torch) -> 0;
start(0,0, climbing) -> 7;
start(_,_,_) -> 10000.

permitted(rocky) -> {climbing, torch};
permitted(narrow) -> {torch, none};
permitted(wet) -> {climbing, none}.





spread([], _, Visited) -> Visited;
spread([{{X,Y}, Type, Equip, Dist} | T], Map, Visited) ->
    Exits = lists:map(fun({E,D}) -> 
        {Nt, Nd} = transition( Equip, Type, D ),
        {E, D, Nt, Nd + Dist }
        end, move({X,Y}, Map)),
    spread(T, Map, Exits ++ Visited).

move({XO, YO}, Map) ->
    lists:filter(fun (X) -> X =/= false end,
    [   lists:keyfind({XO,YO-1}, 1 , Map),
        lists:keyfind({XO+1,YO},1, Map),
        lists:keyfind({XO,YO+1},1, Map),
        lists:keyfind({XO-1,YO},1, Map)
    ]).

transition(climbing, rocky, narrow) -> { torch, 8 };
transition(climbing, wet, narrow)   -> { none, 8 };
transition(climbing, _, _)          -> { climbing, 1 };

transition(none, narrow, rocky)     -> { torch, 8 };
transition(none, wet, rocky)        -> { climbing, 8 };
transition(none, _, _)              -> { none, 1 };

transition(torch, narrow, wet)      -> { none, 8 };
transition(torch, rocky, wet)       -> { climbing, 8 };
transition(torch, _, _)             -> { torch, 1 }.

%         climbing    torch     none
% rocky       x         x
% wet         x                  x
% narrow                x        x 


calc(Depth, {Xt, Yt}) ->
    Locs = [ {X,Y} || X <- lists:seq(0, Xt), Y <- lists:seq(0, Yt)],
    scan(Depth, {Xt, Yt}, Locs, []).

scan(_, _, [], A) -> A;
scan(Depth, {Xt, Yt}, [{X,Y}|T], A) ->

    Geo = case {X,Y} of
        {0,0} -> 0;
        {Xt, Yt} -> 0;
        {X, 0} -> 16807 * X;
        {0, Y} -> 48271 * Y;
        _ -> geological({X,Y},A)
    end,

    Erosion = (Geo + Depth) rem 20183,

    Type = type (Erosion rem 3),

    scan(Depth, {Xt, Yt}, T, [{{location, {X,Y}}, {geologic, Geo}, {erosion, Erosion }, {type, Type, Erosion rem 3}}] ++ A).

type(X) -> case X of
        0 -> rocky;
        1 -> wet;
        2 -> narrow
    end.

geological({X,Y}, L) ->
    {_, _, {erosion, A}, _} = lists:keyfind({location, {X-1,Y}},1, L),
    {_, _, {erosion, B}, _} = lists:keyfind({location, {X,Y-1}},1, L),
    A * B.
