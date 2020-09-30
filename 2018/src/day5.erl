-module(day5).
-export([run/0]).



run() ->
    Input = lists:nth(1, aoc:readlines("../data/day5.txt")),
   % Input = "dabAcCaCBAcCcaDA",
   % Input = "dabCBAcaDA",    

    L1 = [ [X] || X <- lists:seq(65,90)] ,
    L2 = [ [X] || X <- lists:seq(97,122)] ,
    Lc = lists:zip(L1,L2),

    K = re:replace(re:replace(Input, "K", "", [global, {return,list}]), "k", "", [global,{return,list}]),
    KK = react(K),
    io:format("Part 1mmm : ~p~n", [KK])

    % io:format("Part 1 : ~p~n", [Lc]),

    % Answers = lists:map(fun ({X,Y}) -> 
    %     Contracted = re:replace(re:replace(Input, X, "", [global, {return,list}]), Y, "", [global,{return,list}]),
    %     Ins = react(Contracted),
    %     io:format("~p ~n", [length(Ins)]),
    %     {X,Y,length(Ins)}
    %     end, Lc),

    % io:format("Part 2 : ~p~n", [lists:sort(Answers)])
    .

% 6396

react(Polymer) ->
    Index = find_reaction(Polymer, 0),
    R = if Index == none -> Polymer;
        true -> split(Polymer, Index)
     end,
    R.

split(Polymer, Index) ->
    % 3io:format("~p~n", [Polymer]),
    After = lists:sublist(Polymer, Index) ++ lists:sublist(Polymer, Index + 3, length(Polymer)),
    R = if Polymer == After -> After;   
        true -> react(After)
    end,
    R.
        
find_reaction([], _) -> [];
find_reaction([_,_], []) -> none;
find_reaction(Polymer, I) ->
    [A,B|T] = Polymer,
    R = if 
        abs(A - B) == 32 -> I;
        true -> find_reaction([B] ++ T, I + 1)
    end,
    R.
    
% A-Z   65 - 90
% a-z   97 - 122
% Pr = [ [X,X+32] || X <- lists:seq(65,90) ]. 


