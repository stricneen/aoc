-module(day13).
-export([run/0]).


run() ->
    Input = aoc:readlines_no_trim("../data/day.txt"),

    Folder = fun(NLine, Acc) -> 
        Line = lists:nth(NLine, Input),
        Dic = lists:zipwith(fun(X,Y) -> {{Y,NLine}, X} end, Line, lists:seq(1,length(Line))),
        
        NoSp = lists:filter(fun({_,X}) -> X /= 32 end, Dic),
        A = dict:from_list(NoSp),

        dict:merge(fun(X)->X end, Acc,A)
        % lists:foldl(fun(X) -> dict:store({NLine, X}, Acc) end, 0, lists:seq(1, length(Line)))
        
        
        end,

    Grid = lists:foldl(Folder, dict:new(), lists:seq(1, length(Input))),
    
    aoc:clear_screen(),

    dict:fold(
	fun({X,Y}, V, ok) ->
        %io:format("~w - ~w - ~w ~n", [X, Y, V]),
        aoc:print(X,Y,V)
		%io:format("~p: ~p~n", [K, V])
	end, ok, Grid),
    
    io:format("~n~n~nPart 1 : ~p~n", [Grid]).

