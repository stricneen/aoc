const aoc = require('./aoc');
    
const buffer = aoc.readfile('day01.txt');

const text = buffer.split(/\n/);
const input = text.map(x => parseInt(x));

const calc = input.map(x => (Math.floor(x/3))-2);
const p1 = aoc.sum(calc);
console.log("Part 1 ", p1);     // 3394689


const calcFuel = (x) => x < 9 ? 0 : (Math.floor(x/3))-2 + calcFuel((Math.floor(x/3))-2);
const calc2 = input.map(x => calcFuel(x));
var p2 = aoc.sum(calc2);
console.log("Part 2 ", p2);     // 5089160
