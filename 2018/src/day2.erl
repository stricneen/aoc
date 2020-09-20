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

    io:format("~nPart 1 : ~p~n", [{Pairs, Triplets}]),
    io:format("~nPart 1 : ~p~n", [Pairs * Triplets]).


char_count([H|T], Counts) ->
    NewCounts = case dict:is_key(H, Counts) of
        true -> dict:update(H, fun(Value) -> Value + 1 end, Counts);
        false -> dict:store(H, 1, Counts)
        end,
    char_count(T, NewCounts);

char_count([], Counts) -> Counts.