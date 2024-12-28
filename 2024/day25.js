const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(25);
const raw = buffer.split(/\n/);

const keys = []
const locks = []

const toSize = (grid) => {
    const r = []
    for (let i = 0; i < 5; i++) {
        // console.log(aoc.getCol(grid, i))
        r.push(aoc.getCol(grid, i).split('').filter(e => e === '#').length);     
    }
    return r
}

const grids = [[]]
for (const l of raw) {
    if (l.length > 0) {
        grids[grids.length-1].push(l)
    }else {
        grids.push([])
    }
}
for (const grid of grids) {
    if (grid[0] === '#####') locks.push(toSize(grid))
    else keys.push(toSize(grid))
}

let p1 = 0
for (let l = 0; l < locks.length; l++) {
    const lock = locks[l];
    for (let k = 0; k < keys.length; k++) {
        const key = keys[k];
        const trylock = []
        for (let i = 0; i < 5; i++) {
            trylock.push(lock[i] + key[i])
            
        }
        if (trylock.every(e => e < 8)) p1++
            
    }
}

assert(p1 === 3146, 'p1');
// assert(p2 === 3, 'p2');
console.log("Part 1 : ", p1);
// console.log("Part 2 : ", p2);
