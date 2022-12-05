const aoc = require('./aoc');
const buffer = aoc.readfile('day05.txt');
const text = buffer.split(/\n/);

const stacks = [
    'HTZD',
    'QRWTGCS',
    'PBFQNRCH',
    'LCNFHZ',
    'GLFQS',
    'VPWZBRCS',
    'ZFJ',
    'DLVZRHQ',
    'BHGNFZLD']

const moves = text.map(x => x.split(' '))
     .map(x => ([x[1], x[3], x[5]]))

const arrange = (fn) => {
     const s = moves.reduce((a,[crates,from,to]) => {
        const move = a[from-1].splice(-crates)
        a[to-1].push(...fn(move))
        return a
    }, stacks.map(x => x.split('')))
    return s.reduce((a,e) => a+=e[e.length-1], '')
}

const p1 = arrange((x) => x.reverse())
const p2 = arrange((x) => x)

console.log("Part 1 : ", (p1))
console.log("Part 2 : ", (p2))
