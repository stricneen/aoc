-module(day24).
% -compile([{nowarn_unused_function, [{ armies,0 }]}]).
-export([run/0]).

-record(army, {side, units, hitPoints, immune, weaknesses, attack, attackType, initiative}).

run() ->
    {A,B} = test_armies(),
    % io:format("~nPart 1 : ~p~n", [B]),
    {_, GroupA} = A, {_, GroupB} = B,
    print(GroupA), print(GroupB),
    
    fight(GroupA, GroupB),

    io:format("~nPart 1 : ~p~n", [0]).

fight(A,B) ->


    % io:format("~nAttackOrder : ~p~n", [AttackOrder]),
    
    Pairs = target(A ++ B),
    io:format("~n PC : ~p~n", [Pairs]),
    % Round = attack(Pairs, []),
    % io:format("~n Round : ~p~n", [Round]),

    0.


attack([], X) -> X;
attack([{_, Attacker, {Amount, Defender}} | T ], R) ->

       
        % 80 units with 20 hitPoints
        % attacks 70 - 
        % 70 div 20 = 3

        Z = Amount div Defender#army.hitPoints,
        
        % 3 * 20 = 60


        X = to_record(Defender#army.side, {
            Defender#army.units - Z, 
            Defender#army.hitPoints, 
            Defender#army.immune, 
            Defender#army.weaknesses, 
            Defender#army.attack, 
            Defender#army.attackType, 
            Defender#army.initiative}),

        
    attack(T, R ++ [X]).


target(Groups) ->

    TargetOrder = sort_for_targetting(Groups),

    PairUp = lists:foldl(fun(Attacker, Pairs) ->

        io:format("~nAttacker : ~p~n", [Attacker]),
        io:format("~n  Pairs : ~p~n", [Pairs]),

        % on opposing side and not immue
        % and not already paired 
        Targetted = lists:map(fun({Attacker, {_, Defender}}) -> Defender#army.initiative end, Pairs),

        ValidTargets = lists:filter(fun (D) -> 
            (Attacker#army.side =/= D#army.side)   
            and not lists:member(D#army.initiative, Targetted)         
        end, TargetOrder),

        % most damage - largest eff pow - largest inititive

        io:format("~n  ValidTargets : ~p~n", [ValidTargets]),

        Damage = lists:reverse(lists:sort(lists:map(fun(D) -> 
            WeakMultiplier = case lists:member(Attacker#army.attackType ,D#army.weaknesses) of
                true -> 2;
                false -> 1
            end,
            ImmuneMultiplier = case lists:member(Attacker#army.attackType ,D#army.immune) of
                true -> 0;
                false -> 1
            end,

            {WeakMultiplier * ImmuneMultiplier * Attacker#army.units * Attacker#army.attack, D}
        end, ValidTargets))),

        [{Attacker, targetted(lists:filter(fun({A,_}) -> A > 0 end, Damage))}] ++ Pairs

        end, [], TargetOrder),


    lists:map(fun({A,{_,B}}) -> {A,B} end, PairUp).


targetted([]) -> none;
targetted([H|_]) -> H.



sort_for_targetting(Groups) ->
    TargetOrder = lists:reverse(lists:sort(lists:map(fun(Group) -> 
        {Group#army.units * Group#army.attack, Group#army.initiative, Group} end, Groups))),

    io:format("~n TargetOrder : ~p~n", [TargetOrder]),
    lists:map(fun({_,_,A}) -> A end, TargetOrder).








print([]) -> io:format("~n"), none;
print(L) -> 
    [Army|T] = L,
    % io:format(" >  ~p~n", [{Units, Hitpoints, Immune, Weaknesses, Attack, AttackType, Initiative}]),
    io:format("Group has ~p units ~n", [ Army#army.units ]),
    print(T).

convert({T, L}) ->
    {T, lists:map(fun(E) -> to_record(T,E) end, L)}.

to_record(T, {Units, Hitpoints, Immune, Weaknesses, Attack, AttackType, Initiative}) ->
    #army{side = T,
        units = Units,
        hitPoints = Hitpoints,
        immune = Immune,
        weaknesses = Weaknesses,
        attack = Attack,
        attackType = AttackType,
        initiative = Initiative }.

% armies() ->
%     {convert({immune, [
%         {1514 , 8968 , [], [cold] , 57 ,bludgeoning , 9},
%         {2721 , 6691 , [], [cold]  , 22, slashing , 15},
%         {1214 , 10379 , [bludgeoning],[] , 69 ,fire , 16},
%         {2870 , 4212 ,[],[], 11, radiation , 12},
%         {1239 , 5405 , [], [cold] , 37, cold , 18},
%         {4509 , 4004 , [radiation], [cold], 8 ,slashing , 20},
%         {3369 , 10672 , [], [slashing]  , 29, cold , 11},
%         {2890 , 11418 , [bludgeoning], [fire] , 30 ,cold , 8},
%         { 149 , 7022 , [], [slashing] , 393, radiation , 13},
%         {2080 , 5786 , [slashing, bludgeoning], [fire], 20 ,fire , 7}
%         ]}), 
%     convert({infection,[
%         { 817 , 47082 , [slashing, radiation, bludgeoning],[] , 115, cold , 3},
%         { 4183 , 35892 ,[],[] , 16 ,bludgeoning , 1},
%         { 7006 , 11084 ,[],[], 2, fire , 2},
%         { 4804 , 25411 ,[],[], 10 ,cold , 14},
%         { 6262 , 28952 , [], [fire] , 7, slashing , 10},
%         { 628 , 32906 ,[],[slashing] , 99 ,radiation , 4},
%         { 5239 , 46047 , [fire],[] , 14, bludgeoning , 6},
%         { 1173 , 32300 , [], [cold, slashing], 53 ,bludgeoning , 19},
%         { 3712 , 12148 , [cold], [slashing] , 5 ,slashing , 17},
%         { 334 , 43582 , [], [cold, fire] , 260, cold , 5}
%         ]})}.


test_armies() ->
% Immune System:
% 17 units each with 5390 hit points (weak to radiation, bludgeoning) with
%  an attack that does 4507 fire damage at initiative 2
% 989 units each with 1274 hit points (immune to fire; weak to bludgeoning,
%  slashing) with an attack that does 25 slashing damage at initiative 3
    {convert({immune, [
        {17, 5390, [], [radiation, bludgeoning], 4507, fire, 2},
        {989, 1274, [fire], [bludgeoning,slashing], 25, slashing, 3}
        ]}), 
    
% Infection:
% 801 units each with 4706 hit points (weak to radiation) with an attack
%  that does 116 bludgeoning damage at initiative 1
% 4485 units each with 2961 hit points (immune to radiation; weak to fire,
%  cold) with an attack that does 12 slashing damage at initiative 4
    convert({infection,[
        {801, 4706, [], [radiation], 116, bludgeoning, 1},
        {4485, 2961, [radiation], [fire, cold], 12, slashing, 4}
    ]})}.




% Infection group 1 would deal defending group 1 185832 damage
% Infection group 1 would deal defending group 2 185832 damage
% Infection group 2 would deal defending group 2 107640 damage
% Immune System group 1 would deal defending group 1 76619 damage
% Immune System group 1 would deal defending group 2 153238 damage
% Immune System group 2 would deal defending group 1 24725 damage