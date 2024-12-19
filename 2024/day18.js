
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(18);
const maze = buffer.split(/\n/).map(x => x.split(',')).map(([x, y]) => [parseInt(x), parseInt(y)]);

const run = (c) => {
    const mazeSize = 71 //71 // 7
    const fallen = maze.slice(0, c)

    const end = [mazeSize - 1, mazeSize - 1]

    const start = [0, 0]
    const q = [[start, 0]]
    const seen = []
    while (q.length) {
        const [[x, y], steps] = q.shift()
        
        if (seen.includes(JSON.stringify([x, y]))) continue
        seen.push(JSON.stringify([x, y]))
        
        if (x === end[0] && y === end[1]) {
            return steps;
        }

        for (const dir of aoc.dirsArr) {
            let [dx, dy] = dir
            let [nx, ny] = [x + dx, y + dy]
            if (nx < 0 || nx >= mazeSize || ny < 0 || ny >= mazeSize) continue
            if (fallen.filter(([a, b]) => a === x && b === y).length > 0) continue
            q.push([[nx, ny], steps + 1])
        }

        q.sort((a, b) => a[1] - b[1])

    }
    return -1
}

const p1 = run(1024)

for (let i = maze.length; i > 0; i--) {
    const r = run(i)
    if (r > 0) {
        p2 = JSON.stringify(maze[i])
        break
    }
}

assert(p1 === 416, 'p1')
assert(p2 === '[50,23]', 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
