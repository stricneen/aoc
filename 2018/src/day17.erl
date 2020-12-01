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
    Clay = aoc:dedup(lists:map(fun({X,Y}) -> {X,Y} end, Parsed)),

    {Water,Settled} = tick( { [{500,1}] ,[] } ,[], Clay, 0),
    % io:format("~p~n : ", [XX]),

    XWater = lists:filter(fun(X) -> not lists:member(X, Settled) end, Water),


    MinX = lists:foldl(fun({X,_}, A) -> if X < A -> X; true -> A end end, 100000, Parsed),
    Spring = {500,0},
    print_g(Spring, Clay, Water, Settled, MinX),

    
    io:format("Water : ~p~n", [length(XWater)]),
    io:format("Settled : ~p~n", [length(Settled)]),

    io:format("~nPart 1 : ~p~n", [length(XWater) + length(Settled)]).


tick( {WaterEdge, WaterInner}, Settled, Clay, C) ->

    Fixed =  Settled ++ Clay,

    case C > 3000000000 of
        true ->  io:format("    time out : ~p~n", [C]),  
        {aoc:dedup(WaterEdge++WaterInner),aoc:dedup(Settled)};
        
        false -> 
            {NewSpread, NewSettled} = lists:foldl(fun({X,Y}, {Spr, Set}) ->
                % drip - nothing below
                case lists:member({X,Y+1}, Fixed) of

                    false -> {[{X,Y+1}] ++ Spr, Set};
                    true -> 
                        {F, Top} = fill({X,Y}, [], Clay),


                        Cx = [],
                        L = case lists:member({X-1, Top}, Fixed) or lists:member({X-1, Top}, WaterInner) of
                            false -> Cx ++ [{X-1,Top}];
                            _ -> Cx
                        end,
                        R = case lists:member({X+1, Top}, Fixed) or lists:member({X+1, Top}, WaterInner) of
                            false -> L ++ [{X+1, Top}];
                            _ -> L
                        end,


                        { R ++ Spr, F ++ Set}
                    
                    end
                     
                end, {[],[]}, WaterEdge),
        
        %  io:format("WaterEdge: ~p~n ", [WaterEdge] ),

        % io:format("New spread: ~p~n New settled: ~p~n", [NewSpread, NewSettled] ),

        BedRock = lists:foldl(fun({_,Y}, A) -> if Y > A -> Y; true -> A end end, 0, Clay),

        NextSettled = aoc:dedup(NewSettled++Settled),
        NewWater = lists:filter(fun({X,Y}) ->  
            (Y - 1 < BedRock) and (not lists:member({X,Y}, NextSettled)) 
            end, aoc:dedup(NewSpread)),
        
        %  io:format("NS : ~p~n", [length(NewSpread)]),
    %    io:format("NW : ~p~n", [length(Settled)]),
                
        case (length(NewSettled) + length(NewWater)) == 0 of
            true -> { 
                %  io:format("NW : ~p~n", [length(NewWater)]),
                %  io:format("WE : ~p~n", [length(WaterEdge)]),
                %  io:format("WI : ~p~n", [length(WaterInner)]),
                
                
                aoc:dedup(NewWater ++ WaterEdge ++ WaterInner), NextSettled };
            false -> tick( {NewWater, aoc:dedup(WaterEdge ++ WaterInner -- NewWater)} , NextSettled, Clay, C+1)
        end
    end.
        
%  #         |         #
%  #|||||||||||#       #
%  #~~~~~~~#~~~#       #
%  #~~~~~~~#####       #
%  #~~~~~~~~~~~~~~~~~~~#


fill({X,Y}, Added, Clay) ->

    Level = lists:sort(lists:filter(fun({_,CY}) -> CY == Y end, Clay)),

    CL = first(lists:reverse(Level), fun({CX,_}) -> (CX < X) end, none),
    CR = first(Level, fun({CX,_}) -> (CX > X) end, none),
io:format("Edges : ~p~n~n", [{CL,CR}]),
    case {CL,CR} of 
        {{LX,_}, {RX,_}} ->
                FullBase = lists:filter(fun({CX,CY}) -> (CY == Y + 1) and (CX > LX) and (CX < RX) end, Added ++ Clay),
                
                io:format("FB : ~p~n", [length(FullBase)]),
                io:format("Df : ~p~n~n", [RX - LX - 1]),

                case length(FullBase) == RX - LX - 1 of % is the base solid
                    true -> fill({X,Y - 1}, lists:map(fun({XX,YY}) -> {XX,YY-1} end, FullBase) ++ Added, Clay);
                    false -> 
                        % have we filled the row 
                        
                        {Added, Y}
                end;

        _ ->  {Added, Y}
    end.

                        


    



first(L, Condition, Default) ->
  case lists:dropwhile(fun(E) -> not Condition(E) end, L) of
    [] -> Default;
    [F | _] -> F
  end.

print_g({SX,SY}, Clay, Water, Settled, MinX) ->
    aoc:clear_screen(),
    D = 120,
    lists:foldl(fun({X,Y},_) -> 
        aoc:print(X-MinX+2,Y+1 , "#")
        end, [], clip(Clay, D)),

    lists:foldl(fun({X,Y},_) -> 
        aoc:print(X-MinX+2,Y+1 , "|")
        end, [], clip(Water,D)),

    lists:foldl(fun({X,Y},_) -> 
        aoc:print(X-MinX+2,Y+1 , "~")
        end, [], clip(Settled,D)),

    aoc:print(SX-MinX+2,SY+1, "+"),

    aoc:print(1,30,"").


clip(L, Depth) ->
    lists:filter(fun({_,Y}) -> Y < Depth end, L).

% tl 142
% tl 2287