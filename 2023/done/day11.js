const aoc = require('../aoc');
const buffer = aoc.readfile('day11.txt');
const textraw = buffer.split(/\n/);

const galaxies = []
expR = []
expC = []

for (let i = 0; i < textraw.length; i++) {
    expC.push(i)
}

for (let i = 0; i < textraw.length; i++) {
    if (textraw[i].indexOf('#') === -1) expR.push(i)
    for (let j = 0; j < textraw[i].length; j++) {
        const s = textraw[i][j];
        if (s === '#') {
            galaxies.push([i, j])
            expC = expC.filter(x => x !== j)
        }
    }
}

const dists1 = []
const dists2 = []

for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {

        const f = galaxies[i];
        const t = galaxies[j];

        const d = Math.abs(f[0] - t[0]) + Math.abs(f[1] - t[1])

        const xc = expC.filter(x => Math.min(f[1], t[1]) < x && Math.max(f[1], t[1]) > x).length
        const xr = expR.filter(x => Math.min(f[0], t[0]) < x && Math.max(f[0], t[0]) > x).length

        d1 = d + xc + xr
        d2 = d + (xr * (1000000-1)) + (xc * (1000000-1))
        dists1.push(d1)
        dists2.push(d2)
    }
}

console.log('Part 1:', aoc.sum(dists1)); // 9648398
console.log('Part 2:', aoc.sum(dists2)); // 618800410814
