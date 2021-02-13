-module(day23).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day23.txt"),
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

    % Corners = spread({25422263,46196104,22040093}, 2000000), 
    X = zoom(Corners, Bots, 80, 0), 
    % io:format("X : ~p~n", [lists:reverse(X)]),

    scan_cube([{{25422260,46196064,22040132},893}] ++ X , Bots),
% Cube = cube({25422263,46196104,22040093},60),
% CubeRange = lists:sublist(lists:reverse(lists:keysort(2,in_range(Cube, Bots))),20),
%  io:format("Y : ~p~n", [CubeRange]),

    io:format("~nPart 2 : ~p~n", [0]).

scan_cube([], _) -> 0;
scan_cube([H|T], Bots) -> 
     io:format("scanning : ~p~n", [H]),
    Max = cube_spread(H, Bots),
    io:format("Max : ~p~n", [ Max ]),
    io:format(" ~n", []),
    scan_cube(T, Bots).

cube_spread({{X,Y,Z},C}, Bots) ->
    Cube = star({X,Y,Z},100),
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

in_range(Grid, Bots) ->
    lists:map(fun({X,Y,Z}) -> 
        {{X,Y,Z}, 
        length(lists:filter(fun({Xb,Yb,Zb,R}) -> dist({Xb,Yb,Zb,n},{X,Y,Z,n}) =< R end, Bots))}
    end, Grid).


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