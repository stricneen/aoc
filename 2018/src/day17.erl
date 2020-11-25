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

    % MinX = lists:foldl(fun({X,_}, A) -> if X < A -> X; true -> A end end, 100000, Parsed),
    MinX = lists:foldl(fun({X,_}, A) -> if X < A -> X; true -> A end end, 100000, Parsed),
    Clay = aoc:dedup(lists:map(fun({X,Y}) -> {X,Y} end, Parsed)),
    Spring = {500,0},

    {Water,Settled} = tick( { [{500,1}] ,[] } ,[], Clay, 0),
    % io:format("~p~n : ", [XX]),


    print_g(Spring, Clay, Water, Settled, MinX),

    
    io:format("Water : ~p~n", [length(Water)]),
    io:format("Settled : ~p~n", [length(Settled)]),

    io:format("~nPart 1 : ~p~n", [length(Water) + length(Settled)]).


tick( {WaterEdge, WaterInner}, Settled, Clay, C) ->

%  io:format("~p~n", [length(Water) + length(WaterInner)]),
    
    Fixed = Clay ++ Settled,

    case C > 50 of
        true ->  io:format("    time out : ~p~n", [C]),  
        {aoc:dedup(WaterEdge++WaterInner),Settled};
        
        false -> 
            {NewSpread, NewSettled} = lists:foldl(fun({X,Y}, {Spr, Set}) ->
                % drip - nothing below
                case lists:member({X,Y+1}, Fixed) of

                    false -> {[{X,Y+1}] ++ Spr, Set};
                    true -> 
                        % io:format("~p~n", [X]),

                        Level = lists:sort(lists:filter(fun({_,CY}) -> CY == Y end, Fixed)),
                        CL = first(lists:reverse(Level), fun({CX,_}) -> CX < X end, none),
                        CR = first(Level, fun({CX,_}) -> CX > X end, none),

                        {IsSettled, SettledLocs} = case {CL,CR} of 
                            {{LX,_}, {RX,_}} ->
                                FullBase = lists:filter(fun({CX,CY}) -> (CY == Y + 1) and (CX > LX) and (CX < RX) end, Fixed),
                                {length(FullBase) == RX - LX - 1, lists:map(fun({BX,BY}) -> {BX,BY-1} end , FullBase)};
                            _ -> {false, []}
                        end,

                        case IsSettled of

                            % add above to spread if it is new settled
                           

                            
                            true -> { [{X,Y}] ++ Spr, SettledLocs ++ Set};
                                % Reactive = case lists:member({X,Y+1}, Fixed) of
                                %     true -> [];
                                %     false -> [{X, Y - 1}]
                                %     end,
                                % { Reactive ++ Spr, SettledLocs ++ Set};
                            % [{X, Y - 1}] ++ 
                            
                            false -> 
                                Cx = [],
                                L = case lists:member({X-1,Y}, Fixed) of
                                    false -> Cx ++ [{X-1,Y}];
                                    _ -> Cx
                                end,
                                R = case lists:member({X+1,Y}, Fixed) of
                                    false -> L ++ [{X+1,Y}];
                                    _ -> L
                                end,
                                {Spr ++ R, Set}
                        end
                        
                    end
                     
                end, {[],[]}, WaterEdge),
        
         io:format("WaterEdge: ~p~n ", [WaterEdge] ),

        io:format("New spread: ~p~n New settled: ~p~n", [NewSpread, NewSettled] ),

        BedRock = lists:foldl(fun({_,Y}, A) -> if Y > A -> Y; true -> A end end, 0, Clay),

        NextSettled = aoc:dedup(NewSettled++Settled),
        NewWater = lists:filter(fun({X,Y}) ->  
            (Y - 1 < BedRock) and (not lists:member({X,Y}, NextSettled)) 
            end, aoc:dedup(NewSpread)),
        
         io:format("NS : ~p~n", [length(NewSpread)]),
         io:format("NW : ~p~n", [length(NewWater)]),
                
        case (length(NewSettled) + length(NewWater)) == 0 of
            true -> { 
                %  io:format("NW : ~p~n", [length(NewWater)]),
                %  io:format("WE : ~p~n", [length(WaterEdge)]),
                %  io:format("WI : ~p~n", [length(WaterInner)]),
                
                
                aoc:dedup(NewWater ++ WaterEdge ++ WaterInner), NextSettled };
            false -> tick( {NewWater, aoc:dedup(WaterEdge ++ WaterInner -- NewWater)} , NextSettled, Clay, C+1)
        end
    end.
        



first(L, Condition, Default) ->
  case lists:dropwhile(fun(E) -> not Condition(E) end, L) of
    [] -> Default;
    [F | _] -> F
  end.

print_g({SX,SY}, Clay, Water, Settled, MinX) ->
    aoc:clear_screen(),

    lists:foldl(fun({X,Y},_) -> 
        aoc:print(X-MinX+2,Y+1 , "#")
        end, [], Clay),

    lists:foldl(fun({X,Y},_) -> 
        aoc:print(X-MinX+2,Y+1 , "|")
        end, [], Water),

    lists:foldl(fun({X,Y},_) -> 
        aoc:print(X-MinX+2,Y+1 , "~")
        end, [], Settled),

    aoc:print(SX-MinX+2,SY+1, "+"),

    aoc:print(1,20,"").




% tl 142
% tl 2287