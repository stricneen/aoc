const aoc = require('./aoc');
const buffer = aoc.readfile('day10.txt');
const textraw = buffer.split(/\n/);

path = []
start = []

const dup = [-1,0]
const ddown = [1,0]
const dleft = [0,-1]
const dright = [0,1]

textraw.forEach((r, i) => {
    if (r.indexOf('S') > -1) start = [i, r.indexOf('S')]
})

dir = []
if ('-FL'.split('').includes(textraw[start[0]][start[1] - 1])) dir = [0, -1]
if ('-7J'.split('').includes(textraw[start[0]][start[1] + 1])) dir = [0, 1]
if ('|F7'.split('').includes(textraw[start[0] - 1][start[1]])) dir = [-1, 0]
if ('|LJ'.split('').includes(textraw[start[0] + 1][start[1]])) dir = [1, 0]

console.log(start)
console.log(dir)

path = []
const trace = (pos, dir) => {
    npos = [pos[0] + dir[0], pos[1] + dir[1]]
    nfig = textraw[npos[0]][npos[1]]

    if (nfig === 'S') return [0,0];

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

cc = trace(start, dir)

s= 0
p=start
d=dir
path = [p]
// [ 36, 108 ]

while (true) {
    [np, nd] = trace(p,d)
    s ++
    if (aoc.eqArr([np,nd],[0,0])) break;
    // console.log(np, nd,s)
path.push(np)
    p=np
    d=nd
}
console.log(path[path.length-1])
// console.log(s/2)
// const histories = textraw.map(x => x.split(' ').map(y => parseInt(y)))

// .....
// .F-7.  F=S
// .|.|.
// .L-J.
// .....


// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.


// console.log(textraw)

p1 = 0
p2 = 0
console.log('Part 1:', s/2); // 
console.log('Part 2:', p2); // 
