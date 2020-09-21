-module(day3).
-export([run/0]).

-record(claim, {x, y, w ,h}).

run() ->
    Input = aoc:readlines("../data/day3.txt"),
    %Input = [lists:nth(1, Input2)],

    % Parse
    Claims = lists:map(fun(X) -> 
         Id = string:split(X, " @ "),
         Parts = string:split(lists:nth(2, Id), ": "),
         Coords = string:split(lists:nth(1, Parts), ","),
         Size = string:split(lists:nth(2, Parts), "x"),
         #claim { 
              x = list_to_integer(lists:nth(1, Coords)),
              y = list_to_integer(lists:nth(2, Coords)),
              w = list_to_integer(lists:nth(1, Size)),
              h = list_to_integer(lists:nth(2, Size)) }
         end, Input),

     % Claim to points
     Decode = fun(Clm) -> % returns eg [(3,4), (3,5)]
          Rows = lists:seq(Clm#claim.x, Clm#claim.x + Clm#claim.w - 1),
          Cols = lists:seq(Clm#claim.y, Clm#claim.y + Clm#claim.h - 1),

          Res = lists:map(fun (Rs) -> 
               Columns = lists:map(fun (Cs) ->
                    {Rs, Cs}
               end, Cols),
               Columns end, Rows),
          Res end,

     Points = lists:foldl(fun(C, A) ->
          A ++ Decode(C) end, [], Claims),

     % io:format("~p", [Points]),

     P = lists:foldl(fun (S,A) -> S++A end, [], Points),
     D = aoc:aggregate_list(P, dict:new()),

     P1 = dict:filter(fun(_,V)-> V > 1 end, D),

     io:format("Part 1:  ~p~n ", [length(dict:fetch_keys(P1))]).


% th 114671
     