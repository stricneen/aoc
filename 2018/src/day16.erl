-module(day16).
-export([run/0]).

run() ->
    Input = aoc:readlines("../data/day16.txt"),
    Parsed = parse(Input),

    Results = lists:map(fun({Be, {OP,A,B,C}, Af}) ->

        % io:format("~p~n", [addi(OP,A,B,C,Be)]),

        {{OP,A,B,C}, lists:filter(fun(X) -> X /= "" end,[
            case addr(OP,A,B,C,Be) == Af of 
                true -> "addr"; false -> ""
            end,
            case addi(OP,A,B,C,Be) == Af of 
                true -> "addi"; false -> ""
            end,
            case mulr(OP,A,B,C,Be) == Af of 
                true -> "mulr"; false -> ""
            end,
            case muli(OP,A,B,C,Be) == Af of 
                true -> "muli"; false -> ""
            end,
            case banr(OP,A,B,C,Be) == Af of 
                true -> "banr"; false -> ""
            end,
            case bani(OP,A,B,C,Be) == Af of 
                true -> "bani"; false -> ""
            end,
            case borr(OP,A,B,C,Be) == Af of 
                true -> "borr"; false -> ""
            end,
            case bori(OP,A,B,C,Be) == Af of 
                true -> "bori"; false -> ""
            end,
            case setr(OP,A,B,C,Be) == Af of 
                true -> "setr"; false -> ""
            end,
            case seti(OP,A,B,C,Be) == Af of 
                true -> "seti"; false -> ""
            end,
            case gtir(OP,A,B,C,Be) == Af of 
                true -> "gtir"; false -> ""
            end,
            case gtri(OP,A,B,C,Be) == Af of 
                true -> "gtri"; false -> ""
            end,
            case gtrr(OP,A,B,C,Be) == Af of 
                true -> "gtrr"; false -> ""
            end,
            case eqir(OP,A,B,C,Be) == Af of 
                true -> "eqir"; false -> ""
            end,
            case eqri(OP,A,B,C,Be) == Af of 
                true -> "eqri"; false -> ""
            end,
            case eqrr(OP,A,B,C,Be) == Af of 
                true -> "eqrr"; false -> ""
            end
        ])}

        end ,Parsed),

    P1 = length(lists:filter(fun({_,Matches}) -> length(Matches) > 2 end, Results)),


    ProgRaw = aoc:readlines("../data/day16_2.txt"),
    Prog = lists:map(fun(X) -> list_to_tuple(lists:map(fun(Y) -> list_to_integer(Y) end, string:lexemes(X, " "))) end, ProgRaw),

    P2 = lists:foldl(fun({Op,A,B,C}, {R0,R1,R2,R3}) ->
        % io:format("~p~n", [{Op,A,B,C}]),
        case Op of
            0  -> eqir(0, A, B, C, {R0,R1,R2,R3});
            1  -> seti(0, A, B, C, {R0,R1,R2,R3});
            2  -> eqri(0, A, B, C, {R0,R1,R2,R3});
            3  -> eqrr(0, A, B, C, {R0,R1,R2,R3});
            4  -> addi(0, A, B, C, {R0,R1,R2,R3});
            5  -> setr(0, A, B, C, {R0,R1,R2,R3});
            6  -> gtrr(0, A, B, C, {R0,R1,R2,R3});
            7  -> gtri(0, A, B, C, {R0,R1,R2,R3});
            8  -> muli(0, A, B, C, {R0,R1,R2,R3});
            9  -> bori(0, A, B, C, {R0,R1,R2,R3});
            10 -> bani(0, A, B, C, {R0,R1,R2,R3});
            11 -> borr(0, A, B, C, {R0,R1,R2,R3});
            12 -> gtir(0, A, B, C, {R0,R1,R2,R3});
            13 -> banr(0, A, B, C, {R0,R1,R2,R3});
            14 -> addr(0, A, B, C, {R0,R1,R2,R3});
            15 -> mulr(0, A, B, C, {R0,R1,R2,R3});
            _ -> throw("Invalid opcode")
        end

        

    end, {0,0,0,0},Prog),

    %% Opcodes
    % 0  - eqir
    % 1  - seti
    % 2  - eqri
    % 3  - eqrr
    % 4  - addi
    % 5  - setr
    % 6  - gtrr
    % 7  - gtri
    % 8  - muli
    % 9  - bori
    % 10 - bani
    % 11 - borr
    % 12 - gtir
    % 13 - banr
    % 14 - addr
    % 15 - mulr


    io:format("~nPart 1 : ~p~n", [P1]),

    io:format("~nPart 2 : ~p~n", [P2]).



% Addition:

% addr (add register) stores into register C the result of adding register A and register B.
addr(Op, A, B, C, R) ->
    Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    setelement(C+1, R, Op1 + Op2).

% addi (add immediate) stores into register C the result of adding register A and value B.
addi(Op, A, B, C, R) ->
    Op1 = element(A+1, R),
    %Op2 = element(B, R),
    setelement(C+1, R, Op1 + B).

% Multiplication:

% mulr (multiply register) stores into register C the result of multiplying register A and register B.
mulr(Op, A, B, C, R) ->
    Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    setelement(C+1, R, Op1 * Op2).

% muli (multiply immediate) stores into register C the result of multiplying register A and value B.
muli(Op, A, B, C, R) ->
    Op1 = element(A+1, R),
    % Op2 = element(B+1, R),
    setelement(C+1, R, Op1 * B).

% Bitwise AND:

% banr (bitwise AND register) stores into register C the result of the bitwise AND of register A and register B.
banr(Op, A, B, C, R) ->
    Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    setelement(C+1, R, Op1 band Op2).

% bani (bitwise AND immediate) stores into register C the result of the bitwise AND of register A and value B.
bani(Op, A, B, C, R) ->
    Op1 = element(A+1, R),
    % Op2 = element(B+1, R),
    setelement(C+1, R, Op1 band B).

% Bitwise OR:

% borr (bitwise OR register) stores into register C the result of the bitwise OR of register A and register B.
borr(Op, A, B, C, R) ->
    Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    setelement(C+1, R, Op1 bor Op2).

% bori (bitwise OR immediate) stores into register C the result of the bitwise OR of register A and value B.
bori(Op, A, B, C, R) ->
    Op1 = element(A+1, R),
    % Op2 = element(B+1, R),
    setelement(C+1, R, Op1 bor B).

% Assignment:

% setr (set register) copies the contents of register A into register C. (Input B is ignored.)
setr(Op, A, B, C, R) ->
    Op1 = element(A+1, R),
    % Op2 = element(B+1, R),
    setelement(C+1, R, Op1).

% seti (set immediate) stores value A into register C. (Input B is ignored.)
seti(Op, A, B, C, R) ->
    % Op1 = element(A+1, R),
    % Op2 = element(B+1, R),
    setelement(C+1, R, A).

% Greater-than testing:

% gtir (greater-than immediate/register) sets register C to 1 if value A is greater than register B. Otherwise, register C is set to 0.
gtir(Op, A, B, C, R) ->
    % Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    case A > Op2 of
        true ->   setelement(C+1, R, 1);
        false ->   setelement(C+1, R, 0)
    end.
        
  

% gtri (greater-than register/immediate) sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0.
gtri(Op, A, B, C, R) ->
    Op1 = element(A+1, R),
    % Op2 = element(B+1, R),
    case Op1 > B of
        true ->   setelement(C+1, R, 1);
        false ->   setelement(C+1, R, 0)
    end.

% gtrr (greater-than register/register) sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0.
gtrr(Op, A, B, C, R) ->
    Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    case Op1 > Op2 of
        true ->   setelement(C+1, R, 1);
        false ->   setelement(C+1, R, 0)
    end.

% Equality testing:

% eqir (equal immediate/register) sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0.
eqir(Op, A, B, C, R) ->
    % Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    case A == Op2 of
        true ->   setelement(C+1, R, 1);
        false ->   setelement(C+1, R, 0)
    end.

% eqri (equal register/immediate) sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0.
eqri(Op, A, B, C, R) ->
    Op1 = element(A+1, R),
    % Op2 = element(B+1, R),
    case Op1 == B of
        true ->   setelement(C+1, R, 1);
        false ->   setelement(C+1, R, 0)
    end.

% eqrr (equal register/register) sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0.
eqrr(Op, A, B, C, R) ->
    Op1 = element(A+1, R),
    Op2 = element(B+1, R),
    case Op1 == Op2 of
        true ->   setelement(C+1, R, 1);
        false ->   setelement(C+1, R, 0)
    end.

parse(Input) ->

    {B,I,A} = lists:foldl(fun(Line, {B,I,A}) -> 
            First = string:nth_lexeme(Line, 1, " "),
            % io:format("~p~n", [First]),
            case First of 
                [] -> {B,I,A};
                "Before:" -> {[Line] ++ B,I,A};
                "After:" -> {B,I,[Line] ++ A};
                _ -> {B,[Line] ++ I,A}
            end
            end, {[],[],[]}, Input),
    
    Before = lists:map(fun(X) ->
        A1 = re:replace(X, "Before: \\[", "", [global,{return,list}]),
        A2 = re:replace(A1, "\\]", "", [global,{return,list}]),
        A3 = string:lexemes(A2, ","),
        A4 = lists:map(fun(Y) -> list_to_integer(string:trim(Y)) end, A3),
        list_to_tuple(A4)
        end, B),

    Instr = lists:map(fun(X) ->
        A1 = string:lexemes(X, " "),
        A2 = lists:map(fun(Y) -> list_to_integer(string:trim(Y)) end, A1),
        list_to_tuple(A2)
        end, I),

    After = lists:map(fun(X) ->
        A1 = re:replace(X, "After:  \\[", "", [global,{return,list}]),
        A2 = re:replace(A1, "\\]", "", [global,{return,list}]),
        A3 = string:lexemes(A2, ","),
        A4 = lists:map(fun(Y) -> list_to_integer(string:trim(Y)) end, A3),
        list_to_tuple(A4)
        end, A),

    Zip = lists:zip3(Before,Instr,After),
    Zip.