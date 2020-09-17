-module(day1).
-export([day2/0]).

run() ->
    file("../data/day01.txt").

day2() ->
    Av1 = "Hello",
    io:format("Bla ~p~n", [Av1]),
    io:format("Hello, world ~n").
    %file("../data/day01.txt").

file(FName) ->  % a variable must start by an Upper case character, otherwise it is an atom
    {ok,IoDevice} = file:open(FName, [read]), % file:open/2 returns the tuple {ok,IoDevice} if it succeeds.
                                              % IoDevice is the file descriptor you will use for further accesses
    string:tokens(io:get_line(IoDevice,""), ". "). % you must use the file descriptor to read a new line, get_line
                                               % is expecting 2 arguments, the second one is a prompt, not used here
                                               % this code will split the first line of the file FName using
                                               % the dot and the white space as separators. It will then returns
                                               % the results letting the file open, but with the file descriptor
                                               % lost! so no chance to continue to read the lines like this.

% readfile(FileName) ->
%     {ok, Binary} = file:read_file(FileName),
%     Lines = string:tokens(erlang:binary_to_list(Binary), "\n").