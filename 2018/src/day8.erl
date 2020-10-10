-module(day8).
-export([run/0]).

run() ->
   % Input2 = aoc:readlines("../data/day8.txt"),
    Input = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2",
    L = lists:map(fun(X) -> 
        list_to_integer(X)
        end, string:tokens(Input, " ")),
    io:format("~p~n", [L]),

    % Meta = split(L, 1 ,[]),

    % io:format("~nPart 1 : ~p~n", [Meta])

    Flattened = flatten(L, 0),
    io:format("~nPart 1 : ~p~n", [Flattened])
.

%  Input = "     2 3      0 3    10 11 12   1 1 0 1 99 2     1 1 2"

flatten([], A) -> A;
flatten(L, A) ->

    [ SubCount | [MetaCount | T ] ] = L,

    R = case SubCount of
        0 -> lists:sum(lists:split(MetaCount, T));
        _ -> {Sub, Metadata} = lists:split(length(T) - MetaCount, T), 
             lists:sum(Metadata)  + flatten(Sub, A)
   end,
    
       R + A. 

    
   % io:format("~nPart 1 : ~p ~p ~p ~n", [SubCount,MetaCount,T]),
    
%    flatten(Sub ,  Metadata ++ A )
.

% Node : [2,3,[1,1,2]]
% Node : [0,3,[1,99,2]]

%  Input = "2 3                               1 1 2"
%                0 3 10 11 12 1 1 0 1 99 2

    % Node = [SubCount] ++ [MetaCount] ++ [Metadata],

    % io:format("Node : ~p~n", [Node]),
    
    % flatten(Sub, A).





    

split([], _, M) -> M;
split(L, C, M) -> 

    % C is the number of nodes passed in 

    % Get the header --
    [ SubCount | [MetaCount | T ] ] = L,





    % {Sub, Metadata} = lists:split(length(T) - MetaCount, T), 

    % io:format("Sub = ~p~n", [Sub]),

%   2 3        0 3 10 11 12 1 1 0 1 99 2         1 1 2

%   2 3        1 1 0 1 99 2 0 3 10 11 12         1 1 2

%    [0,3,10,11,12,1,1,0,1,99,2]

    Metadata ++ M.
