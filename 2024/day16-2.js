const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(16);
const maze = buffer.split(/\n/);

p1 = p2 = 0

aoc.printGrid(maze)

const start = aoc.findInGrid(maze, x => x === 'S')
const [ex, ey] = aoc.findInGrid(maze, x => x === 'E')

const queue = [[start, aoc.dirs.R, 0]]
const seen = []

c=0

while (queue.length) {


    if (c++ > 10) { 
        
            console.log(seen)
            console.log(queue)
        
        break; }

    const [[x, y], [dx, dy], score] = queue.shift();

    const next = [
        [[x + dx, y + dy], [dx, dy], score + 1],
        [[x, y], [dy, dx * -1], score + 1000],
        [[x, y], [dy * -1, dx], score + 1000]]

    for (const [[nx, ny], [ndx, ndy], score] of next) {

        if (seen.includes(`${nx},${ny},${ndx},${ndy},${score}`)) { continue; }
        seen.push(`${nx},${ny},${ndx},${ndy},${score}`);
        // if (nx < 0 || ny < 0 || ny >= maze[0].length || nx >= maze.length) {  continue; }
        if (maze[nx][ny] === '#') {  continue; }

        queue.push([[nx, ny], [ndx, ndy], score]);


    }

    // console.log(seen)

    // console.log()
    console.log(queue.length)


    queue.sort((a, b) => a[2] - b[2])
}

// console.log('end', ex, ey)

assert(p1 === 105508, 'p1')
assert(p2 === 96787395375634, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);

// // tl 509

// ###############
// #.......#....E#
// #.#.###.#.###.#
// #.....#.#...#.#
// #.###.#####.#.#
// #.#.#.......#.#
// #.#.#####.###.#
// #...........#.#
// ###.#.#####.#.#
// #...#.....#.#.#
// #.#.#.###.#.#.# 10
// #.....#...#.#.# 
// #.###.#.#.#.#.#
// #S..#.....#...# 13
// ###############