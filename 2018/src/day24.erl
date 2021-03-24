-module(day24).
-export([run/0]).


run() ->
    % Input = aoc:readlines("../data/day.txt"),
    % io:format(Input),

    {A,B} = armies(),
io:format("~p~n", [A]),
    {_, GroupA} = A,
    {_, GroupB} = B,

    cycle(GroupA),
    cycle(GroupB),
    

    io:format("~nPart 1 : ~p~n", [0]).

cycle([]) -> none;
cycle(L) -> 
    [{Units, Hitpoints, Immune, Weaknesses, Attack, AttackType, Initiative}|T] = L,
    io:format(" >  ~p~n", [{Units, Hitpoints, Immune, Weaknesses, Attack, AttackType, Initiative}]),
    cycle(T).



armies() ->
% Immune System:


    {{immune, [
{1514 , 8968 , [], [cold] , 57 ,bludgeoning , 9},
{2721 , 6691 , [], [cold]  , 22, slashing , 15},
{1214 , 10379 , [bludgeoning],[] , 69 ,fire , 16},
{2870 , 4212 ,[],[], 11, radiation , 12},
{1239 , 5405 , [], [cold] , 37, cold , 18},
{4509 , 4004 , [radiation], [cold], 8 ,slashing , 20},
{3369 , 10672 , [], [slashing]  , 29, cold , 11},
{2890 , 11418 , [bludgeoning], [fire] , 30 ,cold , 8},
{ 149 , 7022 , [], [slashing] , 393, radiation , 13},
{2080 , 5786 , [slashing, bludgeoning], [fire], 20 ,fire , 7}
        ]}, 
    

    {infection,[
{ 817 , 47082 , [slashing, radiation, bludgeoning],[] , 115, cold , 3},
{ 4183 , 35892 ,[],[] , 16 ,bludgeoning , 1},
{ 7006 , 11084 ,[],[], 2, fire , 2},
{ 4804 , 25411 ,[],[], 10 ,cold , 14},
{ 6262 , 28952 , [], [fire] , 7, slashing , 10},
{ 628 , 32906 ,[],[slashing] , 99 ,radiation , 4},
{ 5239 , 46047 , [fire],[] , 14, bludgeoning , 6},
{ 1173 , 32300 , [], [cold, slashing], 53 ,bludgeoning , 19},
{ 3712 , 12148 , [cold], [slashing] , 5 ,slashing , 17},
{ 334 , 43582 , [], [cold, fire] , 260, cold , 5}
        ]}}.