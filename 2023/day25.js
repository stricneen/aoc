const { CONNREFUSED } = require('dns');
const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const textraw = buffer.split(/\n/);

connections = new Set()
comps = textraw.forEach(x => {
    t = x.split(': ')
    r = t[1].split(' ')
    for (let i = 0; i < r.length; i++) {
        connections.add([t[0],r[i]])
    }
})

counts = {}

connections.forEach(([x,y]) => {
    if (counts[x]) {
        counts[x] = counts[x] + 1
    } else {
        counts[x] = 1
    }
    if (counts[y]) {
        counts[y] = counts[y] + 1
    } else {
        counts[y] = 1
    }
})

// hfx/pzl
// bvb/cmg
// nvd/jqt

console.log(counts)





p1 = 0
p2 = 0
console.log()
console.log('Part 1:', p1); // 
console.log('Part 2:', p2); // 
