-module(day1).
-export([day2/0]).

% run() ->
%     file("../data/day01.txt").

day2() ->
    % Av1 = "Hello",
    % io:format("Bla ~p~n", [Av1]),
    % io:format("Day 1 ~n"),
    Lines = readlines("../data/day1.txt"),

    Lines2 = lists:map(fun(N) -> list_to_integer(N) + 100 end, Lines),
    


    io:format(Lines2).

readlines(FileName) ->
    {ok, Device} = file:open(FileName, [read]),
    get_all_lines(Device, []).

get_all_lines(Device, Accum) ->
    case io:get_line(Device, "") of
        eof  -> file:close(Device), Accum;
        Line -> get_all_lines(Device, Accum ++ [Line])
    end.

file(FName) ->  % a variable must start by an Upper case character, otherwise it is an atom
    % {ok,IoDevice} = file:open(FName, [read]), % file:open/2 returns the tuple {ok,IoDevice} if it succeeds.
    {ok, Binary} = file:read_file(FName),
    io:format(Binary).                                         % IoDevice is the file descriptor you will use for further accesses
    %string:tokens(io:get_line(IoDevice,""), ". "). % you must use the file descriptor to read a new line, get_line
                                               % is expecting 2 arguments, the second one is a prompt, not used here
                                               % this code will split the first line of the file FName using
                                               % the dot and the white space as separators. It will then returns
                                               % the results letting the file open, but with the file descriptor
                                               % lost! so no chance to continue to read the lines like this.

% readfile(FileName) ->
%     {ok, Binary} = file:read_file(FileName),
%     Lines = string:tokens(erlang:binary_to_list(Binary), "\n").