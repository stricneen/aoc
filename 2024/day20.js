
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(20);
const text = buffer.split(/\n/);
// const towels = text[0].split(', ');
// const patterns = text.slice(2)

p1 = p2 = 0


assert(p1 === 238, 'p1')
assert(p2 === 635018909726691, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
