-module(day16).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day16.txt"),
    % io:format(Input),

    {B,I,A} = lists:foldl(fun(Line, {B,I,A}) -> 
            First = string:nth_lexeme(Line, 1, " "),
            % io:format("~p~n", [First]),
            case First of 
                [] -> {B,I,A};
                "Before:" -> {[Line] ++ B,I,A};
                "After:" -> {B,I,[Line] ++ A};
                _ -> {B,[Line] ++ I,A}
            end
            end, {[],[],[]}, Input),
    
    Before = lists:map(fun(X) ->
        A1 = re:replace(X, "Before: \\[", "", [global,{return,list}]),
        A2 = re:replace(A1, "\\]", "", [global,{return,list}]),
        A3 = string:lexemes(A2, ","),
        A4 = lists:map(fun(Y) -> list_to_integer(string:trim(Y)) end, A3),
        A4
        end, B),

    Instr = lists:map(fun(X) ->
        A1 = string:lexemes(X, " "),
        A2 = lists:map(fun(Y) -> list_to_integer(string:trim(Y)) end, A1),
        A2
        end, I),

    After = lists:map(fun(X) ->
        A1 = re:replace(X, "After:  \\[", "", [global,{return,list}]),
        io:format("~p~n", [A1]),
        A2 = re:replace(A1, "\\]", "", [global,{return,list}]),
        A3 = string:lexemes(A2, ","),
        A4 = lists:map(fun(Y) -> list_to_integer(string:trim(Y)) end, A3),
        A4
        end, A),
    
    Zip = lists:zip3(Before,Instr,After),
% Before: [0, 2, 2, 2]
% 4 2 3 2
% After:  [0, 2, 5, 2]

    % io:format("~nPart 1 : ~p~n", [B]),
    % io:format("~nPart 1 : ~p~n", [I]),

    io:format("~nPart 1 : ~p~n", [Zip]).