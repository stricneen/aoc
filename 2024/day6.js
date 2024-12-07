const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(6);
const text = buffer.split(/\n/);


p1 = p2 = 0

const route = []
const run = (grid, save=false) => {
    // aoc.printGrid(grid)
    pos = aoc.findInGrid(grid, x => x === '^')
    l = grid[pos[0]]
    grid[pos[0]] = aoc.replaceAt(grid[pos[0]], pos[1], '*')    

    dir = aoc.dirs.U;
    c = 0
    while (true) {
        nextPos = [pos[0] + dir[0], pos[1] + dir[1]]
        if (nextPos[0] < 0 || nextPos[0] >= grid.length || nextPos[1] < 0 || nextPos[1] >= grid[nextPos[0]].length) {
            break;
        };
        next = grid[nextPos[0]][nextPos[1]]
        if (next === '.' || next === '*') {
            l = grid[pos[0]]
            grid[pos[0]] = aoc.replaceAt(grid[pos[0]], pos[1], '*')    
            pos = nextPos
            if (save) {
                route.push([pos[0], pos[1]])
            }
        } else {
            if (dir === aoc.dirs.U) { dir = aoc.dirs.R }
            else if (dir === aoc.dirs.R) { dir = aoc.dirs.D }
            else if (dir === aoc.dirs.D) { dir = aoc.dirs.L }
            else if (dir === aoc.dirs.L) { dir = aoc.dirs.U }
        }
        c++
        if (c > 9000) {
            // break;
            return undefined
        }
    }
   
    return grid;
}

p1 = run(aoc.copyGrid(text), true).reduce((a, x) => {
    return a + x.split('').filter(x => x === '*').length
}, 0) + 1


const setRoute = [...new Set(route.map(x => JSON.stringify(x)))].map(x => JSON.parse(x))
p2 = setRoute.reduce((a, [x,y]) => {
    n = aoc.copyGrid(text)
    if (n[x][y] === '^') {
        return a;
    }
    n[x] = aoc.replaceAt(n[x], y, 'O')
    xxx = run(n)
    return xxx === undefined ? a + 1 : a
}, 0)

assert(p1 === 5212, 'p1')
assert(p2 === 1767, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
