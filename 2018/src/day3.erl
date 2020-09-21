-module(day3).
-export([run/0]).

-record(claim, {x, y, w ,h}).

run() ->
    Input = aoc:readlines("../data/day3.txt"),
    %io:format(Input),

    % #1209 @ 525,950: 28x12
    
    Claims = lists:map(fun(X) -> 
         % io:format(X),
         Id = string:split(X, " @ "),
         Parts = string:split(lists:nth(2, Id), ": "),
         Coords = string:split(lists:nth(1, Parts), ","),
         Size = string:split(lists:nth(2, Parts), "x"),
        % io:format(lists:nth(0, Coords)),
         #claim{ 
              x=list_to_integer(lists:nth(1, Coords)),
              y=list_to_integer(lists:nth(2, Coords)),
              w=list_to_integer(lists:nth(1, Size)),
              h=list_to_integer(lists:nth(2, Size)) }
         end, Input),

% #1230 @ 28,723: 27x15
% #1231 @ 920,956: 18x23
% #1232 @ 23,641: 17x13
% #1233 @ 437,811: 19x10
   
   io:format("~nPart 1 : ~p~n", [Claims]).