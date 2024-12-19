
const { assert } = require('console');
const aoc = require('./aoc');
// const buffer = aoc.readfilePro(17);
// const text = buffer.split(' ').map(Number);
// const maze = buffer.split(/\n/);

const registers = [66245665n, 0n, 0n]
const program = [2, 4, 1, 7, 7, 5, 1, 7, 4, 6, 0, 3, 5, 5, 3, 0]
// Register A: 66245665
// Register B: 0
// Register C: 0

// Program: 2,4,1,7,7,5,1,7,4,6,0,3,5,5,3,0

// const registers = [729n, 0n, 0n]
// const program = [0, 1, 5, 4, 3, 0]
// Register A: 729
// Register B: 0
// Register C: 0

// Program: 0,1,5,4,3,0

p1 = p2 = 0

const comp = (program, registers) => {
    let ptr = 0

    const out = []
    while (true) {

        if (ptr >= program.length) return out;

        const opcode = program[ptr]
        const operand = program[ptr + 1]
        const combo = operand >= 4 ? registers[operand - 4] : operand;

        // console.log(ptr, opcode, operand, combo, registers)
        // console.log(opcode , registers)

        switch (opcode) {
            case 0: // adv
                const a = BigInt(registers[0]) / (2n ** BigInt(combo))
                registers[0] = Number(a)
                ptr += 2;
                break;

            case 1: // bxl;
                registers[1] = Number(BigInt(operand) ^ BigInt(registers[1]));
                ptr += 2;
                break;

            case 2: // bst;
                registers[1] = combo % 8
                ptr += 2;
                break;

            case 3: // jnz;
                if (registers[0] === 0) {
                    ptr += 2
                } else {
                    ptr = operand;
                }
                break;

            case 4: // bxc;
                registers[1] = Number(BigInt(registers[1]) ^ BigInt(registers[2]));
                ptr += 2;
                break;

            case 5: // out;
                out.push(combo % 8)
                ptr += 2;
                break;

            case 6: // bdv;
                const b = BigInt(registers[0]) / (2n ** BigInt(combo))
                registers[1] = Number(b)
                ptr += 2;
                break;

            case 7: // cdv;
                const c = BigInt(registers[0]) / (2n ** BigInt(combo))
                registers[2] = Number(c)
                ptr += 2;
                break;

        }

    }
}

// p1 = comp(program, registers);

// p2 = 265061364597659n
// p = program
// exp = p.j
// m  = 9007199254740991
const prefix = 7
p2 = 265061364597659
     
p = program
 // [2, 4, 1, 7, 7, 5, 1, 7, 4, 6, 0, 3, 5, 5, 3, 0]

// p2 = 2024
// p = [0,3,5,4,3,0]

p2 = 35184375956379

p2 = 1
p2 = 16601633

best = 0



const expected = program.join(",");
this.reverseReset(0n);

let min = 0n;
let found = false;

while (!found) {
  this.run();
  const output = this.outputs.join(",");
  if (output === expected) {
    found = true;
    break;
  }

  if (expected.endsWith(output)) {
    min = min * 8n;
  } else {
    min++;
  }
  this.reverseReset(min);
}

console.log(Number(min))

// while (true) {

//     const out = comp(p, [p2, 0, 0]);
    
    
//     // const a = p2 + 6**9 + 0o601633;
//     const a = p2 + 7**8 + 0o6601633;
//     // if (out.length < p.length) { p2 *= 2; continue; }
//     // Quickly get to the right length


//     if (out.length > best) {

//         best = out.length
//         console.log(out)
//         console.log(p2.toString(8))
//     }


//     // console.log(p2, JSON.stringify(p), JSON.stringify(out), p.length, out.length)
//     if (JSON.stringify(p) === JSON.stringify(out)) { break; }


//     if (p.slice(0, prefix).toString() === out.slice(0, prefix).toString()) {
//         console.log(p2.toString(8), JSON.stringify(p), JSON.stringify(out), p.length, out.length)
//     };

//     // p2+=40757108738

//     p2 += 1

//     // if (p.length > out.length) { p2 *= 2 }
//     // p2 += 4194304
//     // 2097152
//     // if (p2 > 117450) break;
// }



// Register A: 2024
// Register B: 0
// Register C: 0

// Program: 0,3,5,4,3,0


// 1,4,0,0,4,2,3,7,3


assert(p1 === '1,4,6,1,6,4,3,0,3', 'p1')
            //   202125493347227
assert(p2 === 265061364597659, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
