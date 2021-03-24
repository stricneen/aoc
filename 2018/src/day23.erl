-module(day23).
-include_lib("stdlib/include/assert.hrl").
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day23.txt"),
    Bots = lists:map(fun(E) -> 
        T = string:tokens(E, " <>,="),
        { list_to_integer(lists:nth(2,T)),
          list_to_integer(lists:nth(3,T)),
          list_to_integer(lists:nth(4,T)),
          list_to_integer(lists:nth(6,T)) } end, Input),    
    % tests(Bots),

    Largest = hd(lists:reverse(lists:keysort(4, Bots))),
    InRange = lists:filter(fun(X) -> dist(Largest, X) =< element(4,Largest) end, Bots),
    io:format("~nPart 1 : ~p~n", [length(InRange)]),
    Corners = corners(Bots),

    Start = bounding_cube(Corners),
    {X,Y,Z} = search([Start], Bots, 5000),
    % io:format("~nPart 2 : ~p~n", [{X,Y,Z}]),

    io:format("~nPart 2 : ~p~n", [X+Y+Z]).

% tests(Bots) ->
%     ?assertEqual(0, distance_point_to_cube({0,0,0}, {{0,0,0},0})),
%     ?assertEqual(3, distance_point_to_cube({0,0,0}, {{1,1,1},100})),
%     ?assertEqual(3, distance_point_to_cube({0,0,0}, {{-1,-1,-1},0})),

%     ?assertEqual(3, distance_point_to_cube({10,10,10}, {{0,0,0},9})),
%     ?assertEqual(30, distance_point_to_cube({10,10,10}, {{20,20,20},9})),
%     ?assertEqual(90, distance_point_to_cube({-10,-10,-10}, {{20,20,20},9})),

%     ?assertEqual(6, count({{0,0,0},32}, Bots)),
%     ?assertEqual(1, count({{0,0,0},0}, Bots)),
%     ?assertEqual(5, count({{12,12,12},0}, Bots)),
%     ?assertEqual(3, count({{10,13,12},0}, Bots)).

search(X,_,1) -> X;
search(Cubes, Bots,C) ->
    % io:format("Cubes : ~p~n", [Cubes]),

    Count2 = lists:map(fun({E,S}) -> {count({E,S}, Bots),dist({E,S}) ,-S , E} end, Cubes),
    Count = lists:filter(fun({Cx,_,_,_}) -> Cx > 0 end, Count2),

    % io:format("Bots in range, distance to origin, size~n"),

    % io:format("Count : ~p~n~n", [Count]),
    [{_,_,E,S}|T] = lists:reverse(lists:sort(Count)),

    case E =:= 0 of
        true -> S;
        false ->
            % io:format("T : ~p~n", [lists:reverse(lists:sort(Count))]),
            Split = split_cube({S,-E}),
            Rest = lists:map(fun({_,_,B,Cx}) -> {Cx,-B} end, T),
            % io:format("Split : ~p~n~n~n", [Split]),

        search(Split ++ Rest, Bots, C-1)
    end.


% Dist origin to cube
dist({{X,Y,Z},R}) ->
    distance_point_to_cube({0,0,0}, {{X,Y,Z},R}).


% How many bots in cube
count({{X,Y,Z},R}, Bots) ->
    lists:foldl(fun (B, Acc) -> 
        case is_bot_in_range_of_cube(B, {{X,Y,Z},R}) of
            true ->
                %  io:format("In : ~p ~p~n", [B, {{X,Y,Z},R}]),
                 Acc + 1;
            false -> 
            %    io:format("Out : ~p ~p~n", [B, {{X,Y,Z},R}]),
                Acc
        end end, 0, Bots).

is_bot_in_range_of_cube({Xb,Yb,Zb,Rb}, {{X,Y,Z},R}) ->
    distance_point_to_cube({Xb,Yb,Zb}, {{X,Y,Z},R}) =< Rb.


distance_point_to_cube({X,Y,Z}, {{Xc,Yc,Zc},R}) ->
   distance(X, Xc, Xc + R) + distance(Y, Yc, Yc + R) + distance(Z, Zc, Zc + R).

distance(X, B1, B2) ->
    Min = if B1 > B2 -> B2 ; true -> B1 end,
    Max = if B1 > B2 -> B1 ; true -> B2 end,

    case {X >= Min, X =< Max} of
        {true,true} -> 0;
        {true,false} -> abs(Max - X);
        {false,true} -> abs(Min - X)
    end.

bounding_cube({MinX, MaxX, MinY, MaxY, MinZ, MaxZ}) ->
    Max = lists:max([abs(MinX), abs(MaxX), abs(MinY), abs(MaxY), abs(MinZ), abs(MaxZ)]),
    Powers =  [ X || X <- lists:map(fun(E) -> trunc(math:pow(2,E)) end, lists:seq(0,40))],
    F = first(Powers, fun(E) -> E > (Max * 2) end, null),
    {{F div 2*-1,F div 2*-1,F div 2*-1},F}.

split_cube({{X,Y,Z},R}) ->
    [
        {{X,Y,Z}, R div 2},
        {{X+R div 2,Y,Z}, R div 2},
        {{X,Y+R div 2,Z}, R div 2},
        {{X,Y,Z+R div 2}, R div 2},
        {{X+R div 2,Y+R div 2,Z}, R div 2},
        {{X,Y+R div 2,Z+R div 2}, R div 2},
        {{X+R div 2,Y,Z+R div 2}, R div 2},
        {{X+R div 2,Y+R div 2,Z+R div 2}, R div 2}
    ].

first(L, Condition, Default) ->
  case lists:dropwhile(fun(E) -> not Condition(E) end, L) of
    [] -> Default;
    [F | _] -> F
  end.

dist({Xs, Ys, Zs, _}, {Xt, Yt, Zt, _}) ->
    abs(Xs - Xt) + abs(Ys - Yt) + abs(Zs - Zt).

corners(Bots) ->
    lists:foldl(fun({X,Y,Z,_},{MinX, MaxX, MinY, MaxY, MinZ, MaxZ}) ->
    { 
        case X < MinX of true -> X; _ -> MinX end, 
        case X > MaxX of true -> X; _ -> MaxX end,
        case Y < MinY of true -> Y; _ -> MinY end, 
        case Y > MaxY of true -> Y; _ -> MaxY end,
        case Z < MinZ of true -> Z; _ -> MinZ end, 
        case Z > MaxZ of true -> Z; _ -> MaxZ end
    } end, {99999999,0,99999999,0,99999999,0}, Bots).


 % c(day23), day23:run().

% {37294439,39272733,24243606},505

    % {25422263,46196104,22040093},906
    % {25422244,46196084,22040112},900
    % {25422260,46196064,22040132},893


% 6787068,41442284,35331186},753}       15
% 20022290,47164075,24338838},777}]     20
% 12081156,36864851,26537308},804}]     25
%  {{20022290,41442284,28002954},828}   30
%  {{25694527,44711879,22768503},875}]  35
%  {{20022290,38581388,24338838},837}]  40
%   {{24434030,41442284,25560210},839}] 45
%  {{20022290,43731001,26537308},842}]  50

% tl (You guessed 94374909.

% Part 2 : {26794906,46607439,21078785}
% Part 2 : 94481130