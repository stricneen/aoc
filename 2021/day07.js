const aoc = require('./aoc');
const buffer = aoc.readfile('day07.txt');
const text = buffer.split(',');
const nums = text.map(x => parseInt(x))

const add = (num) => num * (num+1) / 2;

const dist1 = [];
const dist2 = [];
for(let i = Math.min(...nums); i< Math.max(...nums); i++) {
  dist1.push(nums.reduce((a,e) => a + Math.abs(e - i), 0));
  dist2.push(nums.reduce((a,e) => a + add(Math.abs(e - i)), 0));
}

console.log('Part 1 : ', Math.min(...dist1));
console.log('Part 2 : ', Math.min(...dist2));
