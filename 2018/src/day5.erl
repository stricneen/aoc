-module(day5).
-export([run/0]).



run() ->
    Input = lists:nth(1, aoc:readlines("../data/day5.txt")),
   % Input = "dabAcCaCBAcCcaDA",
   % Input = "dabCBAcaDA",
    

    P1 = react(Input),
   % io:format("Part 1 : ~p~n", [P1]),

    io:format("Part 1 : ~p~n", [length(P1)]).



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
find_reaction([_,_], _) -> none;
find_reaction(Polymer, I) ->
    [A,B|T] = Polymer,
    R = if 
        abs(A - B) == 32 -> I;
        true -> find_reaction([B] ++ T, I + 1)
    end,
    R.
    
