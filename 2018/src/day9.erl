-module(day9).
-export([run/0]).
-include_lib("stdlib/include/assert.hrl").

run() ->

    % [{0,0}, {1,0} ...

    Score = play(9, 25),

    %?assertEqual(play(9, 25).

    % Players = 431,
    % Last = 70950,
    io:format("~nPart 1 : ~p~n", [Score]).



play(NPlayers, Marbles) ->

    Folder = fun(Marble, {Turn, Players}) ->
        io:format("~p ~p ~p ~n", [Marble, Turn, Players]),
        R = case lists:keyfind(Turn, 1, Players) of
            { Player, Score } -> { (Turn + 1) rem (NPlayers) + 1, lists:keyreplace(Player, 1, Players,{Turn, Score + Marble})  };
            false -> {}
        end,
    R end,

    R = lists:foldl(Folder, { 1, [ {X, 0} || X <- lists:seq(1,NPlayers) ] }, lists:seq(1, Marbles)),

    R.