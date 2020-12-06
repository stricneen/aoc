const aoc = require('./aoc');
const buffer = aoc.readfile('day06.txt');
const text = buffer.split(/\n/);

const groups = aoc.group(text);

const lengths = groups.map(l => l.join(''))
                    .map(l => aoc.dedup_str(l))
                    .map(x => x.length);

console.log("Part 1 : ", aoc.sum(lengths));

var g = groups.map(x => {
    const all = x[0].split('').map(y => x.every(z => z.includes(y) ? 1 : 0));
    return aoc.sum(all);
});

console.log("Part 2 : ", aoc.sum(g));
