-module(day15).
-export([run/0]).

% # 35  . 46      E 69  G 71

run() ->
    Input = aoc:readlines("../data/day.txt"),

    Folder = fun(NLine, Acc) -> 
        Line = lists:nth(NLine, Input),
        Dic = lists:zipwith(fun(X,Y) -> {{Y,NLine}, X} end, Line, lists:seq(1,length(Line))),
        NoSp = lists:filter(fun({_,X}) -> X /= 32 end, Dic),
        A = dict:from_list(NoSp),
        dict:merge(fun(X)->X end, Acc,A)
        end,
    Grid = lists:foldl(Folder, dict:new(), lists:seq(1, length(Input))),
    
    %Positions = dict:filter(fun(_,V) -> (V==69) or (V==71) end, Grid),
    Board = dict:map(fun(_,V) -> 
        case V of
            69 -> {elf, 200};
            71 -> {gob, 200};
            35 -> {wal, 0};
            46 -> {spc, 0};
            _ -> {} 
        end
        end, Grid),

    Players = dict:filter(fun(_,{X, _}) -> (X =:= elf) or (X =:= gob) end, Board),
   
   % determine move

 io:format("~nPart 1 : ~p~n", [Board]),

   First = play_round(Board),

 io:format("~nPart 1 : ~p~n", ["First"]).





    % move
    % attach

play_round(Board) ->
    Players = dict:filter(fun(_,{X, _}) -> (X =:= elf) or (X =:= gob) end, Board),
    PlayersL = lists:sort(dict:fold(fun(K,V,Acc) -> [{K,V}] ++ Acc end,  [], Players)),
    io:format("~n Players : ~p~n", [PlayersL]),
    Tick = lists:map(fun(X) -> turn(X, Board) end, PlayersL),
    Tick.

turn(Player, Board) ->
    io:format("~n Player : ~p~n", [Player]),
    {{X,Y}, {Ty,_}} = Player,

    Boundary = path(Ty, [{X,Y}] ,Board, 1),
    io:format("  Moves : ~p~n", [Boundary]),
    Boundary.

path(Ty, Pos ,Board, Dist) ->

    % {{X,Y}, {T,_}} = Player,

    Spread = lists:foldl(fun({X,Y}, Acc) -> 
        [{{X, Y-1} ,dict:find({X, Y-1}, Board), Dist},
        {{X, Y+1}, dict:find({X, Y+1}, Board), Dist},
        {{X-1, Y}, dict:find({X-1, Y}, Board), Dist},
        {{X+1, Y}, dict:find({X+1, Y}, Board), Dist}] ++ Acc
         end, [], Pos),
         

    Boundary = lists:foldl(fun({{X,Y}, {_,{Ty,S}}, D}, Acc) -> 
                R = case (Ty =:= wal) or (lists:any(fun({X1,Y1}) -> (X1==X) and (Y1==Y) end, Pos) ) of
                    true -> Acc;
                    false -> [{{X,Y},{Ty,S},D}] ++ Acc
                end, R end, [] ,Spread),

    

    Enemy = case Ty of 
        gob -> elf;
        _ -> gob
    end,
    
     case lists:any(fun({_,{Ty,_},_}) -> Ty =:= Enemy end, Boundary) or (Dist > 20) of
         true -> Boundary;
         false -> path(Ty, lists:map(fun ({{X,Y}, {Ty,S}, D}) -> {X,Y} end, Boundary), Board, Dist+1)
     end.

%    Boundary.
   

    