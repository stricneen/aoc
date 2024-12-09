const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(10);
const text = buffer.split('').map(Number);

p1 = p2 = 0

      
assert(p1 === 6288599492129, 'p1')
assert(p2 === 6321896265143, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
