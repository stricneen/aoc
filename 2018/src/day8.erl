-module(day8).
-export([run/0]).
-include_lib("stdlib/include/assert.hrl").

%-record(node, {childCount, metaCount, children, metadata}).


run() ->
    % Input2 = hd(aoc:readlines("../data/day8.txt")),
    Input = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2",
    L = lists:map(fun(X) -> 
        list_to_integer(X)
        end, string:tokens(Input, " ")),

    io:format("In  : ~p~n", [L]),

    % Part 1
    Remaing = rev(L, 0),
    io:format("Part 1 : ~p~n", [Remaing]),

    % X = trav(L, 1),

   
    % ?assertEqual([0, 3, 10, 11, 12], first_node([0, 3, 10, 11, 12], 0, 0)),
    % ?assertEqual([0, 3, 10, 11, 12], first_node([0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2], 0, 0)),
    % ?assertEqual([1, 1, 0, 1, 99, 2], first_node([1, 1, 0, 1, 99, 2, 0, 3, 10, 11, 12], 0, 0)),



    X = first_node(L, 0, 0),
    io:format("All : ~p~n", [X])
.




parse_node(L) ->

    Folder = fun(_, {Children, Rest}) ->
        { Child, NextRest } = parse_node(Rest),
        { [Child | Children], NextRest } end,

    [NumChild, NumMeta, Inner] = L,
    { Children, After } = lists:foldr(Folder, { [], Inner}, lists:seq(1, NumChild)),
    {{ Children, lists:sublist(After, NumMeta) }, lists:nthtail(NumMeta, After) }.






% In  : [2,3,0,3,10,11,12,1,1,0,1,99,2,1,1,2]
% All : [2,3,0,3,10,11,12,1,1,0,1,99,  1,1,2]



%      1 , 1 , 0 , 1 , 99 , 2 , 0 , 3 , 10 , 11 , 12


%   1,1,      0,1,99,    2

first_node([], _,  _) -> [];

first_node(L, Depth, MetaCarry) ->

    [ NumChildren | [ NumMeta | T ] ] = L,
  
  
    { Children, Meta } = lists:split(length(L) - NumMeta, L),
  
  
    %{ Meta, Children } = lists:split(NumMeta, T),
    
    R = case NumChildren of
        0 -> [NumChildren] ++ [NumMeta] ++ element(1, lists:split(NumMeta, T));
        _ -> [NumChildren] ++ [NumMeta] ++ first_node(T, NumChildren - 1, NumMeta)
        end,
    
    case Depth of
        0 -> R ++ element(1, lists:split(MetaCarry, Meta));
        _ -> Remain = element(2, lists:split(length(R), Children)),
             R  ++ first_node(Remain, Depth - 1, 0) ++ Meta
    end.







%     c(day8), day8:run().

% trav(L, C) ->
%     [ NumChildren | [ NumMeta | T ] ] = L,
%     { Children, Meta } = lists:split(length(T) - NumMeta, T),

%     X = split(Children, NumChildren),

%     % io:format("Start : ~p ~p~n", [NumChildren, NumMeta]),
%     % io:format("Child : ~p ~n", [Children]),
%     % io:format("Meta  : ~p ~n~n", [Meta]),

%     % R = case NumChildren of 
%     %     0 -> [Meta];
%     %     _ -> trav(Children, NumChildren)
%     % end,
%     % R.
%     0.

% split(L, C) ->
%     F = first_node(L),
%     io:format("Meta  : ~p ~p~n", [L,C]),
%     0.


%    1 1 0 1 99 2









rev([], Acc) -> Acc;
rev(L,Acc) ->
    {R,A} = remove_first([], L),
    %io:format(" : ~p~n", [{R,A,Acc}]),
    Ret = case {R,A} of
        {0,0} -> Acc;
        _ -> rev(R, Acc + A)
    end,
    Ret.

%  Input = "     2 3     0 3  10 11 12     1 1   0 1 99   2     1 1 2"
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







% "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2",
% tree(I, [H|T]) when is_list(H) -> H ++ tree(I, T);
% tree(I, L) ->
% io:format("~p ~n", [L]),
%     Level = lists:any(fun(X) -> X == I end, L),
%     Add = if Level ->
%             [ChildrenCount | [MetaCount|T]] = L,
%             % [2,3,  [0,3,10,11,12], 1,1,[0,1,99],2,   1,1,2]
%             % [2,3,  [0,3,10,11,12] , [1,1,[0,1,99],2] ,1,1,2]
%             Next = case ChildrenCount of 
%                 I -> 

%                     {Children, Remain} = lists:split(ChildrenCount, T),
%                     io:format("Children : ~p ~n", [Children]),
%                     AllLists = lists:all(fun(X) -> is_list(X) end, Children),
%                      {_,R} = lists:split(MetaCount, Remain),         
%                    Bob = if AllLists ->
%                             [[ChildrenCount] ++ [MetaCount] ++ [Children] 
%                                 ++ lists:sublist(T, MetaCount)] ++ tree(I, R);
%                         true ->
%                             [[ChildrenCount] ++ [MetaCount] ++ Children 
%                                 ++ lists:sublist(T, MetaCount)] ++ tree(I, R)
%                     end,
%                     Bob;
%                     %io:format("~p ~p~n", [Children, Remain]),
%                 _ -> [ChildrenCount] ++ [MetaCount] ++ tree(I, T)
%             end,
%             Next;

%         true -> L
%         end,
%    Add.
