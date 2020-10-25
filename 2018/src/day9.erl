-module(day9).
-export([run/0]).
-export([play/2]).

-include_lib("stdlib/include/assert.hrl").

run() ->

    % ?assertEqual(32, play(9, 25)),
    % ?assertEqual(8317, play(10, 1618)),  
    % ?assertEqual(146373, play(13, 7999)),

    io:format("~nPart 1 : ~p~n", [play(431, 70950)]),
    io:format("~nPart 2 : ~p~n", [play(431, 7095000)]).

play(NPlayers, Marbles) ->

    Folder = fun(Marble, {Turn, State, Players}) ->
        R = case lists:keyfind(Turn, 1, Players) of
            { Player, Score } -> Next = case Turn of NPlayers -> 1; _ -> Turn + 1 end,
                                 { NextState, S } = move(State, Marble),
                                 { Next, NextState, lists:keyreplace(Player, 1, Players,{Turn, S + Score})  };
            false -> {}
        end,
    R end,

    Iq = queue:new(),
    {_,_,A} = lists:foldl(Folder, { 1, queue:in(0,Iq), [ {X, 0} || X <- lists:seq(1,NPlayers) ] }, lists:seq(1, Marbles)),
    lists:max(lists:map(fun(X) -> element(2, X) end, A))
    .

move(Q, Turn) ->
    case Turn rem 23 of
        0 -> 
            Q1 = cycle(Q, 7),
            {{_,ExtraScore},R} = queue:out_r(Q1),
            {R, Turn + ExtraScore};
        _ -> R = cycle(Q, -2),
             {queue:in(Turn, R), 0}
    end.
  
cycle(Q, N) ->
    case N of
        N when N > 0 -> {{_,O1}, Q1} = queue:out(Q), cycle(queue:in(O1, Q1), N-1);
        N when N < 0 -> {{_,O1}, Q1} = queue:out_r(Q), cycle(queue:in_r(O1, Q1), N+1);
        _ -> Q
    end.