-module(day3).
-export([run/0]).

-record(claim, {id, x, y, w ,h}).

% wrong 99

run() ->
    Input = aoc:readlines("../data/day3.txt"),
    %Input = [lists:nth(1, Input2)],

    % Parse      #3 @ 5,5: 2x2
    Claims = lists:map(fun(X) -> 
         Id = string:split(X, " @ "),
         Parts = string:split(lists:nth(2, Id), ": "),
         Coords = string:split(lists:nth(1, Parts), ","),
         Size = string:split(lists:nth(2, Parts), "x"),
         #claim { 
              id = lists:nth(1, Id),
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

     % Part 1 
     % Points = lists:foldl(fun(C, A) ->
     %      A ++ Decode(C) end, [], Claims),
     % P = lists:foldl(fun (S,A) -> S++A end, [], Points),
     % D = aoc:aggregate_list(P, dict:new()),
     % P1 = dict:filter(fun(_,V)-> V > 1 end, D),
     % io:format("Part 1:  ~p~n ", [length(dict:fetch_keys(P1))]),

     % Part 2 

     Patterns = lists:map(fun(Pat) -> {Pat#claim.id, lists:flatten(Decode(Pat))}end, Claims),
     
%     Unique = find_unique(Patterns),
     Unique = find_uni(Patterns),
     io:format("~p~n", [Unique])
     
     .


find_uni(L) -> 
     
     Comps = lists:map(fun({Id, Pts}) -> 
          Others = lists:delete({Id, Pts}, L),
          
          C = lists:any(fun({_, Points}) -> % F other list
          % io:format("XX ~p", [Points]),
               Matches = lists:map(fun (Cl) -> lists:member(Cl, Pts) end, Points),
               lists:member(true, Matches)
          end, Others),
          {Id, C}
     end  ,L),
     
     Comps
     .



find_unique([H|T]) ->

     {_, Head} = H,
     C = lists:any(fun({_, Points}) -> % F other list
          % io:format("XX ~p", [Points]),
          Matches = lists:map(fun (Cl) -> lists:member(Cl, Head) end, Points),
          lists:member(true, Matches)
     end, T),
     Res = case C of
          true -> find_unique(T);
          false -> H
     end,
     Res.


% th 114671
     