-module(day13).
-export([run/0]).


run() ->
    Input = aoc:readlines_no_trim("../data/day13.txt"),

    Folder = fun(NLine, Acc) -> 
        Line = lists:nth(NLine, Input),
        Dic = lists:zipwith(fun(X,Y) -> {{Y,NLine}, X} end, Line, lists:seq(1,length(Line))),
        NoSp = lists:filter(fun({_,X}) -> X /= 32 end, Dic),
        A = dict:from_list(NoSp),
        dict:merge(fun(X)->X end, Acc,A)
        end,
    Grid = lists:foldl(Folder, dict:new(), lists:seq(1, length(Input))),
    
%73,87.)
    % where are the trucks
    %Trucks = find_trucks(Grid),

    %io:format("~n~nTrucks : ~p~n", [Trucks]),

    Trucks = find_trucks(Grid),

    % Moves = lists:foldl(fun(X, A) -> 
        
        
    %     X end, [], Trucks),

    % aoc:clear_screen(),
    % dict:fold(
	%     fun({X,Y}, V, ok) -> aoc:print(X,Y,V)
	% end, ok, Grid),

    io:format("~p~n", [Grid]),

    One = tick(Trucks,Grid,16),
    
    io:format("~n~n~nPart 1 : ~p~n", [lists:sort(One)]).



tick(Trucks, Grid, C) ->

    io:format("~p~n", [C]),

    io:format("~p~n", [Trucks]),


    Tick = lists:map(fun({{X,Y},Direction, Turn}) ->
        
        NextCoord = case Direction of
            north -> {X,Y-1};
            south -> {X,Y+1};
            east -> {X+1,Y};
            west -> {X-1,Y}
        end,

        io:format("~p~n", [NextCoord]),

        {ok, MovingTo} = dict:find(NextCoord, Grid),
        io:format("Moving to : ~p~n", [MovingTo]),

        {NextDirection, NextTurn} = case MovingTo of
            92 when Direction == north -> {west, Turn};
            92 when Direction == south -> {east, Turn};
            92 when Direction == east -> {south, Turn};
            92 when Direction == west -> {north, Turn};

            47 when Direction == north -> {east, Turn};
            47 when Direction == south -> {west, Turn};
            47 when Direction == east -> {north, Turn};
            47 when Direction == west -> {south, Turn};

            43 when (Direction == north) and (Turn == left) -> {west, straight};
            43 when (Direction == north) and (Turn == straight) -> {north, right};
            43 when (Direction == north) and (Turn == right) -> {east, left};

            43 when (Direction == south) and (Turn == left) -> {east, straight};
            43 when (Direction == south) and (Turn == straight) -> {south, right};
            43 when (Direction == south) and (Turn == right) -> {west, left};

            43 when (Direction == east) and (Turn == left) -> {north, straight};
            43 when (Direction == east) and (Turn == straight) -> {east, right};
            43 when (Direction == east) and (Turn == right) -> {south, left};

            43 when (Direction == west) and (Turn == left) -> {south, straight};
            43 when (Direction == west) and (Turn == straight) -> {west, right};
            43 when (Direction == west) and (Turn == right) -> {north, left};
            
            _ -> {Direction, Turn}
            end,
        {NextCoord, NextDirection, NextTurn}
        end, Trucks),
    
    % Check for duplicate
    OldPositions =lists:map(fun({X,_,_}) -> X end, Trucks),
    Positions = lists:map(fun({X,_,_}) -> X end, Tick),

    case length(Positions ++ OldPositions) == sets:size(sets:from_list(Positions ++ OldPositions))  of 
        false -> Tick ++ Trucks;
        true -> tick(Tick, Grid, C-1)
    end.
    

% 92 : \
% 47 : /
% 43 : +
% left - straight - right
     







find_trucks(Grid) ->
    lists:filter(fun(X) -> X =/= [] end, dict:fold(fun(K,V,Acc) -> 
        %io:format("~p : ~s ~n", [V, [V]]),
         AccR = case V of
            94 -> {K, north, left};  %^
            118 -> {K, south, left}; % v
            62 -> {K, east, left};   % >
            60 -> {K, west, left};  % <
             _ -> []
         end,
         [AccR] ++ Acc
         end, [], Grid)).