-module(aoc).
-export([readlines/1]).
-export([readlines_no_trim/1]).
-export([aggregate_list/2]).
-export([print_list/1]).
-export([dedup/1]).
-export([print/1]).
-export([print/3]).
-export([print_dict/1]).
-export([clear_screen/0]).


print_dict(D) ->
     clear_screen(),
    dict:fold(fun({X,Y},{T,_},_) ->
    
      Disp = case T of
          wal -> "#";
          gob -> "G";
          elf -> "E";
          spc -> " "
        end,


        io:format("\033[" ++ integer_to_list(Y) ++ ";" ++ integer_to_list(X) ++ "H"),
        io:format("~s", [Disp])
        end, [], D),
        
    io:format("~n~n~n", []).

print(L) ->
    io:format(os:cmd(clear)), % clear screen
    lists:foreach(fun({Y,X,_,_}) -> 
        print(X-140, Y-100, "*")
    end, L).

clear_screen() ->
     io:format(os:cmd(clear)).
    
print(X, Y, T) ->
    io:format("\033[" ++ integer_to_list(Y) ++ ";" ++ integer_to_list(X) ++ "H"),
    io:format("~s", [[T]]).   

readlines(FileName) ->
    {ok, Device} = file:open(FileName, [read]),
    get_all_lines(Device, []).

get_all_lines(Device, Accum) ->
    case io:get_line(Device, "") of
        eof  -> file:close(Device), Accum;
        Line -> get_all_lines(Device, Accum ++ [string:trim(Line)])
    end.

readlines_no_trim(FileName) ->
    {ok, Device} = file:open(FileName, [read]),
    get_all_lines_no_trim(Device, []).

get_all_lines_no_trim(Device, Accum) ->
    case io:get_line(Device, "") of
        eof  -> file:close(Device), Accum;
        Line -> get_all_lines_no_trim(Device, Accum ++ [Line])
    end.

aggregate_list([H|T], Counts) ->
    NewCounts = case dict:is_key(H, Counts) of
        true -> dict:update(H, fun(Value) -> Value + 1 end, Counts);
        false -> dict:store(H, 1, Counts)
        end,
    aggregate_list(T, NewCounts);

aggregate_list([], Counts) -> Counts.

print_list(L) ->
    lists:foreach(fun(X) -> 
        io:format("~p~n", [X])
        end, L).

dedup(L) -> 
    S = sets:from_list(L),
    sets:to_list(S).