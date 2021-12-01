const aoc = require('./aoc');
const buffer = aoc.readfile('day02.txt');

const text = buffer.split(/\n/);
const nums = text.map(x => parseInt(x));

let p1 = 0;
let p2 = 0;
for (var a = 0; a < nums.length - 3; a++)
  if (nums[a + 1] > nums[a]) p1 += 1

  

  
  
  
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
