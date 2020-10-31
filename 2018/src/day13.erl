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
    
    Trucks = find_trucks(Grid),

    % 121,105
    % 122,105
    % 122,106
    % 123,106
    
    io:format("Trucks found : ~p~n", [length(Trucks)]),

    One = tick(Trucks,Grid,1),
    
    io:format("~n~n~nPart 2 : ~p~n", [lists:sort(One)]).


tick(Trucks, Grid, C) ->

    %o:format("~p~n", [C]),
    %io:format("~p~n", [Trucks]),
    %io:format("~p~n", [C]),
    


    %Sorted = lists:sort(fun({{X1,Y1},_,_}, {{X2,Y2},_,_}) -> {Y1,X1} > {Y2,X2} end,Trucks),

    Next = lists:foldl(fun(I,Acc) -> 

        Truck = lists:nth(I, Trucks),
%io:format("~p~n", [Truck]),
        {{X,Y},Direction, Turn} = move(Truck, Grid),

        NAcc = case lists:keyfind({X,Y}, 1, Acc) of
            false -> [{{X,Y},Direction, Turn}] ++ Acc;
            _ -> 
                {value, Hit, Remainder} = lists:keytake({X,Y}, 1, Acc),
                io:format("~p   Truck : ~p  Moved to: ~p~n   Hit : ~p~n~n", [C, Truck, {{X,Y},Direction, Turn}, Hit]),
                Remainder
                
        end,

        NAcc
        end, [], lists:seq(1, length(Trucks))),

    case length(Next) of
        1 -> Next;
        _ -> tick(Next, Grid, C+1)
    end.
  
    %io:format("~p ~p~n", [C, RemovedCrash]),
    

move({{X,Y},Direction, Turn}, Grid) -> 
    
    NextCoord = case Direction of
        north -> {X,Y-1};
        south -> {X,Y+1};
        east -> {X+1,Y};
        west -> {X-1,Y}
    end,
    
    {ok, MovingTo} = dict:find(NextCoord, Grid),

    {NextDirection, NextTurn} = case MovingTo of
        92 when Direction == north -> {west, Turn};  % \
        92 when Direction == south -> {east, Turn};
        92 when Direction == east -> {south, Turn};
        92 when Direction == west -> {north, Turn};

        47 when Direction == north -> {east, Turn};  % /
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
      
    {NextCoord, NextDirection, NextTurn}.


% 92 : \
% 47 : /
% 43 : +
% left - straight - right

count(L) ->
    lists:foldl(fun(X,Acc)-> 
        R = case dict:is_key(X, Acc) of
            true -> dict:store(X, element(2,dict:find(X, Acc)) + 1, Acc);
            false -> dict:store(X, 1, Acc)
        end,        
        R end, dict:new(), L).

unique(L) ->
    sets:to_list(sets:from_list(L)).

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




        %io:format("~p~n", [NextCoord]),

        
        %io:format("Moving to : ~p~n", [MovingTo]),

        
    
    % Check for duplicate
    % OldPositions =lists:map(fun({X,_,_}) -> X end, Trucks),
    % Positions = lists:map(fun({X,_,_}) -> X end, Tick),

    % % Remove crashed trucks ...

    % Count = count(Positions),

    
    % RemovedPass = lists:foldl(fun({Co,A,B}, Acc) ->
    %     Old = lists:member(Co, OldPositions),
    %     R = case Old of
    %         false -> [{Co,A,B}] ++ Acc;
    %         _ -> Acc
    %     end,
    %     R end, [], Tick),

    % RemovedCrash = lists:foldl(fun({Co,A,B}, Acc) ->
    %     {_,Num} = dict:find(Co, Count),
    %     R = case Num of
    %         1 -> [{Co,A,B}] ++ Acc;
    %         _ -> Acc
    %     end,
    %     R end, [], RemovedPass),


    %  65,39.


    % io:format("~p~n", [Count]),
    % io:format("~p~n", [Positions]),