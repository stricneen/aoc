const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfile('day1.txt');

const text = buffer.split(/\n/);

const nums = text.reduce((a,e) => {
    c = e.split('   ')
    a[0].push(parseInt(c[0]))
    a[1].push(parseInt(c[1]))
    return a;
}, [[],[]])

const x = aoc.sort_ints(nums[0])
const y = aoc.sort_ints(nums[1])

sum = 0
for (let i = 0; i < x.length; i++) {
 
    sum += Math.abs(x[i] - y[i])
}

console.log(sum)

p1 =p2=0

// assert(p1 === 54450, 'p1')
// assert(p2 === 54265, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);


//54450
//54265