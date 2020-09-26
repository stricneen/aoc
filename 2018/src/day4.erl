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

        B = case string:trim(Action) of 
            "G" ++ _ -> [{ string:trim(Action), [] }] ++ Acc;
            _        -> [H|T] = Acc,
                        { G1, T1 } = H,
                        [{ G1, T1 ++ [Mins] }] ++ T
        end,
        B
    end, [], Parsed),

    % who sleeps most
    % which minute are they asleep the most

    Lines = lists:map(fun ({X,Y}) -> 
        {X, Y, pair(fun (Start,Finish,Acc) -> Finish - Start + Acc end, 0, Y)}
        end, Time),

    TotalTimes = lists:foldl(fun ({Guard, _, Mins}, Acc) -> 
        NewCounts = case dict:is_key(Guard, Acc) of
            true -> dict:update(Guard, fun(Value) -> Value + Mins end, Acc);
            false -> dict:store(Guard, Mins, Acc)
            end,
        NewCounts
        end, dict:new(), Lines),


    MS = dict:fold(fun(K,V,A) -> 
        {_,M} = A,
        if 
           V > M -> {K,V};
           true -> A
        end
    
        end, {"",0}, TotalTimes),
    

    % MostSleep = dict:fold(fun(K,V,A) -> 
    %         %{C,S} = A,
    %         % R = if V > S -> {K,V};
    %         %     true -> {C,S}
    %         % end,
    %         % R
    %         A
    %     end, {"",0}, TotalTimes),

     io:format("~p~n", [MS]).
     %aoc:print_list(MS).

% ,[5,25,30,55]}


% love this
pair(_,A,[]) -> A;

pair(F,A,L) ->
    [X,Y|T] = L,
    A2 = F(X,Y,A),
    pair(F,A2,T).




    % Times = lists:foldl(fun(X,A) -> A end, [], Time),

% {"[1518-11-19 23:58"," Guard #821 begins shift"}
% {"[1518-11-21 00:03"," Guard #1447 begins shift"}
% {"[1518-11-21 00:24"," falls asleep"}
% {"[1518-11-21 00:27"," wakes up"}
% {"[1518-11-21 00:39"," falls asleep"}

% B : [{"Guard #99 begins shift","-7"},
%      {"Guard #99 begins shift","$."},
%      {"Guard #10 begins shift",[24,29]},
%      {"Guard #99 begins shift","(2"},
%      {"Guard #10 begins shift",[5,25,30,55]}]