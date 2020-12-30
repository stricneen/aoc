-module(device).
-export([parse/1]).
-export([execute/2]).

execute({_, Prog}, Options) -> 
    Debug = debug(Options),

    Debug("Executing~n", []),

    Reg = {0,0,0,0,0,0},

    Ret = lists:foldl(fun({Op, A, B, C}, Acc) -> 

        Debug("~p~n", [Op]),

        case Op of
            addr -> addr(A, B, C, Acc);
            addi -> addi(A, B, C, Acc);
            mulr -> mulr(A, B, C, Acc);
            muli -> muli(A, B, C, Acc);
            banr -> banr(A, B, C, Acc);
            bani -> bani(A, B, C, Acc);
            borr -> borr(A, B, C, Acc);
            bori -> bori(A, B, C, Acc);
            setr -> setr(A, B, C, Acc);
            seti -> seti(A, B, C, Acc);
            gtir -> gtir(A, B, C, Acc);
            gtri -> gtri(A, B, C, Acc);
            gtrr -> gtrr(A, B, C, Acc);
            eqir -> eqir(A, B, C, Acc);
            eqri -> eqri(A, B, C, Acc);
            eqrr -> eqrr(A, B, C, Acc);
            _ -> Acc
        end

    end, Reg, Prog),

    Ret.





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
        true ->   setelement(C+1, R, 1);
        false ->   setelement(C+1, R, 0)
    end.
        
% gtri (greater-than register/immediate) sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0.
gtri(A, B, C, R) ->
    Op1 = element(A+1, R),
    % Op2 = element(B+1, R),
    case Op1 > B of
        true ->   setelement(C+1, R, 1);
        false ->   setelement(C+1, R, 0)
    end.

% gtrr (greater-than register/register) sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0.
gtrr(A, B, C, R) ->
    Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    case Op1 > Op2 of
        true ->   setelement(C+1, R, 1);
        false ->   setelement(C+1, R, 0)
    end.

% Equality testing:
% eqir (equal immediate/register) sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0.
eqir(A, B, C, R) ->
    Op2 = element(B+1, R),
    case A == Op2 of
        true ->   setelement(C+1, R, 1);
        false ->   setelement(C+1, R, 0)
    end.

% eqri (equal register/immediate) sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0.
eqri(A, B, C, R) ->
    Op1 = element(A+1, R),
    case Op1 == B of
        true ->   setelement(C+1, R, 1);
        false ->   setelement(C+1, R, 0)
    end.

% eqrr (equal register/register) sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0.
eqrr(A, B, C, R) ->
    Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    case Op1 == Op2 of
        true ->   setelement(C+1, R, 1);
        false ->   setelement(C+1, R, 0)
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
  

