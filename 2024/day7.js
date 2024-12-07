const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(7);
const text = buffer.split(/\n/);

const eqs = text.reduce((a, x) => {
    c = x.replace(':', '').split(' ').map(x => parseInt(x));
    a.push(c)
    return a;
}, [])

p1 = p2 = 0



const eq = (e,base) => {
    pos = e.length - 2
    for (let i = 0; i < Math.pow(base, pos); i++) {
        f = i.toString(base).padStart(pos, '0').split('')
    // for (const f of aoc.countBase(pos+1)){
        // console.log(f)
        r = e[1]
        for (let k = 0; k < f.length; k++) {
            if (f[k] === '0') r += e[k + 2]
            if (f[k] === '1') r *= e[k + 2]
            if (f[k] === '2') r = parseInt(`${r}${e[k + 2]}`)
        }
        if (r === e[0]) return r
    }
    return 0
}

// for (const key of aoc.countBase(2)) {
//     console.log(key)
// }

p1 = aoc.sum(eqs.map(e => eq(e,2)))
p2 = aoc.sum(eqs.map(e => eq(e,3)))
// eq2(eqs[3])

assert(p1 === 20281182715321, 'p1')
assert(p2 === 159490400628354, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
