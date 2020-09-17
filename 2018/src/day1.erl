-module(day1).
-export([fac/1]).
-export([double/1]).

readlines(FileName) ->
    {ok, Data} = file:read_file(FileName),
    binary:split(Data, [<<"\n">>], [global]).


exe() ->
    readLines("../data/day1.txt"),



double(Num) -> Num * 2.

fac(0) -> 1;

fac(N) -> N * fac(N-1).
