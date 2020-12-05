const aoc = require('./aoc');
const buffer = aoc.readfile('day05.txt');
const text = buffer.split(/\n/);

var test = ['FBFBBFFRLR', 'BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL'];

var pos = text.map(x => {
    const conv = x.split('').map(y => ['R','B'].includes(y) ? 1 : 0);
    const col = conv.slice(0, 7).map((y,i) => Math.pow(2,6-i) * y);
    const row = conv.slice(-3).map((y,i) => Math.pow(2,2-i) * y);
    return aoc.sum(col) * 8 + aoc.sum(row);
})

console.log("Part 1 : ", Math.max(...pos));

aoc.range(Math.min(...pos), Math.max(...pos)).forEach(i => {
    if (pos.includes(i-1) && pos.includes(i+1) && !pos.includes(i)) {
        console.log("Part 2 : ", i);
    }
});
