-module(day20).
-export([run/0]).
-include_lib("stdlib/include/assert.hrl").

run() ->
    Input = aoc:readlines("../data/day20.txt"),
    tests(),
    io:format("~nPart 1 : ~p~n", [0]).

calc_dist(Route) ->
    Clean = lists:reverse(tl(lists:reverse(tl(Route)))),
    % Clean = string:replace(string:replace(Route, "^", ""), "$", ""),
    io:format("~p~n", [Clean]),
    dist(Clean).

dist([]) -> 0;
dist(Route) ->
    io:format("Route : ~p\t~n", [Route]), 
    case lists:member($(, Route) of
        false ->  length(Route);
        true -> {Pre, Bracket, Remainder} = split(Route),
         io:format("Splitting : ~p~n", [Route]),
         io:format("Pre : ~p\t~n", [Pre]), 
         io:format("Bra : ~p\t~n", [Bracket]), 
         io:format("Rem : ~p\t~n", [Remainder]), 
                dist(Pre) + dist(Bracket) + dist(Remainder)
    end.

split(Route) ->
    [H|T] = string:split(Route, "("),
    % io:format("split : ~p\t~n", [T]), 
    {A,B} = match(hd(T), [], 1),
    % io:format("Pre : ~p\t Inner : ~p\t Post : ~p~n", [H,A,B]), 
    { H, A, B }.

match([$)|T], Acc, 1) -> {Acc, T};
match(L1, L2, 0) -> {L1, L2};
match([$(|T], Acc, Depth) -> match(T, Acc ++ [$(], Depth + 1);
match([$)|T], Acc, Depth) -> match(T, Acc ++ [$)], Depth - 1);
match(R, Acc, Depth) -> 
    [H|T] = R,
    % io:format("R : ~p\t~n", [R]), 
    match(T, Acc ++ [H], Depth).
    
tests() -> 
    test({"^WNE$", 3}),
    test({"^ENWWW(NEEE|SSE(EE|N))$", 10}),
    test({"^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$", 18}),
    test({"^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$", 23}),
    test({"^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$", 31}).

test({Route, Dist}) ->
    ?assertEqual(Dist, calc_dist(Route), Route).
