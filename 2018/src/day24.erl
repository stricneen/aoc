-module(day24).
% -compile([{nowarn_unused_function, [{ armies,0 }]}]).
-export([run/0]).
-record(army, {group, side, units, hitPoints, immune, weaknesses, attack, attackType, initiative}).

run() ->
    {A,B} = armies(),
    % io:format("~nPart 1 : ~p~n", [B]),
    {_, GroupA} = A, {_, GroupB} = B,
    print(GroupA), print(GroupB),
    R = fight(GroupA ++ GroupB),

    io:format("~nPart 1 : ~p~n", [lists:sum(lists:map(fun(E) -> E#army.units end ,R))]).

fight(Groups) ->

    io:format("~n =============================== ~n"),
    Pairs = target(Groups),

    % io:format("~n PC : ~p~n", [Pairs]),
    Round = attack(sort_for_attack(Pairs), Groups),

    % remove negatives

    io:format("~n Start : ~p~n", [Groups]),
    % io:format("~n Post : ~p~n", [Round]),

    Alive = lists:filter(fun(E) -> E#army.units > 0 end, Round),
    
    io:format("~n End  : ~p~n", [Alive]),
    
    Head = hd(Alive),
    case lists:all(fun(E) -> E#army.side =:= Head#army.side end, Alive) of
        true -> io:format("~n Done ~n"), Alive;
        false -> fight(Alive)
    end.


attack([], X) -> X;
attack([{_, none} | T ], R) -> attack(T,R); 
attack([{Attacker, Defender} | T ], R) ->

        io:format("~n  ~p ~n     --> ~p~n", [Attacker, Defender]),

        AttackerState = hd(lists:filter(fun(E) -> 
            E#army.initiative =:= Attacker#army.initiative end, R)),

        AttackUnits = case AttackerState#army.units > 0 of
            true -> AttackerState#army.units;
            false -> 0
        end,

        % has the attack been attacked - use alternative unit count
        % io:format("AttackUnits : ~p~n ", [AttackUnits]),
        % io:format("R : ~p~n ", [R]),



        EffectivePowerAttack = Attacker#army.attack * AttackUnits,
        Attack = EffectivePowerAttack * multiplier(Attacker, Defender),

        % units have hitpoints =  attack amount 

        UnitToLoose = Attack div Defender#army.hitPoints,

        Rn = lists:map(fun(E) -> 
            case E#army.initiative =:= Defender#army.initiative of
                true -> E#army{units=E#army.units - UnitToLoose};
                false -> E
             end
             end, R),


        io:format("Attack : ~p~n ", [Attack]),
        io:format("UnitToLoose : ~p~n ", [UnitToLoose]),
        
    attack(T, Rn).

sort_for_attack(L) -> 
    S = lists:map(fun({Attacker, Defender}) -> {Attacker#army.initiative, Attacker, Defender} end, L),
    S1 = lists:reverse(lists:sort(S)),
    lists:map(fun({_,A,E}) -> {A,E} end, S1).




target(Groups) ->

    TargetOrder = sort_for_targetting(Groups),

    PairUp = lists:foldl(fun(Att, Pairs) ->

    % io:format("~nAttacker : ~p~n", [Attacker]),

    % io:format("~n  Pairs : ~p~n", [Pairs]),

        % on opposing side and not immue
        % and not already paired 
        Targetted = lists:map(fun({_, {_,_,_, Defender}}) -> Defender#army.initiative end, 
            lists:filter(fun({_,E}) -> E =/= none end, Pairs)),

        ValidTargets = lists:filter(fun (D) -> 
            (Att#army.side =/= D#army.side)   
            and not lists:member(D#army.initiative, Targetted)         
        end, TargetOrder),

        % most damage - largest eff pow - largest inititive

        % io:format("~n  ValidTargets : ~p~n", [ValidTargets]),

        Damage = lists:reverse(lists:sort(lists:map(fun(Def) -> 
            { multiplier(Att, Def) * Att#army.units * Att#army.attack, 
                Def#army.attack * Def#army.units, Def#army.initiative,
                Def }
        end, ValidTargets))),

        % io:format("~n  Damage : ~p~n~n", [Damage]),
        
        [{Att, targetted(lists:filter(fun({A,_,_,_}) -> A > 0 end, Damage))}] ++ Pairs

        end, [], TargetOrder),


    lists:map(fun({A, B}) -> 
        case B =:= none of
            true -> {A,none};
            false -> {_,_,_,C} = B, {A,C}
        end
    end,  PairUp).


multiplier(A, D) ->
                WeakMultiplier = case lists:member(A#army.attackType ,D#army.weaknesses) of
                true -> 2;
                false -> 1
            end,
            ImmuneMultiplier = case lists:member(A#army.attackType ,D#army.immune) of
                true -> 0;
                false -> 1
            end,
            WeakMultiplier * ImmuneMultiplier.

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

to_record(T, {Group, Units, Hitpoints, Immune, Weaknesses, Attack, AttackType, Initiative}) ->
    #army{
        group = Group,
        side = T,
        units = Units,
        hitPoints = Hitpoints,
        immune = Immune,
        weaknesses = Weaknesses,
        attack = Attack,
        attackType = AttackType,
        initiative = Initiative }.

armies() ->
    {convert({immune, [
        {1, 1514 , 8968 , [], [cold] , 57 ,bludgeoning , 9},
        {2,2721 , 6691 , [], [cold]  , 22, slashing , 15},
        {3,1214 , 10379 , [bludgeoning],[] , 69 ,fire , 16},
        {4,2870 , 4212 ,[],[], 11, radiation , 12},
        {5,1239 , 5405 , [], [cold] , 37, cold , 18},
        {6,4509 , 4004 , [radiation], [cold], 8 ,slashing , 20},
        {7,3369 , 10672 , [], [slashing]  , 29, cold , 11},
        {8,2890 , 11418 , [bludgeoning], [fire] , 30 ,cold , 8},
        {9, 149 , 7022 , [], [slashing] , 393, radiation , 13},
        {10, 2080 , 5786 , [slashing, bludgeoning], [fire], 20 ,fire , 7}
        ]}), 
    convert({infection,[
        {1, 817 , 47082 , [slashing, radiation, bludgeoning],[] , 115, cold , 3},
        {2, 4183 , 35892 ,[],[] , 16 ,bludgeoning , 1},
        {3, 7006 , 11084 ,[],[], 2, fire , 2},
        {4, 4804 , 25411 ,[],[], 10 ,cold , 14},
        {5, 6262 , 28952 , [], [fire] , 7, slashing , 10},
        {6, 628 , 32906 ,[],[slashing] , 99 ,radiation , 4},
        {7, 5239 , 46047 , [fire],[] , 14, bludgeoning , 6},
        {8, 1173 , 32300 , [], [cold, slashing], 53 ,bludgeoning , 19},
        {9, 3712 , 12148 , [cold], [slashing] , 5 ,slashing , 17},
        {10, 334 , 43582 , [], [cold, fire] , 260, cold , 5}
        ]})}.


test_armies() ->
% Immune System:
% 17 units each with 5390 hit points (weak to radiation, bludgeoning) with
%  an attack that does 4507 fire damage at initiative 2
% 989 units each with 1274 hit points (immune to fire; weak to bludgeoning,
%  slashing) with an attack that does 25 slashing damage at initiative 3
    {convert({immune, [
        {1, 17, 5390, [], [radiation, bludgeoning], 4507, fire, 2},
        {2, 989, 1274, [fire], [bludgeoning,slashing], 25, slashing, 3}
        ]}), 
    
% Infection:
% 801 units each with 4706 hit points (weak to radiation) with an attack
%  that does 116 bludgeoning damage at initiative 1
% 4485 units each with 2961 hit points (immune to radiation; weak to fire,
%  cold) with an attack that does 12 slashing damage at initiative 4
    convert({infection,[
        {1, 801, 4706, [], [radiation], 116, bludgeoning, 1},
        {2, 4485, 2961, [radiation], [fire, cold], 12, slashing, 4}
    ]})}.




% Infection group 1 would deal defending group 1 185832 damage
% Infection group 1 would deal defending group 2 185832 damage
% Infection group 2 would deal defending group 2 107640 damage
% Immune System group 1 would deal defending group 1 76619 damage
% Immune System group 1 would deal defending group 2 153238 damage
% Immune System group 2 would deal defending group 1 24725 damage