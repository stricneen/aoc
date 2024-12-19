
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(16);
// const text = buffer.split(' ').map(Number);
const maze = buffer.split(/\n/);

const start = aoc.findInGrid(maze, x => x === 'S')
const [ex, ey] = aoc.findInGrid(maze, x => x === 'E')
// console.log('end', ex, ey)
const visited = []
let queue = [[start, aoc.dirs.R, 0, [JSON.stringify(start)]]]
p1 = p2 = Number.MAX_SAFE_INTEGER
// console.log(aoc.findAllInGrid(maze, x => x === '.'))
// process.exit(0)
// ###############
// #.......#....E#
// #.#.###.#.###.#
// #.....#.#...#.#
// #.###.#####.#.#
// #.#.#.......#.#
// #.#.#####.###.#
// #...........#.#
// ###.#.#####.#.# 7036
// #...#.....#.#.#
// #.#.#.###.#.#.#
// #.....#...#.#.#
// #.###.#.#.#.#.#
// #S..#.....#...#
// ###############

const disp = [...maze]

let min = Number.MAX_SAFE_INTEGER
let mindist = 0
const mint = {}

// const mins = aoc.createMapArray();
c = 0
while (queue.length > 0) {


    // console.log(mins.map())

    // console.log(queue.length)
    const [[x, y], [dx, dy], score, visited] = queue.shift()

    if (score > p1) continue

    if (x === ex && y === ey) {
        console.log('END', score)

        // console.log(visited.length)

        // 7036
        // 11048
        // 105508
        if (score < p1) {
            p1 = score
        }
        continue
    }

    // if (c++ > 50) {
    //  console.log(queue)
    //     break
    // }

    // console.log([x,y],  [dx,dy], score)
    //    if (visited.includes(JSON.stringify([x,y,score]))) {
    //        continue
    //    }
    //    visited.push(JSON.stringify([x,y,score])) 

    //    const surrounding = aoc.surrounding(x,y,maze) //nsew

    for (const [ndx, ndy] of [aoc.dirs.U, aoc.dirs.D, aoc.dirs.L, aoc.dirs.R]) {
        // console.log([loc, nx,ny])
        const [nx, ny] = [x + ndx, y + ndy]
        const key = JSON.stringify([nx, ny]);
        if (visited.includes(key)) continue

        const npos = maze[nx][ny]
        if (npos === '.' || npos === 'E') {

            let turn = 0
            if (dx !== ndx && dy !== ndy) {
                turn = 1000
            }
            const nscore = score + 1 + turn;
            queue.push([[nx, ny], [ndx, ndy], nscore, [...visited, key]])

            // if (Object.keys(mint).includes(key)) {
            //     if (nscore < mint[key]) {
            //         mint[key] = nscore
            //         queue.push([[nx,ny], [ndx,ndy], nscore, [...visited, key]])
            //     }
            // } else {
            //     mint[key] = nscore
            // }

            // if (Object.keys(mint).includes(key)) {
            //     if (nscore < mint[key]) {
            //         mint[key] = nscore
            //     }
            // } else {
            //     mint[key] = nscore

            // }


        }
    }

    queue = aoc.dedupArray(queue)
    queue.sort((a, b) => a[2] - b[2])

}

// aoc.printGrid(disp)
// console.log(mint)

// console.log('mindist', mindist)

// let out = ''
// for (const key of Object.keys(mint)) {
//     const element = JSON.parse(key);
//     // console.log(element)
//     if (mint[key] <= p1) {
//         out += `${element[0]},${element[1]},${mint[key]}\n`
//     }
// }
// require('fs').writeFileSync('maze.txt', out)


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