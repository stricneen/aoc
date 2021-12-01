const aoc = require('./aoc');
const buffer = aoc.readfile('day01.txt');

const text = buffer.split(/\n/);
const nums = text.map(x => parseInt(x));

let p1 = 0;
for (var a = 0; a < nums.length - 3; a++)
  if (nums[a + 1] > nums[a]) p1 += 1

console.log("Part 1 : ", p1);

let p2 = 0;
for (var a = 0; a < nums.length - 3; a++) {
  const b = nums[a] + nums[a + 1] + nums[a + 2];
  const c = nums[a + 1] + nums[a + 2] + nums[a + 3];
  if (c > b)
    p2 += 1
}

console.log("Part 2 : ", p2);










// for (var a = 0; a < nums.length; a++) 
//     for (var b =a; b < nums.length; b++) 
//         if (nums[a] + nums[b] == 2020) {
//             console.log("Part 1 : ", nums[a] * nums[b]);
//         }

// for (var a = 0; a < nums.length; a++) 
//     for (var b =a; b < nums.length; b++) 
//         for (var c =b; c < nums.length; c++)
//             if (nums[a] + nums[b] + nums[c] == 2020) {
//                 console.log("Part 2 : ", nums[a] * nums[b] * nums[c]);
//             }

