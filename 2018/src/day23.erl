-module(day23).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day.txt"),
    Bots = lists:map(fun(E) -> 
        T = string:tokens(E, " <>,="),
        { list_to_integer(lists:nth(2,T)),
          list_to_integer(lists:nth(3,T)),
          list_to_integer(lists:nth(4,T)),
          list_to_integer(lists:nth(6,T)) } end, Input),    
    %  io:format("~p~n", [Bots]),

    Largest = hd(lists:reverse(lists:keysort(4, Bots))),
    InRange = lists:filter(fun(X) -> dist(Largest, X) =< element(4,Largest) end, Bots),
    io:format("~nPart 1 : ~p~n", [length(InRange)]),

    Corners = corners(Bots),
    

io:format("{14,14,14,6}, {{-64,-64,-64},128} : ~p~n", [is_bot_in_range_of_cube( {14,14,14,6}, {{-64,-64,-64},128})]),
io:format("{50,50,50,200} {{-64,-64,-64},128} : ~p~n", [is_bot_in_range_of_cube( {50,50,50,200}, {{-64,-64,-64},128} )]),


io:format("{10,10,10,5} {{12,12,12},1} : ~p~n", [is_bot_in_range_of_cube({10,10,10,5}, {{12,12,12},1} )]),


    % io:format("~nSplit : ~p~n", [search(Start, Bots)]),
     Start = bounding_cube(Corners),
    Z = search([Start], Bots, 11),
    io:format("~nPart 2 : ~p~n", [hd(Z)]).



search(X,_,1) -> X;
search(Cubes, Bots,C) ->
    % io:format("Cubes : ~p~n", [Cubes]),

    Count2 = lists:map(fun({E,S}) -> {count({E,S}, Bots),dist({E,S}) ,-S , E} end, Cubes),
    Count = lists:filter(fun({Cx,_,_,_}) -> Cx > 0 end, Count2),

    io:format("Bots in range, distance to origin, size~n"),

    % io:format("Count : ~p~n~n", [Count]),
    [{_,_,E,S}|T] = lists:reverse(lists:sort(Count)),

    io:format("T : ~p~n", [lists:reverse(lists:sort(Count))]),
    Split = split_cube({S,-E}),
    Rest = lists:map(fun({_,_,B,Cx}) -> {Cx,-B} end, T),

    io:format("Split : ~p~n~n~n", [Split]),
    % Next = lists:map(fun(E) -> { count(E, Bots),  E} end, Split),
    % Next = lists:filtermap(fun(E) -> C = count(E, Bots), case C of 0 -> false; _ -> {true, {C, E}} end end, Split),
    % io:format("D : ~p~n", [Next]),

    search(Split ++ Rest, Bots, C-1).


% Dist origin to cube
dist({{X,Y,Z},R}) ->
    Dist = abs(X+R) + abs(Y+R) + abs(Z+R),    
    Dist.

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
        end end, 0, Bots).          %trunc(rand:uniform(8)).

% {50,50,50,200}, {{12,12,12},4}),
is_bot_in_range_of_cube({Xb,Yb,Zb,Rb}, {{X,Y,Z},R}) ->
    distance_point_to_cube({Xb,Yb,Zb}, {{X,Y,Z},R}) =< Rb.


distance_point_to_cube({X,Y,Z}, {{Xc,Yc,Zc},R}) ->
    % io:format("X : ~p~n", [distance(X, Xc, Xc + R - 1)]),
    % io:format("Y : ~p~n", [distance(Y, Yc, Yc + R - 1)]),
    % io:format("Z : ~p~n", [distance(Z, Zc, Zc + R - 1)]),
   distance(X, Xc, Xc + R-1) +
   distance(Y, Yc, Yc + R-1) +
   distance(Z, Zc, Zc + R-1).

distance(X, B1, B2) ->

    Min = if B1 > B2 -> B2 ; true -> B1 end,
    Max = if B1 > B2 -> B1 ; true -> B2 end,
% io:format("D : ~p -> ~p~n", [Min,Max]),

    case {X >= Min, X =< Max} of
        {true,true} -> 0;
        {true,false} -> abs(Min - X);
        {false,true} -> abs(X - Max)
    end.


%     is_bot_in_cube(Bot, {{X,Y,Z},R}) or
%     is_bot_in_range_of_point(Bot, {X,Y,Z}) or
%     is_bot_in_range_of_point(Bot, {X + R,Y,Z}) or
%     is_bot_in_range_of_point(Bot, {X,Y + R,Z}) or
%     is_bot_in_range_of_point(Bot, {X,Y,Z + R}) or
%     is_bot_in_range_of_point(Bot, {X + R,Y + R,Z}) or
%     is_bot_in_range_of_point(Bot, {X + R,Y,Z + R}) or
%     is_bot_in_range_of_point(Bot, {X,Y + R,Z + R}) or
%     is_bot_in_range_of_point(Bot, {X + R,Y + R,Z + R}).


% is_bot_in_range_of_point({Xb,Yb,Zb,Rb}, {X,Y,Z}) ->
%     dist({Xb,Yb,Zb,none}, {X,Y,Z,none}) =< Rb.


% is bot in cube
is_bot_in_cube({Xb,Yb,Zb,Rb}, {{X,Y,Z},R}) ->
    point_in_cube({Xb, Yb, Zb}, {{X,Y,Z},R}) or
    point_in_cube({Xb+Rb, Yb, Zb}, {{X,Y,Z},R}) or
    point_in_cube({Xb-Rb, Yb, Zb}, {{X,Y,Z},R}) or
    point_in_cube({Xb, Yb+Rb, Zb}, {{X,Y,Z},R}) or
    point_in_cube({Xb, Yb-Rb, Zb}, {{X,Y,Z},R}) or
    point_in_cube({Xb, Yb, Zb+Rb}, {{X,Y,Z},R}) or
    point_in_cube({Xb, Yb, Zb-Rb}, {{X,Y,Z},R}).

% is point in cube
point_in_cube({Xb,Yb,Zb}, {{X,Y,Z},R}) ->
    (Xb >= X) and (Xb =< (X + R)) and
    (Yb >= Y) and (Yb =< (Y + R)) and
    (Zb >= Z) and (Zb =< (Z + R)).




bounding_cube({MinX, MaxX, MinY, MaxY, MinZ, MaxZ}) ->
    Max = lists:max([abs(MinX), abs(MaxX), abs(MinY), abs(MaxY), abs(MinZ), abs(MaxZ)]),
    Powers =  [ X || X <- lists:map(fun(E) -> trunc(math:pow(2,E)) end, lists:seq(0,40))],
    F = first(Powers, fun(E) -> E > (Max * 2) end, null),
    Cube = {{F div 2*-1,F div 2*-1,F div 2*-1},F},
 io:format("Cube : ~p~n", [Cube]),
    Cube.

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

scan_cube([], _) -> 0;
scan_cube([H|T], Bots) -> 
     io:format("scanning : ~p~n", [H]),
    Max = cube_spread(H, Bots),
    io:format("Max : ~p~n", [ Max ]),
    io:format(" ~n", []),
    scan_cube(T, Bots).

cube_spread({{X,Y,Z},C}, Bots) ->
    Cube = star({X,Y,Z},2),
    {Nco,Nd} = hd(lists:reverse(lists:keysort(2,in_range(Cube, Bots)))),
    io:format("cube_spread : ~p~n", [{Nco,Nd}]),
    
    case Nd > C of
        true -> cube_spread({Nco, Nd}, Bots);
        _ -> {Nco, Nd}
    end.


spread({X,Y,Z},R) -> {X-R,X+R,Y-R,Y+R,Z-R,Z+R}.

cube({X,Y,Z}, S) -> 
    Points = grid({X-S,X+S,Y-S,Y+S,Z-S,Z+S},S*2),
    Points.

star({X,Y,Z}, S) -> 
    Points = [ {Xx,Yy,Zz} || Xx <- lists:seq(X-S, X+S), Yy <- [Y], Zz <- [Z]]
     ++ [ {Xx,Yy,Zz} || Xx <- [X], Yy <- lists:seq(Y-S, Y+S), Zz <- [Z]] 
     ++ [ {Xx,Yy,Zz} || Xx <- [X], Yy <- [Y], Zz <- lists:seq(Z-S, Z+S)]
     ++ [ {Xx,Yy,Zz} || Xx <- [X], Yy <- lists:seq(Y-S, Y+S), Zz <- lists:seq(Z-S, Z+S)] 
     ++ [ {Xx,Yy,Zz} || Xx <- lists:seq(X-S, X+S), Yy <- lists:seq(Y-S, Y+S), Zz <- [Z]] 
     ++ [ {Xx,Yy,Zz} || Xx <- lists:seq(X-S, X+S), Yy <- [Y], Zz <- lists:seq(Z-S, Z+S)]  ,
    Points.

zoom(Corners, Bots, GridSize , 0) -> 

  io:format("Final corners : ~p~n~n", [Corners]),

    Grid = grid(Corners, GridSize),
    W = in_range(Grid, Bots),
    lists:sublist(lists:reverse(lists:keysort(2,W)), trunc(length(W)/4));
    % lists:reverse(lists:keysort(2,W));


zoom(Corners, Bots, GridSize ,C) ->
    Grid = grid(Corners, GridSize),
    W = in_range(Grid, Bots),

    % R = lists:reverse(lists:keysort(2,W)),
     R = lists:sublist(lists:reverse(lists:keysort(2,W)), trunc(length(W)/4)),
    io:format("(~p) : ~p~n~n", [C, lists:sublist(R,10)]),

    NCorners = { 
        lists:min(lists:map(fun({{A,_,_},_}) -> A end, R)),
        lists:max(lists:map(fun({{A,_,_},_}) -> A end, R)),
        lists:min(lists:map(fun({{_,A,_},_}) -> A end, R)),
        lists:max(lists:map(fun({{_,A,_},_}) -> A end, R)),
        lists:min(lists:map(fun({{_,_,A},_}) -> A end, R)),
        lists:max(lists:map(fun({{_,_,A},_}) -> A end, R))
     },
    
    zoom(NCorners, Bots, GridSize, C- 1).

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

in_range(Points, Bots) ->
    lists:map(fun({X,Y,Z}) -> 
        {{X,Y,Z}, 
        length(lists:filter(fun({Xb,Yb,Zb,R}) -> dist({Xb,Yb,Zb,n},{X,Y,Z,n}) =< R end, Bots))}
    end, Points).


grid({MinX, MaxX, MinY, MaxY, MinZ, MaxZ}, Axis) ->
    [ {X,Y,Z} || 
        X <- axis(MinX,MaxX,Axis),
        Y <- axis(MinY,MaxY,Axis),
        Z <- axis(MinZ,MaxZ,Axis) ].

axis(Lb, Ub, Segs) ->
    [ trunc(Lb + (X / Segs) * abs(Ub - Lb)) || X <- lists:seq(0,Segs)].



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