const aoc = require('./aoc');
const buffer = aoc.readfile('day02.txt');

const text = buffer.split(/\n/);
const nums = text.map(x => parseInt(x));


let p1 = p2 = 0;


console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
