const aoc = require('./aoc');
const buffer = aoc.readfile('day1.txt');

const text = buffer.split(/\n/);
const nums = text.map(x => parseInt(x));

const calories = nums.reduce((a,e) => {
  isNaN(e) ? a.push(0) : a[a.length-1]+=e;
  return a;
}, [0])

aoc.sort_ints(calories).reverse();

console.log("Part 1 : ", calories[0]);
console.log("Part 2 : ", aoc.sum(calories.slice(0,3)));
