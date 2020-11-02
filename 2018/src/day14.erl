-module(day14).
-export([run/0]).

run() ->
    Input = 077201,

    L = [3 , 7 , 1 , 0 ,1, 0, 1],
    E1 = 1,
    E2 = 3,
    Receipes = [0,7,7,2,0,1],
    %Receipes = [5,9,4],
   
% 51589 first appears after 9 recipes.
% 01245 first appears after 5 recipes.
% 92510 first appears after 18 recipes.
% 59414 first appears after 2018 recipes.

    A = step(lists:reverse(L), E1, E2, lists:reverse(Receipes),0),
    
    % {_,B} = lists:split(Receipes, A),
    % {C,_} = lists:split(10, B),


    io:format("~nPart 2 : ~p~n", [A]).

step(L, E1, E2, Receipes,C) ->

    Er1 = lists:nth(E1 , L), 
    Er2 = lists:nth(E2 , L),

    % io:format("~p ~p~n",[E1, E2]),
    % io:format("~p ~p~n",[Er1, Er2]),

    New = Er2 + Er1,
    Stringed = lists:reverse(integer_to_list(New)),
    Next = [list_to_integer([Char]) || Char <- Stringed] ++ L,

% io:format("~p~n", [lists:reverse(Next)]),

    Ne1 = mk_p((E1 - Er1+ length(Stringed) - 1), length(Next)  ) ,
    Ne2 = mk_p((E2 - Er2+ length(Stringed) - 1), length(Next) ) ,
   % Last1 = lists:nthtail(length(Next)-6, Next),

% io:format("~p~n", [Last1]),
% io:format("~p~n", [Last2]),

% c(day14), day14:run().

    % case length(Next) > 20 of
    %     true -> Next;
    %     false -> step(Next, 
    %                 Ne1 ,
    %                 Ne2 ,
    %                 Receipes,C+1)
    %     end.


    case (lists:prefix(Receipes, L)) of
        true -> length(L) - length(Receipes);

             false -> step(Next, 
                    Ne1 ,
                    Ne2 ,
                    Receipes,C+1)
    end.


mk_p(V, A) ->
    if V < 1 -> V + A; true -> V end.