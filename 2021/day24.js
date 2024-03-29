const aoc = require('./aoc');
const buffer = aoc.readfile('day24.txt');
const text = buffer.split(/\n/);
const ops = text.map(x => {
    return x.split(' ');
});

//console.log(ops)


const valid = number => {
    let reg = { w: 0, x: 0, y: 0, z: 0 };
    let inp = 0;
    let s = number.toString();
    for (const op of ops) {

        const op2 = !Number.isNaN(parseInt(op[2])) ? parseInt(op[2]) : reg[op[2]]

        if (op[0] === 'inp') {
            reg[op[1]] = parseInt(s[inp]);
            inp++;
        }

        if (op[0] === 'add') {
            reg[op[1]] = reg[op[1]] + op2;
        }
        if (op[0] === 'mul') {
            reg[op[1]] = reg[op[1]] * op2;
        }
        if (op[0] === 'div') {
            reg[op[1]] = Math.floor(reg[op[1]] / op2)
        }
        if (op[0] === 'mod') {
            reg[op[1]] = reg[op[1]] % op2
        }
        if (op[0] === 'eql') {
            reg[op[1]] === op2 ? 1 : 0;
        }
    }
    // aoc.pj(reg)
    return reg.z === 0;
}

function* check() {
  //let c = 11111111111111;
    let c = 99999999999999;
    
    while (c > 0) {
        if (c.toString().indexOf('0') === -1)
            yield c;
        c--;
    }
}

// valid('13579246899999')

// for (const num of check()) {
//     // console.log(num)
//     if (valid(num)) {        
//         console.log('VALID : ' + num);
//     }
// }

const ALU = (
  input,
  state = [..."xyzwi"].reduce((s, v) => ((s[v] = 0), s), {})
) => ({
  state,
  inp: a => (state[a] = (input / 10 ** (13 - state.i++)) % 10 | 0),
  add: (a, b) => (state[a] = state[a] + (state[b] ?? Number(b))),
  mul: (a, b) => (state[a] = state[a] * (state[b] ?? Number(b))),
  mod: (a, b) => (state[a] = state[a] % (state[b] ?? Number(b))),
  div: (a, b) => (state[a] = Math.trunc(state[a] / (state[b] ?? Number(b)))),
  eql: (a, b) => (state[a] = state[a] === (state[b] ?? Number(b)) ? 1 : 0),
});

 const exec = (code, num) =>
  code
    .map(line => line.split(" "))
    .reduce((vm, [instr, a, b]) => (vm[instr](a, b), vm), ALU(num)).state;
/*
 0   inp w          inp w          
 1   mul x 0        mul x 0
 2   add x z        add x z
 3   mod x 26       mod x 26        get last term from z e.g `d[prev_i] + prev_c`, where c is the constant at line 15 from a prev block
 4   div z 26       div z 1         1 -> no division will just push d[i] + c to block's z 
 5   add x -2       add x 14        c . c > 9  makes mul below always be 26,
 6   eql x w        eql x w         
 7   eql x 0        eql x 0
 8   mul y 0        mul y 0
 9   add y 25       add y 25
10   mul y x        mul y x         
11   add y 1        add y 1
12   mul z y        mul z y         z = z * (line[4] !== 1 && d[i] === d[prev] + c_prev + c ? 1 : 26)  
13   mul y 0        mul y 0         
14   add y w        add y w         
15   add y 1        add y 9         <-- next_c
16   mul y x        mul y x
17   add z y        add z y
d[prev_i] = 9 - (prev_c + c) for maximum , 1 - (prev_c + c) for min. cap at max 9, resp min 1
d[i] = d[prev] + (prev_c + c)
 */

const part1 = (lines, max = true) =>
  lines
    .map(line => line.split(" "))
    .map(([, , v]) => Number(v))
    .filter((_, i) => [4, 5, 15].some(r => r === i % 18))
    .reduce(
      (groups, v, i) => (groups[(i / 3) | 0].push(v), groups),
      [...Array(14)].map(_ => [])
    )
    .reduce(
      ([digits, stack], [div_z, c, next_c], i) => {
        if (div_z === 1) {
          stack = [...stack, [next_c, i]];
        } else {
          const [prev_c, prev_i] = stack.pop();
          const diff = prev_c + c;
          digits[prev_i] = max ? Math.min(9, 9 - diff) : Math.max(1, 1 - diff);
          digits[i] = digits[prev_i] + diff;
        }
        return [digits, stack];
      },
      [Array(14).fill(0), []]
    )[0]
    .reduce((number, n) => number * 10 + n);

const part2 = lines => part1(lines, false);

console.log(part1(text))

console.log(part2(text, true))