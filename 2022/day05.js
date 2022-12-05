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
    'DLVZRHQ' ,
    'BHGNFZLD'];

const moves = text.map(x => x.split(' '))
     .map(x => ([x[1], x[3], x[5]]));

const s1 = moves.reduce((a,[crates,from,to]) => {
    const move = a[from-1].splice(-crates)
    a[to-1] = a[to-1].concat(move.reverse());
    return a;
}, stacks.map(x => x.split('')));
const p1 = s1.reduce((a,e) => a+=e[e.length-1], '');

const s2 = moves.reduce((a,[crates,from,to]) => {
    const move = a[from-1].splice(-crates)
    a[to-1] = a[to-1].concat(move);
    return a;
}, stacks.map(x => x.split('')));
const p2 = s2.reduce((a,e) => a+=e[e.length-1], '');


console.log("Part 1 : ", (p1))
console.log("Part 2 : ", (p2))
