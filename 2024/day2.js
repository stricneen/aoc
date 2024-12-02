const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfile('day2.txt');

const text = buffer.split(/\n/);

const reports = text.map(e => e.split(' ').map(e => parseInt(e)));

const isSafe = (r) => {
    const t = []
    for (const x of aoc.window(r,2)) {
        t.push(x[1] - x[0])
    }
    return t.every(e => e > 0 && e < 4) || t.every(e => e > -4 && e < 0)
}

const p1 = reports.reduce((a, e) => {
    return [...a, isSafe(e)];
}, []).filter(e => e).length;


p2 = 0
for (let i = 0; i < reports.length; i++) {
    if (isSafe[reports[i]]) {
        p2 += 1
        continue
    }

    for (let j = 0; j < reports[i].length; j++) {
        const test = reports[i].filter((_, k) => k !== j)
        if (isSafe(test)) {
            p2 += 1
            break
        }
    }
}

assert(p1 === 242, 'p1')
assert(p2 === 311, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
