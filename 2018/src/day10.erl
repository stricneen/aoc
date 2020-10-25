-module(day10).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day10.txt"),
    
    Parsed = lists:map(fun(X) ->
        [_,X1,Y1,_,X2,Y2] =  string:lexemes(X, "<>, "),
        {list_to_integer(X1),list_to_integer(Y1),list_to_integer(X2),list_to_integer(Y2)}
     end, Input),



    {R,N} = find_text(Parsed, 1000000000,1000000000,0),

    %print(R),

    % io:format("~nPart 1 : ~p~n", [R]),

    
    print_at(0,0, "Part 1"),
    %print_at(0,1, "Part 2 : " ++ [N]),
    io:format("Part 2 : ~p~n", [N])
.


find_text(L, MX, MY, N) ->

    %print(L),
   

   % timer:sleep(400),
    Next = turn(L,1),

    X1 = lists:min(lists:map(fun({X,_,_,_}) -> X end, Next)),
    X2 = lists:max(lists:map(fun({X,_,_,_}) -> X end, Next)),
    Y1 = lists:min(lists:map(fun({_,Y,_,_}) -> Y end, Next)),
    Y2 = lists:max(lists:map(fun({_,Y,_,_}) -> Y end, Next)),

    NX = abs(X1 - X2),
    NY = abs(Y1 - Y2),

    case abs(NX * NY) > abs(MX * MY) of
        true -> {L,N};
        false ->   find_text(Next, NX, NY, N+1)
    end. 



turn(L, C) ->
    lists:map(fun({X,Y,X1,Y1}) -> {X + (X1 * C), Y + (Y1 * C), X1, Y1} end, L).

print(L) ->
    io:format(os:cmd(clear)), % clear screen
    lists:foreach(fun({Y,X,_,_}) -> 
        print_at(X-100, Y-100, "*")
    end, L).
    
print_at(X, Y, T) ->
    io:format("\033[" ++ integer_to_list(X) ++ ";" ++ integer_to_list(Y) ++ "H"),
    io:format(T).   
