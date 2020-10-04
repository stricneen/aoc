-module(day6).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day6.txt"),

    Coords = lists:map(fun(X) -> 
        [A,B] = string:lexemes(X, ", "),
        {list_to_integer(A),list_to_integer(B)}
        end, Input),
    
    {X1, Y1} = lists:foldl(fun({X,Y}, {AX,AY}) -> {min(X, AX), min(Y, AY)} end, {1000,1000}, Coords),
    {X2, Y2} = lists:foldl(fun({X,Y}, {AX,AY}) -> {max(X, AX), max(Y, AY)} end, {0,0}, Coords),
            
    Map = [ {X,Y} || X <- lists:seq(X1,X2), Y <- lists:seq(Y1,Y2) ],

    Closest = lists:map(fun({X,Y}) -> 
        Owner = find_owner({X,Y}, Coords),
        {{X,Y}, Owner}
        end, Map),
    
    Single = lists:filter(fun({_,O}) -> length(O) == 1 end, Closest),
    Unbound = lists:filter(fun({{X,Y},_}) -> (X == X1) or (X == X2) or (Y ==Y1) or (Y == Y2) end, Single),
    UnboundC = dedup(lists:sort(lists:map(fun({_,D}) -> element(1,hd(D)) end, Unbound))),
    
    Bound = lists:filter(fun({_,L}) -> not lists:member(element(1,hd(L)), UnboundC) end, Single),
    Areas = count(fun({_, L}) -> element(1,hd(L)) end, Bound),
    A = dict:to_list(Areas),
    io:format("Part 1 : ~p~n", [A]),



    Totals = lists:map(fun(S) -> 
        lists:sum(lists:map(fun(P) -> distance(S,P) end, Coords))
        end, Map),

    S = length(lists:filter(fun(X) -> X < 10000 end, Totals)),

    io:format("Part 2 : ~p~n", [S])


    % io:format("TL : ~p~n", [{X1, Y1}]),
    % io:format("BR : ~p~n", [{X2, Y2}]),
    .

%    1,1      Map [ - 1,1 - 1,2 - 1,3 - ]
find_owner(Point, Coords) ->
    Cont = lists:map(fun(X) -> 
        {X, distance(Point, X)}
        end, Coords),
    Sorted = lists:keysort(2, Cont),
    Owners = lists:filter(fun({_,D}) -> D == element(2, hd(Sorted)) end, Sorted),
    Owners.

distance({X1,Y1}, {X2,Y2}) ->
    abs(X1-X2) + abs(Y1-Y2).

% max(X,Y) -> 
%     case X > Y of
%         true -> X;
%         false -> Y
%     end.

% min(X,Y) -> 
%     case X < Y of
%         true -> X;
%         false -> Y
%     end.
count(F, L) ->
   lists:foldl(fun (X, Acc) -> 
        Key = F(X),
        C = case dict:is_key(Key, Acc) of
            true -> dict:update(Key, fun(Value) -> Value + 1 end, Acc);
            false -> dict:store(Key, 1, Acc)
            end,
        C
        end, dict:new(), L).

dedup(L) -> 
    S = sets:from_list(L),
    sets:to_list(S).