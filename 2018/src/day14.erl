-module(day14).
-export([run/0]).

run() ->
    Input = 077201,

    L = [3, 7],
    E1 = 1,
    E2 = 2,
    Receipes = Input,

    A = step(L, E1, E2, Receipes+10),
    
    {_,B} = lists:split(Receipes, A),
    {C,_} = lists:split(10, B),


    io:format("~nPart 1 : ~p~n", [C]).

step(L, E1, E2, Receipes) ->

% io:format("~p~n", [E1]),
% io:format("~p~n", [E2]),
    
    Er1 = lists:nth(E1, L), 
    Er2 = lists:nth(E2, L),

    New = Er1 + Er2,
    Stringed = integer_to_list(New),
    Next = L ++ [list_to_integer([Char]) || Char <- Stringed],

    %io:format("~p~n", [Next]),

    Ne1 = ((E1 + Er1 + 1) rem length(Next)),
    Ne2 = ((E2 + Er2 + 1) rem length(Next)), 

    if length(Next) > Receipes 
        -> Next;
        true -> step(Next, 
            case Ne1 of
                0 -> length(Next);
                _ -> Ne1
            end,
            case Ne2 of
                0 -> length(Next);
                _ -> Ne2
            end,
            Receipes)
    end.
