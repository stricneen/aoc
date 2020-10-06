-module(day7).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day.txt"),
    Start = lists:map(fun(X) -> 
         Id = string:tokens(X, " "),
         {lists:nth(2, Id), lists:nth(8, Id)} 
            end, Input),
    
     P1 = next(Start, [], ""),
    io:format("~nPart 1 : ~p~n", [P1]),

   
    % Part 2
    % Pre = lists:map(fun({X,_}) -> X end, Start),
    % Pst = lists:map(fun({_,Y}) -> Y end, Start),
    % Can = lists:sort(aoc:dedup(lists:filter(fun(X) -> not lists:member(X, Pst) end,Pre))),
    % Remaining = lists:map(fun(X) -> {X, hd(X) - 64} end, Can),

    ThreadCount = 2,
    Threads = lists:duplicate(ThreadCount, {free}),
    Time = tick(0, Start, Threads),
    io:format("~nPart 2 : ~p~n", [Time]),


    io:format("~p~n", [replace(lists:duplicate(5, {free}), ["R", "E", "A", "C", "H", "X"])])



.


tick(Second, State, Threads) ->

    % Free any complete threads
    Free = lists:map(fun(T) -> 
        R = case T of
            {free} -> {free};
            {_,1} -> {free};
            X -> X
        end,
        R
        end, Threads),

    
    Pre = lists:map(fun({X,_}) -> X end, State),
    Pst = lists:map(fun({_,Y}) -> Y end, State),
    CanStart = lists:sort(aoc:dedup(lists:filter(fun(X) -> not lists:member(X, Pst) end,Pre))),
    
    io:format("~p~n", [Free]),
    io:format("~p~n", [CanStart]),

    % Allocate jobs
    % NextThreads = lists:foldl(fun(Thread, CS) -> 
    %     [H|T] = CS,
    %     R = case T of
    %         {free} when length(CS) > 0 -> {H, (H - 64)};
    %         X -> X
    %     end,
    %     R
    %     end, CanStart, Free),

    Bob = replace(Free, CanStart),


    Bob.

% assign(Threads, Jobs) ->
    
%     case Jobs of
%         [] -> Threads
%         [H|T] -> case lists:any(fun(X) -> X == {free})

    % Next = case FreeThread and (length(CanStart) > 0) of

    %     true -> State;



    %     % tick down running
    %     false -> lists:map(fun(Thread) -> 
    %         X = case Thread of
    %             {free} -> {free};
    %             {_,1} -> {free};
    %             {T,C} -> {T,C-1}
    %         end,
    %         X end, State)
    % end,


replace(L,[]) -> L;
% [free,free]
% ["C"]
replace(L1, L2) ->
    [H|T] = L2,

  %  Tuples = lists:map(fun(X) -> {X} end,L1),
    Replaced = lists:keyreplace(free, 1, L1, {H,((hd(H)-64))}),
    replace(Replaced, T).

    





next([], _, C) -> C;
next([{A,B}], _, C) -> C ++ A ++ B; 
next(Actions, Done, P1) ->
    Pre = lists:map(fun({X,_}) -> X end, Actions),
    Pst = lists:map(fun({_,Y}) -> Y end, Actions),
    Can = lists:sort(aoc:dedup(lists:filter(fun(X) -> not lists:member(X, Pst) end,Pre))),
    Next = hd(Can),
    Action2 = lists:filter(fun({S,_}) -> S /= Next end, Actions),
    next(Action2, [Next] ++ Done, P1 ++ Next).

