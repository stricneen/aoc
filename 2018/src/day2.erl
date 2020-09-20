-module(day2).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day2.txt"),

    HasCount = fun(S, C) ->
        Count = char_count(S, dict:new()),
        HasTriple = dict:fold(fun(_,V,A) -> A or (V == C) end, false, Count),
        R = case HasTriple of
                true -> 1;
                false -> 0
            end,
        R end,

    {Pairs, Triplets} = lists:foldl(fun(S,A) ->
        {element(1, A) + HasCount(S, 2), element(2, A) + HasCount(S, 3)}  
        end, {0,0}, Input),

    %io:format("~nPart 1 : ~p~n", [{Pairs, Triplets}]),
    io:format("~nPart 1 : ~p~n", [Pairs * Triplets]),


    P2 = find_boxes(Input),
    io:format("~nPart 2 : ~p~n", [P2]).


find_boxes([H|T]) ->
    Compare = lists:map(fun(B) -> diff_lists(H, B) end, T),
    Single = lists:filter(fun({X,_,_}) -> X == 1 end, Compare),
    %io:format("S : ~p~n", [Compare]),
    case length(Single) of
        1 -> Single;
        _ -> find_boxes(T)
    end.


diff_lists(L1, L2) ->
    Z = lists:zip(L1, L2),
    Count = lists:foldl(fun({C1, C2}, A) -> 
       R =  if 
           C1 == C2 -> A;
           true -> A + 1
        end,
        R end,

     0, Z),
    {Count, L1, L2 }.


char_count([H|T], Counts) ->
    NewCounts = case dict:is_key(H, Counts) of
        true -> dict:update(H, fun(Value) -> Value + 1 end, Counts);
        false -> dict:store(H, 1, Counts)
        end,
    char_count(T, NewCounts);

char_count([], Counts) -> Counts.