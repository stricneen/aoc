-module(day4).
-export([run/0]).

run() ->

    Input = aoc:readlines("../data/day4.txt"),
    SortedInput = lists:sort(Input),
    Parsed = lists:map(fun (X) -> 
        [Time, Event] = string:lexemes(X, "]"),
        [D,T] = string:lexemes(Time, " "),
        [_,S] = string:lexemes(T, ":"),
        {D, list_to_integer(S), Event}
        end, SortedInput),

    Times = lists:foldl(fun(X,A) -> A end, [], Parsed),



    aoc:print_list(Parsed).




% dict : 




% {"[1518-11-19 23:58"," Guard #821 begins shift"}
% {"[1518-11-21 00:03"," Guard #1447 begins shift"}
% {"[1518-11-21 00:24"," falls asleep"}
% {"[1518-11-21 00:27"," wakes up"}
% {"[1518-11-21 00:39"," falls asleep"}