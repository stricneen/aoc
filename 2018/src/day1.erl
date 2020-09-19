-module(day1).
-export([day1/0]).


day1() ->
    Lines = readlines("../data/day1.txt"),
    Lines2 = lists:map(fun(N) -> N2 = N--"\n", list_to_integer(N2) end, Lines),
    Total = lists:foldl(fun(A, N) -> A + N end, 0, Lines2),
    io:format("Part 1 : ~p~n", [Total]),

    [H | _] = Lines2,
    P2 = find_dup([H], 1, Lines2),    
    io:format("Part 2 : ~p~n", [P2]).


find_dup(Acc, Inx, Lst) ->
        [H|_] = Acc,
        Curr = H + lists:nth(Inx + 1, Lst),

        Conts = lists:member(Curr, Acc),
        if 
            Conts ->
                Curr;
            true ->
                Ninx = (Inx + 1) rem erlang:length(Lst),
                find_dup([Curr] ++ Acc, Ninx, Lst)
        end.
    

readlines(FileName) ->
    {ok, Device} = file:open(FileName, [read]),
    get_all_lines(Device, []).

get_all_lines(Device, Accum) ->
    case io:get_line(Device, "") of
        eof  -> file:close(Device), Accum;
        Line -> get_all_lines(Device, Accum ++ [Line])
    end.

        % if 
        %     erlang:length(L1) == sets:size(sets:from_list(L1)) -> 
        %         freq_count(L1, L2);
        %     true -> 
        %         L1
        % end

        % Inc = fun(X) -> X+1 end,
        % Inc(1),
