const aoc = require('./aoc');
const buffer = aoc.readfile('day06.txt');

const pos = (l) => {
    return [...aoc.window(buffer, l)]
        .findIndex(x => x === aoc.dedup_str(x)) + l;
}

console.log("Part 1 : ", pos(4)) // 1766
console.log("Part 2 : ", pos(14)) // 2383
