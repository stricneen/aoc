-module(day15).
-export([run/0]).

% # 35  . 46      E 69  G 71

run() ->
    Input = aoc:readlines("../data/day.txt"),

    Folder = fun(NLine, Acc) -> 
        Line = lists:nth(NLine, Input),
        Dic = lists:zipwith(fun(X,Y) -> {{Y,NLine}, X} end, Line, lists:seq(1,length(Line))),
        NoSp = lists:filter(fun({_,X}) -> X /= 32 end, Dic),
        A = dict:from_list(NoSp),
        dict:merge(fun(X)->X end, Acc,A)
        end,
    Grid = lists:foldl(Folder, dict:new(), lists:seq(1, length(Input))),
    
    %Positions = dict:filter(fun(_,V) -> (V==69) or (V==71) end, Grid),
    Board = dict:map(fun(_,V) -> 
        case V of
            69 -> {elf, 200};
            71 -> {gob, 200};
            35 -> {wal, 0};
            46 -> {spc, 0};
            _ -> {} 
        end
        end, Grid),

    % determine move


    io:format("~nPart 1 : ~p~n", [Board]).

    % move
    % attach
