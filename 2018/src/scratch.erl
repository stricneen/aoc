-module(scratch).
-define(IF(Cond,E1,E2), (case (Cond) of true -> (E1); false -> (E2) end)).

scratch() -> 
    io:format("~p~n", [?IF(1 =:= 2, "no", "tes")]).