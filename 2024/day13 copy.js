
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(13);
// const text = buffer.split(' ').map(Number);
const text = buffer.split(/\n/);
const nerdamer = require("nerdamer/all.min")

const machines = []
p1 = p2 = 0
for (let i = 0; i < text.length; i += 4) {
     const a = text[i].split(' ');
     const b = text[i + 1].split(' ');
     const c = text[i + 2].split(' ');
     machines.push([
          parseInt(a[2].replace('X+', '').replace(',', '')),
          parseInt(a[3].replace('Y+', '').replace(',', '')),
          parseInt(b[2].replace('X+', '').replace(',', '')),
          parseInt(b[3].replace('Y+', '').replace(',', '')),
          parseInt(c[1].replace('X=', '').replace(',', '')),
          parseInt(c[2].replace('Y=', '').replace(',', ''))
     ])
}
// Button A: X+94, Y+34
// Button B: X+22, Y+67
// Prize: X=8400, Y=5400

const cost = ([ax, ay, bx, by, px, py]) => {

     let min = Number.MAX_SAFE_INTEGER
     let presses = []
     for (let a = 0; a < 100; a++) {
          for (let b = 0; b < 100; b++) {
               let posa = (ax * a) + (bx * b)
               let posb = (ay * a) + (by * b)

               if (posa === px && posb === py) {
                    // hit
                    console.log('hit')
                    if (a + b < min) {
                         min = a + b
                         presses = [a, b]
                    }
               }
          }
     }
     console.log(presses)
     if (presses.length > 0) return (presses[0] * 3) + presses[1]
     return 0
}

const cost2 = ([ax, ay, bx, by, px, py], conversion = 0) => {

     const a = `x * ${ax} + y * ${bx} = ${px + conversion}`
     const b = `x * ${ay} + y * ${by} = ${py + conversion}`

     const sol = nerdamer.solveEquations([a, b]);

     const x = sol[0][1]
     const y = sol[1][1]

     if (Number.isInteger(x) && Number.isInteger(y)) { return (x * 3) + y }

     return 0
}

// [94   22  8400]
// [34   67  5400]

// x = (8400 - y * 22) / 94 

// (((8400 - y * 22) / 94) * 34) + (y * 67) = 5400

// (((px - Y * bx) / ax) * ay) + (Y * by) = py

// x*94 + y*22 = 8400
// x*34 + y*67 = 5400

// y = (8400 - x*94) / 22
// x*34 + ((8400 - x*94) / 22)*67 = 5400
// 80 40

p1 = p2 = 0
for (const machine of machines) {
     p1 += cost2(machine)
     p2 += cost2(machine, 10000000000000)
}

assert(p1 === 29023, 'p1')
assert(p2 === 96787395375634, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);