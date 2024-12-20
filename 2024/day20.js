
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(20);
const maze = buffer.split(/\n/);

const start = aoc.findInGrid(maze, x => x === 'S');
const end = aoc.findInGrid(maze, x => x === 'E');

const race = (maze, start) => {

    const visited = []
    const map = new Map()
    let queue = [[start, 0]]
    while (queue.length > 0) {

        const [[x, y], score] = queue.shift()
        visited.push(JSON.stringify([x, y]))
        map.set(JSON.stringify([x, y]), score);

        for (const [ndx, ndy] of [aoc.dirs.U, aoc.dirs.D, aoc.dirs.L, aoc.dirs.R]) {
            const [nx, ny] = [x + ndx, y + ndy]
            const key = JSON.stringify([nx, ny]);
            if (visited.includes(key)) continue

            const npos = maze[nx][ny]
            if (npos !== '#') {
                queue.push([[nx, ny], score + 1])
            }
        }
        queue.sort((a, b) => a[1] - b[1])
    }
    return map;
}

const se = race(maze, start);
const es = race(maze, end);
const nocheats = Math.max(...se.values())

const run = (cheat) => {
    let r = 0
    for (const key of se.keys()) {

        const [sx, sy] = JSON.parse(key)
        for (let i = -cheat; i <= cheat; i++) {
            const left = cheat - Math.abs(i)
            for (let j = -left; j <= left; j++) {

                if (es.has(JSON.stringify([sx + i, sy + j]))) {
                    const distToStartCheat = se.get(key);
                    const distToEndCheat = es.get(JSON.stringify([sx + i, sy + j]));
                    const cheatDistance = Math.abs(i) + Math.abs(j);
                    const saving = nocheats - (distToStartCheat + distToEndCheat + cheatDistance);
                    if (saving >= 100) {
                        r++
                    }
                }
            }
        }
    }
    
    return r;
}

const p1 = run(2);
const p2 = run(20)

assert(p1 === 1415, 'p1')
assert(p2 === 1022577, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);




