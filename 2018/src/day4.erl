-module(day4).
-export([run/0]).

run() ->

    Input = aoc:readlines("../data/day4.txt"),
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



    {Guard, Mins} = dict:fold(fun(K,V,A) -> 
        {_,M} = A,
        if 
           V > M -> {K,V};
           true -> A
        end
        end, {"",0}, TotalTimes),
    
    
    io:format("Guard ~p slept for ~p mins~n", [Guard,Mins]),

    Sleepy = lists:filter(fun({G,_,_}) -> G == Guard  end, Lines),
    SleepyTimes = lists:map(fun({_,T,_}) -> T end, Sleepy),

    SleepyExpanded = lists:map(fun(L) -> 
        pair(fun(X,Y,A) -> lists:seq(X,Y-1) ++ A end, [], L)
        end, SleepyTimes),
    
    SleepyJoined = lists:flatten(SleepyExpanded),

% io:format("~p~n", [SleepyTimes]),
% io:format("~p~n", [SleepyJoined]),

    SleepyCount = lists:foldl(fun (X, Acc) -> 
        NewCounts = case dict:is_key(X, Acc) of
            true -> dict:update(X, fun(Value) -> Value + 1 end, Acc);
            false -> dict:store(X, 1, Acc)
            end,
        NewCounts
        end, dict:new(), SleepyJoined),
    
    % io:format("~p~n", [SleepyCount]),

    MaxMinute  = dict:fold(fun(K,V,{Curr,Max}) -> 
        if V > Max -> {K,V};
            true -> {Curr,Max}
        end
        
         end, {0,0} , SleepyCount),
    io:format("Max min = ~p~n", [MaxMinute]),

    % Part 2
    
    Exp = lists:map(fun ({G,T,_}) ->
        {G, pair(fun(X,Y,A) -> lists:seq(X,Y-1) ++ A end, [], T)}
        end, Lines),


    AllMins = lists:foldl(fun({G,T}, A) -> 
        NewAcc = case lists:search(fun({Gu,_})  -> Gu == G end, A) of
            {_,{GuardFound,Times}} -> lists:keyreplace(GuardFound, 1, A, {GuardFound, T ++ Times}); %[{G, T ++ Times}] ++ A;
            false -> [{G,T}] ++ A
                end,
        NewAcc
        end, [], Exp),

    CountMins = lists:map(fun({G,T}) -> 
         
        Agg = lists:foldl(fun (X, Acc) -> 
                NewCounts = case dict:is_key(X, Acc) of
                    true -> dict:update(X, fun(Value) -> Value + 1 end, Acc);
                    false -> dict:store(X, 1, Acc)
                    end,
                NewCounts
                end, dict:new(), T),

        Max = dict:fold(fun(K,V,{B,C}) -> 
            R = if V > C -> {K,V};
                true -> {B,C}
            end,
            R
            end, {0,0}, Agg),
        {G,Max}
        end, AllMins),

    print(""),
    io:format("~p~n", [CountMins]),

    Part2 = lists:foldl(fun({G,{M,L}}, {G2,{M2,L2}}) -> 
        R = if L > L2 -> {G,{M,L}};
                true -> {G2,{M2,L2}}
        end,
        R
     end, {"",{0,0}}, CountMins),


    io:format("Part 2 : ~p~n", [Part2])

.





pair(_,A,[]) -> A;

pair(F,A,L) ->
    [X,Y|T] = L,
    A2 = F(X,Y,A),
    pair(F,A2,T).



print(I) ->
    io:format("~p~n", [I]).


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