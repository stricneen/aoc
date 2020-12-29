-module(day17).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day17.txt"),
 
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

    
    MaxY = lists:foldl(fun({_,Y}, A) -> if Y > A -> Y; true -> A end end, 0, Parsed),
    
    
    Clay = aoc:dedup(lists:map(fun({X,Y}) -> {{X,Y}, "#"} end, Parsed)),
    Grid = dict:from_list(Clay),
    GridSource = dict:store({500,0}, "+", Grid),
    R = tick([{500,0}], GridSource, 50, MaxY),
    
    MinY = lists:foldl(fun({_,Y}, A) -> if Y < A -> Y; true -> A end end, 100000, Parsed),
    MaxY = lists:foldl(fun({_,Y}, A) -> if Y > A -> Y; true -> A end end, 0, Parsed),
    % print_dict_side(R, MinX),

% 31649 - too high
% 31648

    Settled = grid_has("~", R, MinY, MaxY),
    Flowing = grid_has("|", R, MinY, MaxY),
    
    %  io:format("~nSettled : ~p~n", [Settled]),
    %  io:format("~nFlowing : ~p~n", [Flowing]),
     
% print_to_file(R),
% print_dict2(Grid,600),

    io:format("~nPart 1 : ~p~n", [Settled + Flowing]),
    io:format("~nPart 2 : ~p~n", [Settled]).


tick([], Grid, _, _) -> Grid;
% tick(_, Grid, 0, _) -> Grid;
tick(Edge, Grid, C, MaxY) ->

%  MaxYEdge = aoc:max(lists:map(fun({_,Y}) -> Y end, Edge)),
% print_dict2(Grid,MaxYEdge-100),
%  timer:sleep(100),
    % print_dict2(Grid, MaxYEdge),

    {NEdge, NGrid} = lists:foldl(fun({X,Y}, {N,G}) -> 

        {NE, NG} = case will_settle({X,Y}, G) of
            true -> settle({X,Y}, G);
            false -> 
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

                Dedup = aoc:dedup(NEdge),
                {Dedup, store_all(Dedup, "|", G)}
            end,

        NE2 = lists:foldl(fun(X3, Acc) -> 
            case dict:find(X3, NG) of
                {ok, "~"} -> Acc;
                _ -> [X3] ++ Acc
            end
        end, [], NE ++ N),

        NE3 = lists:filter(fun({_,Y1}) -> Y1 < MaxY end, NE2),

        {NE3, NG}
        end, {[], Grid}, Edge),

    tick(NEdge, NGrid, C-1, MaxY).

grid_has(Val, D, MinY, MaxY) ->
    L = lists:filter(fun({{_,Y},_}) -> (Y >= MinY) and (Y =< MaxY) end, dict:to_list(D)),

    F = lists:filter(fun({_,V}) -> V == Val end, L),
    length(F).

will_settle({X,Y}, G) ->
   is_base({X,Y}, G) and enclosed_left({X,Y}, G) and enclosed_right({X,Y}, G).

settle({X,Y}, G) ->
    {LGrid, LS} = settle_left({X,Y}, G, []),
    {RGrid, Settled} = settle_right({X,Y}, LGrid, LS),

    AboveSettled = lists:map(fun({X1,Y1}) -> {X1,Y1-1} end, [{X,Y}|Settled]),
    Source = lists:foldl(fun(E,Acc) -> 
        case dict:find(E, RGrid) of
            {ok, "|"} -> [E|Acc];
            _-> Acc
        end
        end, [], AboveSettled),
    {Source, dict:store({X,Y}, "~", RGrid)}.
    


settle_left({X,Y}, G, Settled) ->
    case dict:find({X-1,Y}, G) of
        {ok, "#"} -> {G,Settled};
        {ok, "~"} -> {G,Settled};
        _ -> settle_left({X-1,Y}, dict:store({X-1,Y}, "~", G), [{X-1,Y}|Settled])
    end.

settle_right({X,Y}, G, Settled) ->
    case dict:find({X+1,Y}, G) of
        {ok, "#"} -> {G,Settled};
        {ok, "~"} -> {G,Settled};
        _ -> settle_right({X+1,Y}, dict:store({X+1,Y}, "~", G), [{X+1,Y}|Settled])
    end.

enclosed_left({X,Y}, G) ->
    case { dict:find({X,Y+1}, G), dict:find({X-1,Y}, G)} of
        { error, _ } -> false;
        { {ok, "#"}, {ok, "#"}} -> true;
        { {ok, "~"}, {ok, "#"}} -> true;
        { {ok,"|"}, _} ->  false;
        { {ok, "~"}, _} -> enclosed_left({X-1,Y}, G);
        { {ok, "#"}, _} -> enclosed_left({X-1,Y}, G)
    end.

enclosed_right({X,Y}, G) ->
    case { dict:find({X,Y+1}, G), dict:find({X+1,Y}, G)} of
        { error, _ } -> false;
        { {ok, "#"}, {ok, "#"}} -> true;
        { {ok, "~"}, {ok, "#"}} -> true;
        { {ok,"|"}, _} ->  false;
        { {ok, "~"}, _} -> enclosed_right({X+1,Y}, G);
        { {ok, "#"}, _} -> enclosed_right({X+1,Y}, G)
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


% replace_at(L, I, R) ->
%     lists:sublist(L, I-1) ++ [R] ++ lists:nthtail(I, L).

% print_to_file(D) -> 
%     L = dict:to_list(D),
%     Data = lists:duplicate(2000, lists:duplicate(1000, " ")),
%     U = lists:foldl(fun({{X,Y},V}, A) -> 
%         replace_at(A, Y+1, replace_at(lists:nth(Y+1,A), X+1, V))
%     end, Data, L),
    
%     LineSep = io_lib:nl(),
%     Print = [string:join(U, LineSep), LineSep],
%     file:write_file("output.txt", Print).

    

% print_dict(D, MinX) ->
%     aoc:clear_screen(),
%     L = dict:to_list(D),
%     lists:foldl(fun({{X,Y},C},_) -> 
%         aoc:print(X-MinX+5,Y+1, C)
%         end, [], L).

% print_dict2(D, Top) ->
%     aoc:clear_screen(),
%     Size = 130,
%     L = lists:filter(fun({{_,Y},_}) -> (Y > Top) and (Y < Top + Size) end, dict:to_list(D)),
%     lists:foldl(fun({{X,Y},C},_) -> 
%         aoc:print(X-500+250, Y - Top, C)
%         end, [], L).

% print_dict_side(D, MinX) ->
%     aoc:clear_screen(),
%     L = dict:to_list(D),
%     lists:foldl(fun({{X,Y},C},_) -> 
%         aoc:print(Y+1,X-MinX+5, C)
%         end, [], L).

% print_dict(D, MinY, MaxY) ->
%     aoc:clear_screen(),
%     L = dict:to_list(D),
%     lists:foldl(fun({{X,Y},C},_) -> 
%         aoc:print(X-MinX+5,Y+1, C)
%         end, [], L).

    %     1
    %    234
    %     5 
