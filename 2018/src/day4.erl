-module(day4).
-export([run/0]).

run() ->

    Input = aoc:readlines("../data/day.txt"),
    SortedInput = lists:sort(Input),
    Parsed = lists:map(fun (X) -> 
        [Time, Event] = string:lexemes(X, "]"),
        [D,T] = string:lexemes(Time, " "),
        [_,S] = string:lexemes(T, ":"),
        {D, list_to_integer(S), Event}
        end, SortedInput),

    Time = lists:foldl(fun({_,Mins,Action}, Acc) -> 

        io:format("Mins : ~p~n", [Mins]),

        B = case string:trim(Action) of 
            "G" ++ _ -> [{ string:trim(Action), [] }] ++ Acc;
            _        -> [H|T] = Acc,
                        { G1, T1 } = H,
                        [{ G1, T1 ++ [Mins] }] ++ T
        end,

      %  io:format((" ~p  ~p~n"),[Mins],[Action]),
        io:format("B : ~p~n", [B]),

        io:format("~n"),

        B


        %io:format("~p~n", [Acc]),
        % B = case string:trim(Action) of 
        %     "G" ++ _ -> { string:trim(Action), [] };
        %     _        -> [H|_] = Acc,
        %                 { G, T } = H,
        %                 { G, T ++ [Mins] }
        % end,

%      Acc : [{"Guard #10 begins shift",[5,25,30,55]}]

        % A = case Acc of
        %     []  -> [B];
        %     %[C] -> [C] ++ Acc;
        %      _  -> [_|Ta] = Acc,
        %             [B] ++ Ta
        %     end,



    end, [], Parsed),

    aoc:print_list(Time).


    % Times = lists:foldl(fun(X,A) -> A end, [], Time),

% {"[1518-11-19 23:58"," Guard #821 begins shift"}
% {"[1518-11-21 00:03"," Guard #1447 begins shift"}
% {"[1518-11-21 00:24"," falls asleep"}
% {"[1518-11-21 00:27"," wakes up"}
% {"[1518-11-21 00:39"," falls asleep"}