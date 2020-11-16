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
    
    Board = dict:map(fun({X,Y},V) -> 
        case V of
            69 -> {elf, 200, (X*100) + Y};
            71 -> {gob, 200, (X*100) + Y};
            35 -> {wal, 0, 0};
            46 -> {spc, 0, 0};
            _ -> {} 
        end
        end, Grid),
    


    {Final,Rounds} = play_game(Board, 1),
    
    
    Players = dict:filter(fun(_,{X, _,_}) -> (X =:= elf) or (X =:= gob) end, Final),
    Winners = lists:sort(dict:fold(fun(K,V,Acc) -> [{K,V}] ++ Acc end,  [], Players)),
    io:format("~nWinners : ~p~n", [Winners]),
    HP = lists:sum(lists:map(fun({_,{_,X,_}}) -> X end, Winners)),

    io:format("HP     : ~p~n", [HP]),
    io:format("Rounds : ~p~n", [Rounds-1]),
%  aoc:print_dict(Final),

    io:format("~nPart 1 : ~p~n", [HP * (Rounds-1)])
.

% th 181744

% 181741 no


% tl 179288
% tl 164885


play_game(Board, C) ->

 aoc:print_dict(Board),

%  aoc:print(40, 3 , "Turn : ~p", [C]),
io:format("Turn : ~p", [C]),

   Next = play_round(Board),
%   timer:sleep(100),

    % Players = dict:filter(fun(_,{X, _,_}) -> (X =:= elf) or (X =:= gob) end, Next),
    % PlayersI =  dict:fold(fun(K,V,Acc) -> [{K,V}] ++ Acc end,  [], Players),
    % PlayersL = lists:sort(fun({{X1,Y1},_}, {{X2,Y2},_}) -> {Y1,X1} < {Y2,X2} end, PlayersI),
    % io:format("~n Players : ~p~n", [PlayersL]),

    Elfs = dict:filter(fun(_,{X, _,_}) -> (X =:= elf) end, Next),
    Goblins = dict:filter(fun(_,{X, _,_}) -> (X =:= gob) end, Next),
    case (dict:size(Elfs) == 0) or (dict:size(Goblins) == 0) or (C == 10000) of % turns ----------------
        true -> {Next,C};
        false -> play_game(Next, C+1)
    end.

play_round(Board) ->
    Players = dict:filter(fun(_,{X, _,_}) -> (X =:= elf) or (X =:= gob) end, Board),
    PlayersI =  dict:fold(fun(K,V,Acc) -> [{K,V}] ++ Acc end,  [], Players),
    PlayersL = lists:sort(fun({{X1,Y1},_}, {{X2,Y2},_}) -> {Y1,X1} < {Y2,X2} end, PlayersI),
 
%   io:format("Players : ~p~n", [PlayersL]),

    Tick = lists:foldl(fun(P,B) -> 
        {K,{Typ,HP,Id}} = P,

        {T,_,BId} = dict:fetch(K, B),

        R = case BId == Id of
            true -> case T of 
                        spc -> B;
                        _ -> turn({K,{Typ,HP,Id}}, B)
                        end;
            false -> B
        end,
        % io:format("~n Turn  : ~p~n", [{T,S}] ),
        R
        end,
    Board, PlayersL),
    Tick.



turn(Player, Board) ->
    
%   io:format("~n Player : ~p~n", [Player]),

    {{X,Y}, {Ty,_,_}} = Player,

    Enemy = case Ty of 
        gob -> elf;
        _ -> gob
    end,

    F = fun(L) -> lists:any(fun({_,{Typ,_,_},_}) -> Typ =:= Enemy end, L) end,

    {Boundary,_} = opts( [{X,Y}] ,Board, 1, [], F),
    %  io:format("~n Boundary : ~p~n", [Boundary]),

    InRange = lists:any(fun({_,_,D}) -> D =:= 1 end, Boundary),

    {Turn,MX2,MY2} = case Boundary of
        [] -> {Board,X,Y};
          
            %move
        _  when InRange =:= false -> %io:format("   ~p -> ~p~n", [Player , Boundary]),

            {{SX,SY},{Typ,HP,Id}} = Player,
            Ens = lists:filter(fun( {_,{Z,_,_},_}) -> (Z /= spc) and (Z /= Typ) end, Boundary),
            SortedEns = lists:sort(fun({{X1,Y1},_,_}, {{X2,Y2},_,_}) -> {Y1,X1} < {Y2,X2} end, Ens),
            % io:format("   ~p -> ~n", [SortedEns]),

            {{TX,TY},{_,_,_},RDist} = hd(SortedEns),

            F2 = fun(L) -> lists:any(fun({_,{_,_,_},D}) -> D =:= RDist  end, L) end,
            {_,RFull} = opts( [{TX,TY}] ,Board, 1, [], F2),

% io:format("   ~p -> ~n", [RFull]),

            Valids = lists:filter(fun({C,{Type,_,_},D}) -> 
                (Type == spc) and (D == RDist-1) and (lists:member(C, [{SX,SY-1},{SX,SY+1},{SX-1,SY},{SX+1,SY}])) end, RFull),
            SValids = lists:sort(fun({{X1,Y1},_,_}, {{X2,Y2},_,_}) -> {Y1,X1} < {Y2,X2} end, Valids),

% io:format("   Valids  ->~p ~n", [SValids]),
 
            {{MX,MY},_,_} = hd(SValids),
            S1 = dict:store({SX,SY},{spc, 0, 0} ,Board),
            S2 = dict:store({MX,MY},{Typ, HP, Id} ,S1),
            {S2,MX,MY};      %Where to move

        _ -> {Board,X,Y}
    end,


    {Boundary3,_} = opts( [{MX2,MY2}] ,Turn, 1, [], F),
    InRange2 = lists:any(fun({_,_,D}) -> D =:= 1 end, Boundary3),
    % io:format("~n InRange2 : ~p~n", [InRange2]),

    DDX = case InRange2 of 
        true ->
            
            EnemiesInRange = lists:filter(fun( {_,{Typ,_,_},Dist}) -> (Typ =:= Enemy) and (Dist =:= 1) end, Boundary3),
            ToAttack = lists:sort(lists:map(fun({{X1,Y1},{Type,HP,Id},_}) -> {HP,X1,Y1,Type,Id} end, EnemiesInRange)),
            %  io:format("~n ToAttack : ~p~n", [ToAttack]),

            {DHP,MXX,MYY,Att,NId} = hd(ToAttack),

%    io:format("~p  Attack : ~p~n", [Player,{DHP,MXX,MYY,Att}]),
           
            case DHP > 3 of
                true -> dict:store({MXX,MYY},{Att, DHP-3, NId} ,Turn);
                false -> dict:store({MXX,MYY},{spc, 0, 0} ,Turn)
            end;
    
        false -> Turn
    end,
   DDX.


opts(Pos ,Board, Dist, Moves, F) ->
%   io:format("Pos :  ~p~n ", [Pos]),
    Spread = lists:foldl(fun({X,Y}, Acc) -> 
        [{{X, Y}, dict:find({X, Y}, Board), 0},
        {{X, Y-1}, dict:find({X, Y-1}, Board), Dist},
        {{X, Y+1}, dict:find({X, Y+1}, Board), Dist},
        {{X-1, Y}, dict:find({X-1, Y}, Board), Dist},
        {{X+1, Y}, dict:find({X+1, Y}, Board), Dist}] ++ Acc
         end, [], Pos),

    Boundary2 = lists:foldl(fun({{X,Y}, {_,{Typ,S,Id}}, D}, Acc) -> 
                R = case (Typ =:= wal) or (lists:any(fun({{X1,Y1},_,_}) -> (X1==X) and (Y1==Y) end, Moves) ) of
                    true -> Acc;
                    false -> [{{X,Y},{Typ,S,Id},D}] ++ Acc
                end, R end, [] ,Spread),

    Boundary = aoc:dedup(Boundary2),

    % io:format("Boundary :  ~p~n ", [Boundary]),

    CanMove = lists:filter(fun({_, {Typ,_,_}, _}) ->  Typ =:= spc end, Boundary),
    
     case F(Boundary) or (Dist > 1000) of
        true -> {lists:filter(fun(({_, {_,_,_}, D})) -> (D < 100) end, aoc:dedup(Boundary)), Moves ++ aoc:dedup(Boundary)};
        false -> opts(lists:map(fun ({{X,Y}, _, _}) -> {X,Y} end, CanMove), Board, Dist+1, Moves ++ Boundary, F)
     end.

   

    