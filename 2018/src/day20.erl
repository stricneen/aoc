-module(day20).
-export([run/0]).
-include_lib("stdlib/include/assert.hrl").
% th 4198
% tl 4169
run() ->
    tests(),
    
    Input = hd(aoc:readlines("../data/day20.txt")),
    
    io:format("~nPart 1 : ~p~n", [ calc_dist(Input)]),
    io:format("~nPart 1 : ~p~n", [0]).

calc_dist(Route) ->
    C = lists:filter(fun(X) -> (X =/= 94) and (X =/= 36) end, Route),

    T = lists:foldl(fun(X, { A, [ {D,{PX,PY}} |O] }) ->
        case X of 
            78 ->  { [ {X, D, {PX, PY-1}} ] ++ A, [ {D+1, {PX,PY-1}} | O ] };  % N
            83 ->  { [ {X, D, {PX, PY+1}} ] ++ A, [ {D+1, {PX,PY+1}} | O ] };  % S
            69 ->  { [ {X, D, {PX+1, PY}} ] ++ A, [ {D+1, {PX+1,PY}} | O ] };  % E
            87 ->  { [ {X, D, {PX-1, PY}} ] ++ A, [ {D+1, {PX-1,PY}} | O ] };  % W
      
            40  -> { A, [ {D, {PX,PY}} ] ++ [ {D, {PX,PY}} | O ] };                    % (
            41  -> { A, O };                                    % )
            124 -> { A, [ hd(O) | O ] }                          % |
      
        end
        end, { [], [{1, {0,0}}] }, C),

 io:format("T : ~p~n", [T]),

    Normals = lists:reverse(lists:sort(lists:map(fun({_,D,{X,Y}}) -> {D,{X,Y}} end, element(1, T)))),
    % io:format("Normals : ~p~n", [Normals]),
    longest(Normals).

    
longest([{X,Y}|T]) ->
    case lists:any(fun({_,Y1}) -> Y =:= Y1  end, T) of
        false -> X;
        true -> longest(T)
    end.
    
print(L) ->
    io:format(os:cmd(clear)), % clear screen
    aoc:print(10, 10, "O"),
    lists:foreach(fun({D,{X,Y}}) -> 
        timer:sleep(100),
        aoc:print(X+10, Y+10, "*")
    end, L),
    aoc:print(20,0, "").



tests() -> 
    test({"^WNE$", 3}),
    test({"^ENWWW(NEEE|SSE(EE|N))$", 10}),
    test({"^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$", 18}),
    test({"^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$", 23}),
    test({"^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$", 31}).

test({Route, Dist}) ->
    ?assertEqual(Dist, calc_dist(Route), Route).

