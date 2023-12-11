const aoc = require('./aoc');
const buffer = aoc.readfile('day10.txt');
const inp = buffer.split(/\n/)

const textraw = [
    '.'.repeat(inp[0].length + 2),
    ...inp.map(x => `.${x}.`),
    '.'.repeat(inp[0].length + 2)
];

path = []

const dup = [-1, 0]
const ddown = [1, 0]
const dleft = [0, -1]
const dright = [0, 1]

start = []
textraw.forEach((r, i) => {
    if (r.indexOf('S') > -1) start = [i, r.indexOf('S')]
})

dir = []
if ('-FL'.split('').includes(textraw[start[0]][start[1] - 1])) dir = dleft
if ('-7J'.split('').includes(textraw[start[0]][start[1] + 1])) dir = dright
if ('|F7'.split('').includes(textraw[start[0] - 1][start[1]])) dir = dup
if ('|LJ'.split('').includes(textraw[start[0] + 1][start[1]])) dir = ddown

const vert = []

const trace = (pos, dir) => {
    npos = [pos[0] + dir[0], pos[1] + dir[1]]
    nfig = textraw[npos[0]][npos[1]]

    if ('|JL'.includes(nfig)) { vert.push(npos) }

    if (nfig === 'S') return [0, 0];

    if (nfig === '|') ndir = dir
    if (nfig === '-') ndir = dir

    if (nfig === 'F' && aoc.eqArr(dir, dleft)) ndir = ddown
    if (nfig === 'F' && aoc.eqArr(dir, dup)) ndir = dright

    if (nfig === '7' && aoc.eqArr(dir, dright)) ndir = ddown
    if (nfig === '7' && aoc.eqArr(dir, dup)) ndir = dleft

    if (nfig === 'J' && aoc.eqArr(dir, dright)) ndir = dup
    if (nfig === 'J' && aoc.eqArr(dir, ddown)) ndir = dleft

    if (nfig === 'L' && aoc.eqArr(dir, dleft)) ndir = dup
    if (nfig === 'L' && aoc.eqArr(dir, ddown)) ndir = dright

    return [npos, ndir]
}


steps = 0
p = start
d = dir
path = [p]

while (true) {
    [np, nd] = trace(p, d)
    steps++
    if (aoc.eqArr([np, nd], [0, 0])) break;
    // console.log(np, nd,s)
    path.push(np)
    p = np
    d = nd
}

inside = 0
for (let i = 0; i < textraw.length; i++) {
    for (let j = 0; j < textraw[i].length; j++) {

        const onpath = path.some(x => x[0] === i && x[1] === j)
        if (onpath) continue

        const vr = vert.filter(x => x[0] === i && x[1] >= j)

        if (vr.length % 2 === 1) {
            inside++
        }
    }
}

console.log('Part 1:', steps / 2); // 6768
console.log('Part 2:', inside); // 351
