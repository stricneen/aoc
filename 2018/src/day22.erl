-module(day22).
-export([run/0]).

run() ->

    Start = [{ {0,0}, rocky, torch, 0}, { {0,0}, rocky, climbing, 7}],

    Test = calc(510, {10,10}),

    % TRisk = lists:map(fun({_,_,_,{type, _, E}}) -> E end, Test),
    % io:format("Test : ~p~n", [TRisk]),
    % io:format("Test : ~p~n", [lists:sum(TRisk)]),

    % Cave = calc(11394, {7,701}),
    % Risk = lists:map(fun({_,_,_,{type, _, E}}) -> E end, Cave),
    % io:format("Test : 114 = ~p~n", [Cave]),
    % io:format("Part 1 : ~p~n", [lists:sum(Risk)]),

    Map = lists:map(fun ({{location,{X,Y}},_,_,{type,Type,_}}) -> {{X,Y},Type} end, Test),
    io:format("Map : ~p~n", [Map]),
   
    Route = route(Start, Map, []),
    io:format("Part 2 : ~p~n", [Route]),
    io:format("  - -- --->~n~n").


%  [{{0,0}, rocky, torch, 0}, { {0,0}, rocky, climbing, 7}],

route([], _, Visited) -> Visited;

route(Current, Map, Visited) ->

            io:format("E : ~p : ~p ~n", [Current,Visited]),
    Spread = lists:usort(spread(Current, Map, Visited)),

    { NCurrent, NSpread } = lists:foldl(fun({XY, Type, Equip, Dist}, {Curr, Sprd}) ->

            % io:format("V : ~p ~n", [Visited]),

        V = lists:search(fun({C,_,E,_}) -> 
            (C =:= XY) and (E =:= Equip) end, Visited),

    % io:format("S : ~p~n", [{XY, Type, Equip, Dist}]),
    % io:format("V : ~p~n~n~n", [V]),

    % timer:sleep(100),
      
       case V of 
           false -> {  [{XY, Type, Equip, Dist}] ++ Curr, [{XY, Type, Equip, Dist}] ++ Sprd };

           _ -> case element(4,element(2, V)) < Dist of
               true -> { [{XY, Type, Equip, element(4,element(2, V))}] ++ Curr, lists:delete({XY, Type, Equip, Dist} ,Sprd)};
               false -> {Curr, Sprd}
           end
        
        end
        
        end, {[],[]}, Spread),


    route(NCurrent, Map,  NSpread).





% Have I visited these ....

    % [{{0,1},rocky,climbing,8},
    % {{0,1},rocky,torch,1},
    % {{1,0},wet,climbing,8}]

% No - add to current % visited... 

% Yes 
    %  - Is this better than Visited - 
    % Yes
        % Replace in visited
        % Add to current 
    % No
        % do nowt




    % NSpread = lists:foldl(fun({{X,Y}, Type, Equip, Dist}, A) -> 
        
    %     F = lists:filter(fun(X) -> X end, Visited),

        % case lists:keyfind({X,Y}, 1, A) of 
        %     {{X,Y}, Type, Equip, Dist} ->
        %     false -> [{{X,Y}, Type, Equip, Dist}] ++ A 
        % end

        % [{{X,Y}, Type, Equip, Dist}] ++ A 
    
        % end, [], lists:usort(Spread)),
    
        %   {{0,0},rocky,climbing,17},
        %   {{0,0},rocky,climbing,15},
        %   {{0,0},rocky,climbing,13},
        %   {{0,0},rocky,climbing,11},
        %   {{0,0},rocky,climbing,9}



spread([], _, Visited) -> Visited;
spread([{{X,Y}, Type, Equip, Dist} | T], Map, Visited) ->

    % io:format("Current : ~p~n", [ {{X,Y}, Type, Equip, Dist} ]),

    Exits = lists:map(fun({E,D}) -> 
        {Nt, Nd} = transition( Equip, Type, D ),
        {E, D, Nt, Nd + Dist }
        end, move({X,Y}, Map)),

    % io:format("Exits : ~p~n", [Exits]),

    spread(T, Map, Exits ++ Visited).

move({XO, YO}, Map) ->
    lists:filter(fun (X) -> X =/= false end,
    [   lists:keyfind({XO,YO-1}, 1 , Map),
        lists:keyfind({XO+1,YO},1, Map),
        lists:keyfind({XO,YO+1},1, Map),
        lists:keyfind({XO-1,YO},1, Map)
    ]).


%         climbing    torch     none
% rocky       x         x
% wet         x                  x
% narrow                x        x 

transition(climbing, rocky, narrow) -> { torch, 8 };
transition(climbing, wet, narrow)   -> { none, 8 };
transition(climbing, _, _)          -> { climbing, 1 };

transition(none, narrow, rocky)     -> { torch, 8 };
transition(none, wet, rocky)        -> { climbing, 8 };
transition(none, _, _)              -> { none, 1 };

transition(torch, narrow, wet)      -> { none, 8 };
transition(torch, rocky, wet)       -> { climbing, 8 };
transition(torch, _, _)             -> { torch, 1 }.


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
