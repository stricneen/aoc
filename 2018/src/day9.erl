-module(day9).
-export([run/0]).
-export([play/2]).

-include_lib("stdlib/include/assert.hrl").

run() ->

    % ?assertEqual(32, play(9, 25)),
  %   ?assertEqual(8317, play(10, 1618)),  
    %  ?assertEqual(146373, play(13, 7999)),



    io:format("~nPart 1 : ~p~n", [play(9, 4000)]).
%    io:format("~nPart 1 : ~p~n", [play(431, 70950)]).
   % io:format("~nPart 2 : ~p~n", [play(431, 7095000)]).

play(NPlayers, Marbles) ->

    %Cut = (Marbles + 1) / NPlayers,

    Folder = fun(Marble, {Turn, State, Players}) ->
        
       
        R = case lists:keyfind(Turn, 1, Players) of
            { Player, Score } -> Next = case Turn of NPlayers -> 1; _ -> Turn + 1 end,
                                 { NextState, S } = move(State, Marble),
                                 { Next, NextState, lists:keyreplace(Player, 1, Players,{Turn, S + Score})  };
            false -> {}
        end,
    R end,

    {_,_,A} = lists:foldl(Folder, { 1, [0], [ {X, 0} || X <- lists:seq(1,NPlayers) ] }, lists:seq(1, Marbles)),
    lists:max(lists:map(fun(X) -> element(2, X) end, A))
    .

move([L], Turn) -> {[Turn] ++ [L], 0};
move(L, Turn) ->
   io:format("~p~n",[hd(L)]),
    case Turn rem 23 of
        0 -> {H,[ExtraScore|U]} = lists:split(length(L)-7, L),
            % {_,A} = lists:split(length(A) - , U++H),
             io:format("~p~n",[ExtraScore]),
            A = U ++ H,
             {A, Turn + ExtraScore};
        _ -> [H,G|T] = L,
             {[Turn] ++ T ++ [H] ++ [G], 0}
    end.
  