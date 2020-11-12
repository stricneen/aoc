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
    
    Board = dict:map(fun(_,V) -> 
        case V of
            69 -> {elf, 200};
            71 -> {gob, 200};
            35 -> {wal, 0};
            46 -> {spc, 0};
            _ -> {} 
        end
        end, Grid),

    io:format("~nPart 1 : ~p~n", [Board]),
    Final = play_game(Board, 0),

    io:format("~nPart 1 : ~p~n", [Final]).


play_game(Board, C) ->
  Next = play_round(Board),
  io:format("~nTurn : ~p~n", [C]),

   Elfs = dict:filter(fun(_,{X, _}) -> (X =:= elf) end, Next),
   Goblins = dict:filter(fun(_,{X, _}) -> (X =:= gob) end, Next),
   
  case (dict:size(Elfs) == 0) or (dict:size(Goblins) == 0) of
      true -> Next;
      false -> play_game(Next, C+1)
   end.



play_round(Board) ->
    Players = dict:filter(fun(_,{X, _}) -> (X =:= elf) or (X =:= gob) end, Board),
    PlayersL = lists:sort(dict:fold(fun(K,V,Acc) -> [{K,V}] ++ Acc end,  [], Players)),
    io:format("~n Players : ~p~n", [PlayersL]),

    Tick = lists:foldl(fun(P,B) -> 
        {K,V} = P,

        % get the player
        {ok, {T,S}} = dict:find(K, B),

        % io:format("~n Turn  : ~p~n", [{T,S}] ),

        R = case T of 
            spc -> B;
            _ -> turn({K,V}, B)
        end,
        R
        end,

        Board, PlayersL),
    

    % Tick = lists:map(fun(X) -> turn(X, Board) end, PlayersL),
    Tick.

turn(Player, Board) ->
    % io:format("~n Player : ~p~n", [Player]),
    {{X,Y}, {Ty,_}} = Player,

    Boundary = opts(Ty, [{X,Y}] ,Board, 1),

    InRange = lists:any(fun({_,_,D}) -> D =:= 1 end, Boundary),

    Turn = case Boundary of
        [] -> Board;
        _ when InRange -> 
            ToAttack = lists:sort(lists:map(fun({{X1,Y1},{Type,HP},_}) -> {-HP,X1,Y1,Type} end, Boundary)),
            {DHP,MX,MY,Att} = hd(ToAttack),
            case -DHP > 3 of
                true -> dict:store({MX,MY},{Att, (-DHP)-3} ,Board);
                false -> dict:store({MX,MY},{spc, 0} ,Board)
            end;

        L -> Board      %Where to move
    end,

    % io:format("  Turn : ~p~n", [Turn]),
    Turn.

opts(Ty, Pos ,Board, Dist) ->

    % {{X,Y}, {T,_}} = Player,

    Spread = lists:foldl(fun({X,Y}, Acc) -> 
        [{{X, Y-1} ,dict:find({X, Y-1}, Board), Dist},
        {{X, Y+1}, dict:find({X, Y+1}, Board), Dist},
        {{X-1, Y}, dict:find({X-1, Y}, Board), Dist},
        {{X+1, Y}, dict:find({X+1, Y}, Board), Dist}] ++ Acc
         end, [], Pos),

        

    Boundary2 = lists:foldl(fun({{X,Y}, {_,{Typ,S}}, D}, Acc) -> 
                R = case (Typ =:= wal) or (lists:any(fun({X1,Y1}) -> (X1==X) and (Y1==Y) end, Pos) ) of
                    true -> Acc;
                    false -> [{{X,Y},{Typ,S},D}] ++ Acc
                end, R end, [] ,Spread),

    Boundary = aoc:dedup(Boundary2),

    %io:format("Boundary : ~p~n ", [Boundary]),

    Enemy = case Ty of 
        gob -> elf;
        _ -> gob
    end,

    CanMove = lists:filter(fun({_, {Typ,_}, _}) ->  Typ =:= spc end, Boundary),
    
     case lists:any(fun({_,{Typ,_},_}) -> Typ =:= Enemy end, Boundary) or (Dist > 100) of
        true -> lists:filter(fun(({_, {Typ,_}, D})) -> (D < 100) and (Typ =:= Enemy) end, aoc:dedup(Boundary));
        false -> opts(Ty, lists:map(fun ({{X,Y}, _, _}) -> {X,Y} end, CanMove), Board, Dist+1)
     end.

   

    