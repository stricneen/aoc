-module(day1).
-export([day2/0]).

% run() ->
%     file("../data/day01.txt").

day2() ->
    % Av1 = "Hello",
    % io:format("Bla ~p~n", [Av1]),
    % io:format("Day 1 ~n"),
    Lines = readlines("../data/day1.txt"),

    Lines2 = lists:map(fun(N) -> N2 = N--"\n", list_to_integer(N2) end, Lines),

    Total = lists:foldl(fun(A, N) -> A + N end, 0, Lines2),
    


    io:format(Total).

readlines(FileName) ->
    {ok, Device} = file:open(FileName, [read]),
    get_all_lines(Device, []).

get_all_lines(Device, Accum) ->
    case io:get_line(Device, "") of
        eof  -> file:close(Device), Accum;
        Line -> get_all_lines(Device, Accum ++ [Line])
    end.
