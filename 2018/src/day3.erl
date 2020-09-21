-module(day3).
-export([run/0]).

-record(claim, {x, y, w ,h}).

run() ->
    Input = aoc:readlines("../data/day3.txt"),
    io:format(Input),

    % #1209 @ 525,950: 28x12
    
    Claims = lists:map(fun(X) -> 
         #claim{x=0,y=0,w=0,h=0}
         end, Input),



    io:format("~nPart 1 : ~p~n", [Claims]).