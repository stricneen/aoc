const aoc = require('./aoc');
const buffer = aoc.readfile('day12.txt');
const m = buffer.split(/\n/).map(x => x.split(''));
const map = m.map(x => x.map(y => y.charCodeAt(0)))




p1=p2=0
console.log('Part 1', p1);
console.log('Part 2', p2);
