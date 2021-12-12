const aoc = require('./aoc');
const buffer = aoc.readfile('day13.txt');
const text = buffer.split(/\n/);
const tunnels = text.map(x => x.split('-'))
  .map(y => ({ from: y[0], to: y[1] }));

console.log('Part 1 : ', 0);
console.log('Part 2 : ', 0);