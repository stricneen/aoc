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


const [p1, p2] = x.reduce((a, e, i) => {
    return [
        a[0] + Math.abs(e - y[i]),
        a[1] + y.filter(c => c === e).length * e
    ]
}, [0,0])

assert(p1 === 1938424, 'p1')
assert(p2 === 22014209, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
