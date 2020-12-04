-module(day17).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day.txt"),
 
    Parsed = lists:foldl(fun(X, Acc) ->
        L = string:lexemes(X, ","),
        {A,B} = {hd(L), hd(tl(L))},
        F = list_to_integer(string:sub_string(A,3)),
        S = string:sub_string(B, 4),
        SS = string:lexemes(S, ".."),
        {S1, S2} = {list_to_integer(hd(SS)), list_to_integer(hd(tl(SS)))},
        Pin = hd(X),
        case Pin of
            120 -> lists:foldl(fun(IX, InnAcc) -> [{F, IX}] ++ InnAcc end, [], lists:seq(S1,S2));
            121 -> lists:foldl(fun(IX, InnAcc) -> [{IX, F}] ++ InnAcc end, [], lists:seq(S1,S2))
        end ++ Acc
        end, [], Input),

    MinX = lists:foldl(fun({X,_}, A) -> if X < A -> X; true -> A end end, 100000, Parsed),
    Clay = aoc:dedup(lists:map(fun({X,Y}) -> {{X,Y}, "#"} end, Parsed)),
    Grid = dict:from_list(Clay),
    GridSource = dict:store({500,0}, "+", Grid),
    R = tick([{500,0}], GridSource, 100),
    print_dict(R, MinX),

    io:format("~nPart 1 : ~p~n", [0]).

tick(_, Grid, 0) -> Grid;
tick(Edge, Grid, C) ->

    {NEdge, NGrid} = lists:foldl(fun({X,Y}, {N,G}) -> 

    %    -x-
    %     - 
        Below = dict:find({X,Y+1}, Grid),
        Left = dict:find({X-1,Y}, Grid),
        Right = dict:find({X+1,Y}, Grid),
        
        NE = case {Below, Left, Right} of 

            {error, _, _}  -> [{X,Y+1}];
            {{ok,"#"}, error, error} -> [{X-1,Y},{X+1,Y}];
            _ -> []
        end,


        {NE ++ N, dict:store({X,Y}, "|", Grid)}
        end, {[], Grid}, Edge),

    % R = dict:store({500,1}, "|", Grid),

    tick(NEdge, NGrid, C-1).







print_dict(D, MinX) ->
     aoc:clear_screen(),
    L = dict:to_list(D),
    lists:foldl(fun({{X,Y},C},_) -> 
        aoc:print(X-MinX+5,Y+1, C)
        end, [], L).

% first(L, Condition, Default) ->
%   case lists:dropwhile(fun(E) -> not Condition(E) end, L) of
%     [] -> Default;
%     [F | _] -> F
%   end.


% print_g({SX,SY}, Clay, Water, Settled, MinX) ->
%     aoc:clear_screen(),
%     D = 120,
%     lists:foldl(fun({X,Y},_) -> 
%         aoc:print(X-MinX+2,Y+1 , "#")
%         end, [], clip(Clay, D)),

%     lists:foldl(fun({X,Y},_) -> 
%         aoc:print(X-MinX+2,Y+1 , "|")
%         end, [], clip(Water,D)),

%     lists:foldl(fun({X,Y},_) -> 
%         aoc:print(X-MinX+2,Y+1 , "~")
%         end, [], clip(Settled,D)),

%     aoc:print(SX-MinX+2,SY+1, "+"),

%     aoc:print(5,22,"").


% clip(L, Depth) ->
%     lists:filter(fun({_,Y}) -> Y < Depth end, L).

% tl 142
% tl 2287