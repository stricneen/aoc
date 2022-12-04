const aoc = require('./aoc');
const buffer = aoc.readfile('day04.txt');
const text = buffer.split(/\n/);

const pairs = text.map(t => t.split(','))
    .map(([a,b]) => [a.split('-'),b.split('-')])
    .map(([[a,b],[c,d]]) => ([[parseInt(a),parseInt(b)],[parseInt(c), parseInt(d)]]) )
    
const p1 = pairs.filter(([[a,b],[c,d]]) => 
    (a <= c && b >= d) || (c <= a && d >= b))

const p2 = pairs.filter(([[a,b],[c,d]]) => 
    (c <= a && a <= d) || (a <= c && c <= b))

console.log("Part 1 : ", (p1.length)) // 431
console.log("Part 2 : ", (p2.length)) // 823
