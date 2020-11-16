-module(day7).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day7.txt"),
    Start = lists:map(fun(X) -> 
         Id = string:tokens(X, " "),
         {lists:nth(2, Id), lists:nth(8, Id)} 
            end, Input),
    
    P1 = next(Start, [], ""),
    io:format("~nPart 1 : ~p~n", [P1]),

    ThreadCount = 5,
    Threads = lists:duplicate(ThreadCount, {free}),

    StartAll = lists:foldl(fun({X,Y}, Acc) -> [{X,Y}] ++ [{Y,"a"}] ++ Acc end, [], Start),

    Time = tick(0, StartAll, Threads),

    io:format("~nPart 2 : ~p~n", [Time])
    %io:format("~p~n", [replace(lists:duplicate(5, {free}), ["R", "E", "A", "C", "H", "X"])])

.

%  c(day7), day7:run().

tick(Second, State, Threads) ->
    io:format("~n"),
    % Remove any state items about to finish
    Finishing = lists:foldl(fun(X,Acc) -> 
        R = case X of
           % {free} -> [];
            {A,1} -> [A];
            _ -> []
        end,
        R ++ Acc      
        end, [], Threads),

    io:format("Threads : ~p~n", [Threads]),
    % io:format("Finishing : ~p~n", [Finishing]),

    NewState = lists:filter(fun({X,_}) -> not lists:any(fun(Y) -> X == Y end, Finishing) end, State),

    % Free any complete threads
    Tick = lists:map(fun(T) -> 
        R = case T of
            {free} -> {free};
            {_,1} -> {free};
            {X,Y} -> {X,Y-1}
        end,
        R
        end, Threads),

    Pre = lists:map(fun({X,_}) -> X end, NewState),
    Pst = lists:map(fun({_,Y}) -> Y end, NewState),

    
    CanStartQueue = lists:sort(aoc:dedup(lists:filter(fun(X) -> not lists:member(X, Pst) end,Pre))),
    % Remove anything currently running


    Running = lists:filter(fun(X) -> not (X == {free}) end, Tick),
    CanStart = lists:filter(fun(X) -> not lists:any(fun({A,_}) -> A == X end, Running) end, CanStartQueue) -- Finishing,

    % io:format("CanStartQueue : ~p~n", [CanStartQueue]),
    % io:format("Running : ~p~n", [Running]),
    % io:format("Can start : ~p~n", [CanStart]),



    Allocated = replace(Tick, CanStart),
    %io:format("~p~n", [Allocated]),

    %Running = lists:filter(fun(X) -> not (X == {free}) end, Allocated),
    %io:format("~p~n", [Running]),

    % NewState = lists:filter(fun({X,_}) -> not lists:any(fun({Y,Z}) -> (X == Y)  end, Running)  end, State),
    % io:format("State : ~p~n", [NewState]),



    R = case lists:all(fun(T) -> T == {free} end, Allocated) of
        true -> Second;
        false -> tick(Second+1, NewState, Allocated)
    end,

    R.


replace(L,[]) -> L;
replace(L1, L2) ->
    [H|T] = L2,
    Replaced = lists:keyreplace(free, 1, L1, {H,((hd(H)-64+60))}),
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

