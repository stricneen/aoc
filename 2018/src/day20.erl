-module(day20).
-export([run/0]).
-include_lib("stdlib/include/assert.hrl").
% th 4198
% tl 4169
run() ->
    tests(),
    
    Input = hd(aoc:readlines("../data/day20.txt")),
    P1 = calc_dist(Input),
    io:format("~nPart 1 : ~p~n", [P1]).

calc_dist(Route) ->
    C = lists:filter(fun(X) -> (X =/= 94) and (X =/= 36) end, Route),
    T = lists:foldl(fun(X, { A, [D|O] }) ->
        case X of 
            78 ->  { [ {X, D, {0,  1}} ] ++ A, [ D + 1 | O ] };  % N
            83 ->  { [ {X, D, {0, -1}} ] ++ A, [ D + 1 | O ] };  % S
            69 ->  { [ {X, D, {1,  0}} ] ++ A, [ D + 1 | O ] };  % E
            87 ->  { [ {X, D, {-1, 0}} ] ++ A, [ D + 1 | O ] };  % W
            40  -> { A, [ D ] ++ [ D | O ] };     % (
            41  -> { A,  O  };     % )
            124 -> { A, [ hd(O) | O ] }    % |
        end
        end, {[], [1]}, C),

    
    Path1 = lists:foldl(fun({_,_,{X,Y}},A) -> 
        {I,J} = hd(A),
        [{ I+X, J+Y }] ++ A
        end, [{0,0}], lists:reverse(element(1, T))),

    DropOrigin = lists:reverse(tl(lists:reverse(Path1))),
    
    % io:format("Path1 : ~p~n", [ Path1 ]),
    
    Path = lists:zip(DropOrigin, element(1, T)),

    io:format("Path : ~p~n", [Path]),

    Dists = lists:foldl(fun({{I,J},{_,X,_}},A) ->
        [{{I,J},X}] ++ A 
    end, [], Path),

    % io:format("Dists : ~p~n", [Dists]),




    Normals = lists:reverse(lists:sort(lists:map(fun({X,Y}) -> {Y,X} end, Dists))),     
       
    io:format("~p~n", [lists:filter(fun({Y,_}) -> Y >= 4168 end, Normals)]),
    % io:format("~nNormals : ~p~n", [Normals]),
    % 4184

  io:format("~p~n", [lists:filter(fun({_,Y}) -> Y =:= {16,49} end, Normals)]),
  

    longest(Normals).
    
longest([{X,Y}|T]) ->
    case lists:any(fun({_,Y1}) -> Y =:= Y1  end, T) of
        false -> X;
        true -> longest(T)
    end.

    



tests() -> 
    test({"^WNE$", 3}),
    test({"^ENWWW(NEEE|SSE(EE|N))$", 10}),
    test({"^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$", 18}),
    test({"^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$", 23}),
    test({"^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$", 31}).

test({Route, Dist}) ->
    ?assertEqual(Dist, calc_dist(Route), Route).

