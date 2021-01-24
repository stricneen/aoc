-module(day22).
-export([run/0]).

run() ->

    Start = [{ {0,0}, rocky, torch, 0}, { {0,0}, rocky, climbing, 7}],

    Test = calc(510, {10,10}, {15,15}),
    TRisk = lists:map(fun({_,_,_,{type, _, E}}) -> E end, Test),
    io:format("Test (114): ~p~n", [lists:sum(TRisk)]),

    Cave = calc(11394, {7,701}, {50,750}),
    Risk = lists:map(fun({_,_,_,{type, _, E}}) -> E end, Cave),
    io:format("Part 1 (5637): ~p~n", [lists:sum(Risk)]), 

% c(day22), day22:run().
    Route = start(Start, Cave),

    % io:format("Route : ~p~n", [lists:sort(dict:to_list(Route))]),
    io:format("Part 2 : ~p~n", [dict:find({7,701,torch}, Route)]).

start(Start, Cave) -> 
    Map = lists:map(fun ({{location,{X,Y}},_,_,{type,Type,_}}) -> {{X,Y},Type} end, Cave),
    % io:format("Map : ~p~n", [Map]),
   
    D = lists:foldl(fun({{X,Y},Type}, Acc) -> 
        {A,B} = permitted(Type),
        dict:store({X,Y,B}, start(X,Y,B),
        dict:store({X,Y,A}, start(X,Y,A), Acc))
        end, dict:new(), Map),
    route(Start, Map, D).

route([], _, Route) -> Route;
route(Edge, Map, Route) ->
    io:format("Next : ~p~n", [length(Edge)]),
    % io:format("edge : ~p~n", [Edge]),

    Next = spread(Edge, Map, []),
%  io:format("Next : ~p~n~n~n", [Next]),
    { NextRoute, NextStep } = step(Next, Route, []),
    % io:format("Next : ~p~n~n~n", [NextRoute]),
    route(NextStep, Map, NextRoute).

% c(day22), day22:run().

%   {{0,0,torch},0},        down 1
%   {{0,1,torch},1},        r1
%   {{1,1,torch},2},        r3 + none (10)
%   {{4,1,none    },12},    down 7 + climbing
%   {{4,8,climbing},26},    r
%   {{5,8,climbing},27},    down 3
%   {{5,11,climbing},30}    r
%   {{6,11,climbing},31}    d
%   {6,12,climbing},32}     r4
%   {{10,12,climbing},36},  u2
%   {{10,10,climbing},38},  torch

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

% c(day22), day22:run().

spread([], _, Visited) -> 
    % S = lists:reverse(lists:keysort(4, Visited)),
    S = lists:foldl(fun({{X,Y}, Type, Equip, Dist},A) -> 
        [{{X,Y}, Type, Equip, Dist}, {{X,Y}, Type, swap(Type, Equip), Dist + 7}] ++ A end, [], Visited),
    S2 = lists:reverse(lists:keysort(4, S)),    
    M = lists:map(fun({{X,Y}, Type, Equip, Dist}) -> {{X,Y,Type, Equip}, Dist} end, S2),
    D = dict:to_list(dict:from_list(M)),
    M2 = lists:map(fun({{X,Y, Type, Equip}, Dist}) -> {{X,Y},Type, Equip, Dist} end, D),

    % remove routes larger than 1000
    M3 = lists:filter(fun({_,_, _, Dist}) -> Dist < 1000 end, M2),

    % io:format("V : ~p~n", [M2]),
    M3;


spread([{{X,Y}, Type, Equip, Dist} | T], Map, Visited) ->
    Exits = lists:map(fun({E,D}) -> 
        {Nt, Nd} = transition( Equip, Type, D ),
        {E, D, Nt, Nd + Dist }
        end, move({X,Y}, Map)),
    spread(T, Map, Exits ++ Visited).

swap(rocky, climbing) -> torch;
swap(rocky, torch) -> climbing;
swap(wet, none) -> climbing;
swap(wet, climbing) -> none;
swap(narrow, none) -> torch;
swap(narrow, torch) -> none.

move({XO, YO}, Map) ->
    lists:filter(fun (X) -> X =/= false end,
    [   lists:keyfind({XO,YO-1}, 1 , Map),
        lists:keyfind({XO+1,YO},1, Map),
        lists:keyfind({XO,YO+1},1, Map),
        lists:keyfind({XO-1,YO},1, Map)  ]).

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

% th 988

calc(Depth, {Xt, Yt}, {Xs, Ys}) ->
    Locs = [ {X,Y} || X <- lists:seq(0, Xs), Y <- lists:seq(0, Ys)],
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
