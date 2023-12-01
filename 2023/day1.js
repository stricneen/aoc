const aoc = require('./aoc');
const buffer = aoc.readfile('day1.txt');

const text = buffer.split(/\n/);
const nums = text.map(x => aoc.extractNums(x));

const x = nums.map(x => parseInt(x[0].toString()[0]) * 10 +  parseInt(x[x.length-1].toString()[x[x.length-1].toString().length -1]))
// const x = nums.map(x => parseInt(x[x.length-1].toString()[x[x.length-1].toString().length -1]))


const y = x.reduce((a,e) => a+e, 0)
// const calories = nums.reduce((a,e) => {
//   isNaN(e) ? a.push(0) : a[a.length-1]+=e;
//   return a;
// }, [0])

// aoc.sort_ints(calories).reverse();

// console.log("Part 1 : ", calories[0]);
// console.log("Part 2 : ", aoc.sum(calories.slice(0,3)));

console.log(y)
