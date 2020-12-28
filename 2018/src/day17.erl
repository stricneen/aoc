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
    R = tick([{500,0}], GridSource, 50),
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
        
        NEdge = case {Below, Left, Right} of 

            {{ok,"#"}, error, error}     -> [{X-1,Y},{X+1,Y}];
            {{ok,"#"}, {ok, "|"}, error} -> [{X+1,Y}];
            {{ok,"#"}, error, {ok, "|"}} -> [{X-1,Y}]; 
            {{ok,"~"}, error, error}     -> [{X-1,Y},{X+1,Y}];
            {{ok,"~"}, {ok, "|"}, error} -> [{X+1,Y}];
            {{ok,"~"}, error, {ok, "|"}} -> [{X-1,Y}]; 
            {error, _, _}                -> [{X,Y+1}];
            
            _ -> []
        end,

        NGrid = store_all([{X,Y}] ++ NEdge, "|", G),
        Settled = settle([{X,Y}] ++ NEdge, NGrid),

        Retry = retry(NGrid, Settled, NEdge),

        {NEdge++N++Retry, Settled}
        end, {[], Grid}, Edge),


    
    tick(NEdge, NGrid, C-1).

retry(Prev, Next, Edge) ->
    Retry = lists:foldl(fun({X,Y}, Acc) ->

        Was = dict:find({X,Y}, Prev),
        Is = dict:find({X,Y}, Next),
        Above = dict:find({X, Y-1}, Next),

    io:format("~p : ~p : ~p~n", [Was, Is, Above]),

        Ret = case {Was, Is, Above} of 
            {{ok, "|"}, {ok, "~"}, {ok, "|"}} -> [{X,Y-1}];
            _ -> []
        end,

        Ret ++ Acc
        end, [], Edge),

    io:format("~p~n", [Retry]),

    Retry.

%   Total = lists:foldl(fun(A, N) -> A + N end, 0, Lines2),


settle([], D) -> D;
settle([{X,Y}|T], D) ->
    DN = case {is_left_corner({X,Y}, D), is_right_corner({X,Y}, D)} of
        { true, true } -> dict:store({X,Y}, "~", D);
        { true, false } -> check_right([{X+1,Y}], D);
        { false, true } -> check_left([{X-1,Y}], D);
        { false, false } -> D
    end,
    % io:format("DN : ~p~n", [DN]),
    settle(T, DN).

check_right([{X,Y}|T], G) -> 
    case {is_base({X,Y}, G), is_left_corner({X,Y}, G)} of 
        { true, true } -> check_settle_left([{X,Y}], G);
        { true, false } -> check_right([{X+1,Y}] ++ [{X,Y}] ++ T, G);
        _ -> G
    end.

check_left([{X,Y}|T], G) -> 
    case {is_base({X,Y}, G), is_right_corner({X,Y}, G)} of 
        { true, true } -> check_settle_right([{X,Y}], G);
        { true, false } -> check_left([{X+1,Y}] ++ [{X,Y}] ++ T, G);
        _ -> G
    end.

check_settle_right(L, G) ->
    [{X,Y}|_] = L,

    % io:format("~p:~p~n",[is_base({X,Y}, G), is_left_corner({X,Y}, G)]),
    case {is_base({X,Y}, G), is_left_corner({X,Y}, G)} of
        {true, true} -> store_all(L, "~", G);
        {true, false} -> check_settle_right([{X-1,Y}] ++ L, G);
        _ ->  G
    end.

check_settle_left(L, G) ->
    [{X,Y}|_] = L,
    case {is_base({X,Y}, G), is_right_corner({X,Y}, G)} of
        {true, true} -> store_all(L, "~", G);
        {true, false} -> check_settle_left([{X+1,Y}] ++ L, G);
        _ -> G
    end.

is_left_corner({X,Y}, G) ->
    case {dict:find({X-1,Y}, G),dict:find({X,Y+1}, G)} of
        {{ok, "#"},{ok, "#"}} -> true;
        _ -> false
    end.
    
is_right_corner({X,Y}, G) ->
    case {dict:find({X+1,Y}, G),dict:find({X,Y+1}, G)} of
        {{ok, "#"},{ok, "#"}} -> true;
        _ -> false
    end.

is_base({X,Y}, G) ->
    case dict:find({X,Y+1}, G) of
        {ok, "#"} -> true;
        {ok, "~"} -> true;
        _ -> false
    end.

store_all([], _, D) -> D;
store_all([H|T], V, D) -> 
    N = dict:store(H, V, D),
    store_all(T, V, N).


print_dict(D, MinX) ->
    aoc:clear_screen(),
    L = dict:to_list(D),
    lists:foldl(fun({{X,Y},C},_) -> 
        aoc:print(X-MinX+5,Y+1, C)
        end, [], L).
