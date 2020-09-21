-module(aoc).
-export([readlines/1]).
-export([aggregate_list/2]).

readlines(FileName) ->
    {ok, Device} = file:open(FileName, [read]),
    get_all_lines(Device, []).

get_all_lines(Device, Accum) ->
    case io:get_line(Device, "") of
        eof  -> file:close(Device), Accum;
        Line -> get_all_lines(Device, Accum ++ [string:trim(Line)])
    end.

aggregate_list([H|T], Counts) ->
    NewCounts = case dict:is_key(H, Counts) of
        true -> dict:update(H, fun(Value) -> Value + 1 end, Counts);
        false -> dict:store(H, 1, Counts)
        end,
    aggregate_list(T, NewCounts);

aggregate_list([], Counts) -> Counts.