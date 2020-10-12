-module(day8).
-export([run/0]).
%-record(node, {childCount, metaCount, children, metadata}).


run() ->
    Input2 = hd(aoc:readlines("../data/day8.txt")),
    Input = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2",
    L = lists:map(fun(X) -> 
        list_to_integer(X)
        end, string:tokens(Input, " ")),

    %Part 1
    Remaing = rev(L, 0),
    io:format("Part 1 : ~p~n", [Remaing]),

    Tree = tree(0, L),
    io:format("Part 2 : ~w~n", [Tree]),

    Tree2 = tree(1, Tree),
    io:format("Part 2 : ~w~n", [Tree2])
%     c(day8), day8:run().
.

% "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2",
tree(I, [H|T]) when is_list(H) -> H ++ tree(I, T);
tree(I, L) ->
io:format("~p ~n", [L]),
    Zeros = lists:any(fun(X) -> X == I end, L),
    Add = if Zeros ->
            [ChildrenCount | [MetaCount|T]] = L,
            % io:format("~p~n", [ChildrenCount]),

            % {Children, Remain} = lists:split(ChildrenCount, T),
            % io:format("~p~n", [Remain]),

   % [2,3,  [0,3,10,11,12] , [1,1,[0,1,99],2] ,1,1,2]

            Next = case ChildrenCount of 
                I -> 
                    {Children, Remain} = lists:split(ChildrenCount, T),
                    io:format("~p ~p~n", [Children, Remain]),

                    {_,R} = lists:split(MetaCount, Remain), 
                     
                    [[ChildrenCount] ++ [MetaCount] ++ Children ++ lists:sublist(T, MetaCount)] ++ tree(I, R);
             
             
             
                _ -> [ChildrenCount] ++ [MetaCount] ++ tree(I, T)
            end,
            Next;

        true -> L
        end,
   Add.

    %io:format("~w~n", [L]),

   

   

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