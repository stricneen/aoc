const aoc = require('./aoc');
const buffer = aoc.readfile('day15.txt');
const text = buffer.split(/\n/);
const points = text.map(x => x.split('')).map(y => y.map(z => parseInt(z)));
const map = text.map(x => x.split('')).map(y => y.map(z => 1000000));
map[0][0] = 0;
const len = points[0].length;



for (let i = 1; i < len; i++) {
    map[0][i] = map[0][i-1] + points[0][i];
    map[i][0] = map[i-1][0] + points[i][0];
}
for (let x = 1; x < len; x++) {
    for (let y = 1; y < len; y++) {
        const pos = points[x][y];
        let above = (x > 0 ? map[x-1][y] : 100000) + pos;
        let left = (y > 0 ? map[x][y-1] : 100000) + pos ;
        const best = Math.min(above,left);
        map[x][y] = best;
    }
}

console.log(map);

console.log('Part 1 : ', 0);
console.log('Part 2 : ', 0);
