-module(day2).
-export([run/0]).



run() ->
    Input = aoc:readlines("../data/day2.txt"),
    % io:format(Input),


    {Pairs, Triplets} = lists:foldl(fun(_,A) -> {element(1, A)+1, element(2, A) +1}  end, {0,0}, Input),




    io:format("~nPart 1 : ~p~n", [{Pairs, Triplets}]).