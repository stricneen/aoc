const aoc = require('./aoc');
const buffer = aoc.readfile('day03.txt');
const text = buffer.split(/\n/);

const priority = (v) => v > 95 ? v-96 : v-38;
  
const p1 = text.map((x) => [x.slice(0,x.length/2),x.slice(x.length/2)])
    .map(([a,b]) => aoc.intersect(a,b))
    .map(a => aoc.dedup(a)[0].charCodeAt(0))
    .map(priority)
    
const p2 = aoc.chunk(text, 3)
    .map(([a,b,c]) => aoc.intersect(aoc.intersect(a,b).join(''),c))
    .map(a => aoc.dedup(a)[0].charCodeAt(0))
    .map(priority)

console.log("Part 1 : ", aoc.sum(p1)) // 8493
console.log("Part 2 : ", aoc.sum(p2)); // 2552
