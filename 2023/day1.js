const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfile('day1.txt');

const text = buffer.split(/\n/);

const t = text.map(aoc.extractNumericDigits)
t.forEach(x => console.log(x))
// console.log(JSON.stringify(t))
const x = t.map(x => (parseInt(x[0].toString()[0])) * 10 + parseInt(x[x.length - 1].toString()[x[x.length - 1].toString().length - 1]))
const p1 = x.reduce((a, e) => a + e, 0)

const nums = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
}

const f = (s) => {
    const o = [];
    for (let i = 0; i <= s.length; i++) {
        if (isNaN(parseInt((s[i]))) === false) {
            o.push(parseInt(s[i]));
        } else {
            Object.keys(nums).forEach(k => {
                if (s.startsWith(k, i)) {
                    o.push(nums[k])
                }
            })
        }

    }
    return o;
}

const p2 = text
            .map(f)
            .map(x => x[0] * 10 + x[x.length-1])
            .reduce((a, e) => a + e, 0)

assert(p1 === 54450, 'p1')
assert(p2 === 54265, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);


//54450
//54265