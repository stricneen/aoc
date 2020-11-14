-module(day15).
-export([run/0]).

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

    Final = play_game(Board, 0),
    Players = dict:filter(fun(_,{X, _}) -> (X =:= elf) or (X =:= gob) end, Final),
    Winners = lists:sort(dict:fold(fun(K,V,Acc) -> [{K,V}] ++ Acc end,  [], Players)),
  
    io:format("~nPart 1 : ~p~n", [Winners])
.



play_game(Board, C) ->

aoc:print_dict(Board),
 io:format("~n Turn : ~p~n", [C]),

   Next = play_round(Board),
timer:sleep(300),


    Elfs = dict:filter(fun(_,{X, _}) -> (X =:= elf) end, Next),
    Goblins = dict:filter(fun(_,{X, _}) -> (X =:= gob) end, Next),
    case (dict:size(Elfs) == 0) or (dict:size(Goblins) == 0) or (C == 2) of % turns ----------------
        true -> Next;
        false -> play_game(Next, C+1)
    end.

play_round(Board) ->
    Players = dict:filter(fun(_,{X, _}) -> (X =:= elf) or (X =:= gob) end, Board),
    PlayersI =  dict:fold(fun(K,V,Acc) -> [{K,V}] ++ Acc end,  [], Players),

    PlayersL = lists:sort(fun({{X1,Y1},_}, {{X2,Y2},_}) -> {Y1,X1} < {Y2,X2} end, PlayersI),
 
  
io:format("~n Players : ~p~n", [PlayersL]),

    Tick = lists:foldl(fun(P,B) -> 
        {K,V} = P,
        {ok, {T,_}} = dict:find(K, B),
        % io:format("~n Turn  : ~p~n", [{T,S}] ),
        R = case T of 
            spc -> B;
            _ -> turn({K,V}, B)
        end,
        R
        end,
    Board, PlayersL),
    Tick.

turn(Player, Board) ->
    
%  io:format("~n Player : ~p~n", [Player]),

    {{X,Y}, {Ty,_}} = Player,

    Enemy = case Ty of 
        gob -> elf;
        _ -> gob
    end,

    F = fun(L) -> lists:any(fun({_,{Typ,_},_}) -> Typ =:= Enemy end, L) end,

    {Boundary,_} = opts( [{X,Y}] ,Board, 1, [], F),
    %  io:format("~n Boundary : ~p~n", [Boundary]),

    InRange = lists:any(fun({_,_,D}) -> D =:= 1 end, Boundary),

    Turn = case Boundary of
        [] -> Board;
            % attack



        _ when InRange -> 
            EnemiesInRange = lists:filter(fun( {_,{Typ,_},Dist}) -> (Typ =:= Enemy) and (Dist =:= 1) end, Boundary),
            ToAttack = lists:sort(lists:map(fun({{X1,Y1},{Type,HP},_}) -> {HP,X1,Y1,Type} end, EnemiesInRange)),
            %  io:format("~n ToAttack : ~p~n", [ToAttack]),

           
            {DHP,MX,MY,Att} = hd(ToAttack),
            %  io:format("~n Attack : ~p~n", [{DHP,MX,MY,Att}]),
           
            case DHP > 3 of
                true -> dict:store({MX,MY},{Att, DHP-3} ,Board);
                false -> dict:store({MX,MY},{spc, 0} ,Board)
            end;





            %move
        _ -> %io:format("   ~p -> ~p~n", [Player , Boundary]),

            {{SX,SY},{Typ,HP}} = Player,
            Ens = lists:filter(fun( {_,{Z,_},_}) -> (Z /= spc) and (Z /= Typ) end, Boundary),
            SortedEns = lists:sort(fun({{X1,Y1},_,_}, {{X2,Y2},_,_}) -> {Y1,X1} < {Y2,X2} end, Ens),
            % io:format("   ~p -> ~n", [SortedEns]),

            {{TX,TY},{_,_},RDist} = hd(SortedEns),

            F2 = fun(L) -> lists:any(fun({_,{_,_},D}) -> D =:= RDist  end, L) end,
            {_,RFull} = opts( [{TX,TY}] ,Board, 1, [], F2),

% io:format("   ~p -> ~n", [RFull]),

            Valids = lists:filter(fun({C,_,D}) -> 
                (D == RDist-1) and (lists:member(C, [{SX,SY-1},{SX,SY+1},{SX-1,SY},{SX+1,SY}])) end, RFull),
            SValids = lists:sort(fun({{X1,Y1},_,_}, {{X2,Y2},_,_}) -> {Y1,X1} < {Y2,X2} end, Valids),

% io:format("   Valids  ->~p ~n", [SValids]),
 
            {{MX,MY},_,_} = hd(SValids),
            S1 = dict:store({SX,SY},{spc, 0} ,Board),
            S2 = dict:store({MX,MY},{Typ, HP} ,S1),
            S2      %Where to move
    end,

    Turn.


opts(Pos ,Board, Dist, Moves, F) ->
%   io:format("Pos :  ~p~n ", [Pos]),
    Spread = lists:foldl(fun({X,Y}, Acc) -> 
        [{{X, Y}, dict:find({X, Y}, Board), 0},
        {{X, Y-1}, dict:find({X, Y-1}, Board), Dist},
        {{X, Y+1}, dict:find({X, Y+1}, Board), Dist},
        {{X-1, Y}, dict:find({X-1, Y}, Board), Dist},
        {{X+1, Y}, dict:find({X+1, Y}, Board), Dist}] ++ Acc
         end, [], Pos),

    Boundary2 = lists:foldl(fun({{X,Y}, {_,{Typ,S}}, D}, Acc) -> 
                R = case (Typ =:= wal) or (lists:any(fun({{X1,Y1},_,_}) -> (X1==X) and (Y1==Y) end, Moves) ) of
                    true -> Acc;
                    false -> [{{X,Y},{Typ,S},D}] ++ Acc
                end, R end, [] ,Spread),

    Boundary = aoc:dedup(Boundary2),

    % io:format("Boundary :  ~p~n ", [Boundary]),

    CanMove = lists:filter(fun({_, {Typ,_}, _}) ->  Typ =:= spc end, Boundary),
    
     case F(Boundary) or (Dist > 100) of
        true -> {lists:filter(fun(({_, {_,_}, D})) -> (D < 100) end, aoc:dedup(Boundary)), Moves ++ aoc:dedup(Boundary)};
        false -> opts(lists:map(fun ({{X,Y}, _, _}) -> {X,Y} end, CanMove), Board, Dist+1, Moves ++ Boundary, F)
     end.

   

    