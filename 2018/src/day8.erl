-module(day8).
-export([run/0]).
-record(node, {childCount, metaCount, children, metadata}).


run() ->
    Input2 = hd(aoc:readlines("../data/day8.txt")),
    Input = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2",
    L = lists:map(fun(X) -> 
        list_to_integer(X)
        end, string:tokens(Input2, " ")),
    %io:format("~p~n", [L]),

    %Part 1
    Remaing = rev(L, 0),
    io:format("~nPart 1 : ~p~n", [Remaing])





    % Tree = tree(L),
    % io:format("Part 2 : ~p~n", [Tree])
.


% "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2",

% tree(L) ->

%     io:format("~p~n", [L]),

%     [ChildrenCount | [MetaCount|T]] = L,

%     Add = case ChildrenCount of 
%         0 -> lists:sublist(MetaCount, T);
        
%     end,

%     Add.

   

    % #node{childCount=ChildrenCount, 
    %     metaCount=MetaCount, 
    %     children = tree(ChildrenCount, Children),
    %     metadata = Meta}.









rev([], Acc) -> Acc;
rev(L,Acc) ->
    {R,A} = remove_first([], L),
    %io:format(" : ~p~n", [{R,A,Acc}]),
    Ret = case {R,A} of
        {0,0} -> Acc;
        _ -> rev(R, Acc + A)
    end,
    Ret.

%  Input = "     2 3      0 3    10 11 12   1 1 0 1 99 2     1 1 2"
remove_first([], 0) ->  0;
remove_first(_, [0,[]]) -> {0,0};
remove_first(H, L) ->
   % io:format(" ~p : ~p~n", [H, L]),
    [Children|[MetaCount|T]] = L,
    Re = case Children of
        0 -> {Metadata, R} =  lists:split(MetaCount, T),
             {X,[P,C]} = case length(H) of
                0 -> {[],[1,[]]};
                _ -> lists:split(length(H)-2, H)
            end,
            {X ++ [P-1] ++ [C] ++ R, lists:sum(Metadata)};
        _ -> remove_first(H ++ [Children] ++ [MetaCount], T)
    end,
    Re.

% c(day8), day8:run().