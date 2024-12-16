
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(16);
// const text = buffer.split(' ').map(Number);
const maze = buffer.split(/\n/);

const start = aoc.findInGrid(maze, x => x === 'S')
const [ex,ey] = aoc.findInGrid(maze, x => x === 'E')

const visited = []
const queue = [[start, aoc.dirs.R, 0]]

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

const mins = aoc.createMapArray();

while (queue.length > 0) {

    const [[x,y], [dx,dy], score] = queue.shift()

    if (mins.map().has(JSON.stringify([x,y]))) {
        const min = mins.map().get(JSON.stringify([x,y]))
        if (score < min) {
            mins.map().set(JSON.stringify([x,y]), score)
        }
        else {
            continue
        }
        
    } else {
        mins.add(JSON.stringify([x,y]), score)
    }


 
    // console.log([x,y],  [dx,dy], score)
   if (x === ex && y === ey) { 
    if (score < min) {  
        console.log('Part 1:', score)
        min = score
    }
   }

   if (visited.includes(JSON.stringify([x,y,score]))) {
       continue
   }
   visited.push(JSON.stringify([x,y,score])) 

//    const surrounding = aoc.surrounding(x,y,maze) //nsew

   for (const [ndx,ndy] of [aoc.dirs.U, aoc.dirs.D, aoc.dirs.L, aoc.dirs.R]) {
    // console.log([loc, nx,ny])
    const [nx,ny] = [x+ndx, y+ndy]
    const npos = maze[nx][ny]
    if (npos === '.' || npos === 'E') {

        let turn = 0
        if (dx !== ndx && dy !== ndy) {
            turn = 1000
        }

        disp[nx] = aoc.replaceAt(disp[nx], ny, 'O')
        queue.push([[nx,ny], [ndx,ndy], score + 1 + turn])
        
    }
   }


//    aoc.printGrid(disp)

}



p1 = p2 = 0

assert(p1 === 105508, 'p1')
assert(p2 === 96787395375634, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);