const aoc = require('./aoc');
const buffer = aoc.readfile('day02.txt');

const text = buffer.split(/\n/);
const lines = text.map(x => x.split(' '));

const p1 = lines.map(([a,b]) => {

    const me = {'X': 1, 'Y': 2, 'Z': 3};
    const scores = {
        'AX': 3, 'AY': 6,
        'BY': 3, 'BZ': 6,
        'CX': 6, 'CZ': 3,
    }
    return me[b] + (scores[`${a}${b}`] || 0);
 })

const p2 = lines.map(([a,b]) => {
    const me = {'X': 0, 'Y': 3, 'Z': 6};
    const scores = {
        'AX': 3, 'AY': 1, 'AZ': 2,
        'BX': 1, 'BY': 2, 'BZ': 3,
        'CX': 2, 'CY': 3, 'CZ': 1,
    }

    return  me[b] + scores[`${a}${b}`];
})

console.log("Part 1 : ", aoc.sum(p1)); // 14163
console.log("Part 2 : ", aoc.sum(p2)); // 12091
