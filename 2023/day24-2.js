const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const raw = buffer.split(/\n/);
const nerdamer = require("nerdamer/all.min")

// const nerdamer = require('nerdamer'); 


const particles = raw.map(l => {
    [p, v] = l.split(' @ ')
    return [p.split(', ').map(x => parseInt(x)), v.split(', ').map(x => parseInt(x))]
})

// console.log(particles)

// ['x+y=1', '2*x=6', '4*z+y=6']
// 225555584244738, 280452001678940, 158175058414862 @ 97, -361, 177
// 227688767181124, 208974144896814, 197748595030382 @ 104, -84, -576

const eq = []

for (let i = 0; i < 3; i++) {
    // console.log(particles[i])
    // 102352610405511, 202028623863107, 54441177479725 @ 288, 172, 406
    const [[x, y, z], [dx, dy, dz]] = particles[i]

    // eq.push(`(${x} - xr) / (dxr - ${dx}) = (${y} - yr) / (dyr - ${dy})`)
    // eq.push(`(${y} - yr) / (dyr - ${dy}) = (${z} - zr) / (dzr - ${dz})`)

    // eq.push(`(${x} - xr) * (dyr - ${dy}) = (${y} - yr) * (dxr - ${dx})`)
    // eq.push(`(${y} - yr) * (dzr - ${dz}) = (${z} - zr) * (dyr - ${dy})`)


    eq.push(`(${x} - x) * (b - ${dy}) = (${y} - y) * (a - ${dx})`)
    eq.push(`(${y} - y) * (c - ${dz}) = (${z} - z) * (b - ${dy})`)

}


console.log(eq)

var sol = nerdamer.solveEquations(eq);
console.log(sol)

// res = [
//     // sol.find(([x,_]) => x === 'xr')[1],
//     Math.round(sol.find(([x,_]) => x === 'xr')[1]),
//     Math.round(sol.find(([x,_]) => x === 'yr')[1]),
//     Math.round(sol.find(([x,_]) => x === 'zr')[1]),
// ]

// console.log(res)

// console.log(aoc.sum(res))


p2 = 0


// console.log('Part 1:', p1); // 28174
console.log('Part 2:', p2); // 

// (19 - x) * (b - 1) = (13 - y) * (a - -2),
// (13 - y) * (c - -2) = (30 - z) * (b - 1),
// (18 - x) * (b - -1) = (19 - y) * (a - -1),
// (19 - y) * (c - -2) = (22 - z) * (b - -1),
// (20 - x) * (b - -2) = (25 - y) * (a - -2),
// (25 - y) * (c - -4) = (34 - z) * (b - -2)