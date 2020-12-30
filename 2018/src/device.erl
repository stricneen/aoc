-module(device).
-export([parse/1]).
-export([execute/2]).

execute({Declarations, Prog}, Options) -> 
    Debug = debug(Options),
    Debug("Declarations : ~p~n", [Declarations]),
    Registers = {0, 0, 0, 0, 0, 0},
    loop(Prog, 0, Registers, Debug).

loop(Prog, Ptr, Reg, Debug) ->
    % io:format("~p : ~p~n", [length(Prog), Ptr]),
    if Ptr >= length(Prog)  -> Reg;
        true ->
            %  io:format("~p ~n", ["BOG"]),
            {Op, A, B, C} = lists:nth(Ptr + 1, Prog),
            Debug("ip=~p ~p ~p~n", [Ptr, Reg, Op]),
            Res = case Op of
                addr -> addr(A, B, C, Reg);
                addi -> addi(A, B, C, Reg);
                mulr -> mulr(A, B, C, Reg);
                muli -> muli(A, B, C, Reg);
                banr -> banr(A, B, C, Reg);
                bani -> bani(A, B, C, Reg);
                borr -> borr(A, B, C, Reg);
                bori -> bori(A, B, C, Reg);
                setr -> setr(A, B, C, Reg);
                seti -> seti(A, B, C, Reg);
                gtir -> gtir(A, B, C, Reg);
                gtri -> gtri(A, B, C, Reg);
                gtrr -> gtrr(A, B, C, Reg);
                eqir -> eqir(A, B, C, Reg);
                eqri -> eqri(A, B, C, Reg);
                eqrr -> eqrr(A, B, C, Reg)
            end,
            loop(Prog, Ptr + 1, Res, Debug)
    end.

% Addition:
% addr (add register) stores into register C the result of adding register A and register B.
addr(A, B, C, R) ->
    Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    setelement(C+1, R, Op1 + Op2).

% addi (add immediate) stores into register C the result of adding register A and value B.
addi(A, B, C, R) ->
    Op1 = element(A+1, R),
    %Op2 = element(B, R),
    setelement(C+1, R, Op1 + B).

% Multiplication:
% mulr (multiply register) stores into register C the result of multiplying register A and register B.
mulr(A, B, C, R) ->
    Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    setelement(C+1, R, Op1 * Op2).

% muli (multiply immediate) stores into register C the result of multiplying register A and value B.
muli(A, B, C, R) ->
    Op1 = element(A+1, R),
    % Op2 = element(B+1, R),
    setelement(C+1, R, Op1 * B).

% Bitwise AND:
% banr (bitwise AND register) stores into register C the result of the bitwise AND of register A and register B.
banr(A, B, C, R) ->
    Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    setelement(C+1, R, Op1 band Op2).

% bani (bitwise AND immediate) stores into register C the result of the bitwise AND of register A and value B.
bani(A, B, C, R) ->
    Op1 = element(A+1, R),
    % Op2 = element(B+1, R),
    setelement(C+1, R, Op1 band B).

% Bitwise OR:
% borr (bitwise OR register) stores into register C the result of the bitwise OR of register A and register B.
borr(A, B, C, R) ->
    Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    setelement(C+1, R, Op1 bor Op2).

% bori (bitwise OR immediate) stores into register C the result of the bitwise OR of register A and value B.
bori(A, B, C, R) ->
    Op1 = element(A+1, R),
    % Op2 = element(B+1, R),
    setelement(C+1, R, Op1 bor B).

% Assignment:
% setr (set register) copies the contents of register A into register C. (Input B is ignored.)
setr(A, _, C, R) ->
    Op1 = element(A+1, R),
    setelement(C+1, R, Op1).

% seti (set immediate) stores value A into register C. (Input B is ignored.)
seti(A, _, C, R) ->
    setelement(C+1, R, A).

% Greater-than testing:
% gtir (greater-than immediate/register) sets register C to 1 if value A is greater than register B. Otherwise, register C is set to 0.
gtir(A, B, C, R) ->
    % Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    case A > Op2 of
        true -> setelement(C+1, R, 1);
        false -> setelement(C+1, R, 0)
    end.
        
% gtri (greater-than register/immediate) sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0.
gtri(A, B, C, R) ->
    Op1 = element(A+1, R),
    % Op2 = element(B+1, R),
    case Op1 > B of
        true -> setelement(C+1, R, 1);
        false -> setelement(C+1, R, 0)
    end.

% gtrr (greater-than register/register) sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0.
gtrr(A, B, C, R) ->
    Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    case Op1 > Op2 of
        true -> setelement(C+1, R, 1);
        false -> setelement(C+1, R, 0)
    end.

% Equality testing:
% eqir (equal immediate/register) sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0.
eqir(A, B, C, R) ->
    Op2 = element(B+1, R),
    case A == Op2 of
        true -> setelement(C+1, R, 1);
        false -> setelement(C+1, R, 0)
    end.

% eqri (equal register/immediate) sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0.
eqri(A, B, C, R) ->
    Op1 = element(A+1, R),
    case Op1 == B of
        true -> setelement(C+1, R, 1);
        false -> setelement(C+1, R, 0)
    end.

% eqrr (equal register/register) sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0.
eqrr(A, B, C, R) ->
    Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    case Op1 == Op2 of
        true -> setelement(C+1, R, 1);
        false -> setelement(C+1, R, 0)
    end.


parse(Text) -> 
    ParseDeclaration = fun(L) ->
    Instr = string:tokens(L, " "),
    { 
        list_to_atom(lists:nth(1, Instr)), 
        list_to_integer(lists:nth(2, Instr))
    }  end,

    ParseInstruction = fun(L) -> 
    Instr = string:tokens(L, " "),
    { 
        list_to_atom(lists:nth(1, Instr)), 
        list_to_integer(lists:nth(2, Instr)),
        list_to_integer(lists:nth(3, Instr)),
        list_to_integer(lists:nth(4, Instr))
    } end,

    Ops = lists:map(fun(L) -> 
        case string:prefix(L, "#") of
            nomatch -> ParseInstruction(L);
            Op -> ParseDeclaration(Op)
        end
    end, Text),

    { 
        lists:filter(fun(X) -> size(X) == 2 end, Ops),
        lists:filter(fun(X) -> size(X) == 4 end, Ops) 
    }.

debug(Options) -> 
    DebugOpt = lists:member(debug, Options),
    if 
        DebugOpt -> fun(T,L) -> io:format(T, L) end;
        true     -> fun(_,_) -> ok end
    end.
  

