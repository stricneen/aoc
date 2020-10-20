-module(day8).
-export([run/0]).
-include_lib("stdlib/include/assert.hrl").

%-record(node, {childCount, metaCount, children, metadata}).


run() ->
    %Input = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2",
    Input = hd(aoc:readlines("../data/day8.txt")),

    L = lists:map(fun(X) -> 
        list_to_integer(X)
        end, string:tokens(Input, " ")),

    % Part 1
    { Root, [] } = parse_node(L),
    io:format("Part 1 : ~p~n", [md_sum(Root)]),

    io:format("Part 2 : ~p~n", [value(Root)])

.

parse_node([ NumChild, NumMeta | Inner]) ->
    Folder = fun(_, {Children, Rest}) ->
        { Child, NextRest } = parse_node(Rest),
        { [Child | Children], NextRest } end,

    { Children, After } = lists:foldr(Folder, {[], Inner}, lists:seq(1, NumChild)),
    {{ lists:reverse(Children), lists:sublist(After, NumMeta) }, lists:nthtail(NumMeta, After) }.

index(Indexes, Children) ->
     lists:flatmap(
        fun(Index) ->
            if 
                Index > length(Children) -> [];
                true -> [lists:nth(Index,Children)]
            end
        end,
        Indexes).

value( {[], Meta} ) -> lists:sum(Meta);
value( {Children, Meta} ) ->
   lists:sum(lists:map(fun(X) -> value(X) end, index(Meta, Children))).

md_sum({ Children, Metadata }) ->
    lists:sum(Metadata) + lists:sum(lists:map(fun(X) -> md_sum(X) end, Children)).