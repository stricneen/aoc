
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(20);
// const text = buffer.split(' ').map(Number);
const maze = buffer.split(/\n/);

const start = aoc.findInGrid(maze, x => x === 'S')
const [ex, ey] = aoc.findInGrid(maze, x => x === 'E')
let p1 = p2 = Number.MAX_SAFE_INTEGER

const race = (maze) => {

    const visited = []
    let queue = [[start, 0]]
    while (queue.length > 0) {

        const [[x, y], score] = queue.shift()

        if (x === ex && y === ey) {
            return score
        }

        for (const [ndx, ndy] of [aoc.dirs.U, aoc.dirs.D, aoc.dirs.L, aoc.dirs.R]) {
            // console.log([loc, nx,ny])
            const [nx, ny] = [x + ndx, y + ndy]
            const key = JSON.stringify([nx, ny]);
            if (visited.includes(key)) continue

            visited.push(key)
            const npos = maze[nx][ny]
            if (npos === '.' || npos === 'E') {

                queue.push([[nx, ny], score + 1])

            }
        }

        // queue = aoc.dedupArray(queue)x/x/
        queue.sort((a, b) => a[1] - b[1])

    }
}


const nocheat = race(maze)
const map = new Map()
for (let i = 1; i < maze[0].length - 1; i++) {
    for (let j = 1; j < maze.length - 1; j++) {


        const r = maze[i][j];
        if (r === '#') {

            let surc = 0;
            const sur = aoc.surrounding(i, j, maze)
            for (let k = 0; k < sur.length; k++) {
                if (sur[k][0] === '#') {
                    surc++
                }
            }
            // if (surc >= 3) continue
            // console.log(i,j)
            let cheatMaze = aoc.copyGrid(maze);
            cheatMaze[i] = aoc.replaceAt(cheatMaze[i], j, '.')

            // aoc.printGrid(cheatMaze)

            const cheat = race(cheatMaze)
            console.log(i, j, nocheat - cheat)

            if (nocheat - cheat > 0) {
                map.set(nocheat - cheat, map.get(nocheat - cheat) + 1 || 1)
            }

        }
    }
}

console.log(map)
p1 = 0
for (const key of map.keys()) {
    if (key >= 100) {
        p1 += map.get(key)
    }
}


assert(p1 === 105508, 'p1')
assert(p2 === 96787395375634, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
