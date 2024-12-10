
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(11);
const text = buffer.split(/\n/);

console.log(text)
p1 = p2 = 0

assert(p1 === 587, 'p1')
assert(p2 === 1340, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
