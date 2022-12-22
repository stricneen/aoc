const { privateDecrypt } = require('crypto');
const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
// const blow = buffer

function* block() {
    while (true) {
        yield [[0, 0], [1, 0], [2, 0], [3, 0]]
        yield [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]]
        yield [[2, 0], [2, 1], [0, 2], [1, 2], [2, 2]]
        yield [[1, 0], [1, 1], [1, 2], [1, 3]]
        yield [[0, 0], [1, 0], [0, 1], [1, 1]]
    }
}

function* blow(dirs) {
    while (true) {
        for (let i = 0; i < dirs.length; i++) {
            yield dirs[i] === '<' ? -1 : 1
        }
    }
}

const directions = blow(buffer);
const blocks = block();

const cave = [
    Array(7).fill('.'),
    Array(7).fill('.'),
    Array(7).fill('.'),
    Array(7).fill('.'),
]

const print = (c) => {
    console.log(c.length)
    for (let i = c.length - 1; i >= 0; i--) {
        console.log(`|${c[i].map(x => x).join('')}|`)
    }
    console.log('---------')
    console.log()
}

const updateCave = (fn) => {
    for (let i = 0; i < cave.length; i++) {
        for (let j = 0; j < 7; j++) {
            cave[i][j] = fn(i,j)
            // if (cave[i][j] === '@') cave[i][j] = '#'
        }
    }
}

base = 0

for (let i = 0; i < 1; i++) {

    // insert at base + 3
    const newBlock = blocks.next().value;
    height = Math.max(...newBlock.map(([x,y]) => y)) + 1
    width = Math.max(...newBlock.map(([x,y]) => x)) + 1
    
    newBlock.forEach(x => cave[x[1] + base + 3][x[0] + 2] = '@')

    // at the bottom ?
    const atBottom = newBlock.map(([x,y]) => cave[x][y+1]).every(x => x !== '.')

    if (atBottom) {
        updateCave((x,y) => cave[x][y] === '@' ? '#' : x)
        // for (let i = 0; i < cave.length; i++) {
        //     for (let j = 0; j < 7; j++) {
        //         if (cave[i][j] === '@') cave[i][j] = '#'
        //     }
        // }
    } else {

        // jet
        // const dir = 
        // updateCave((x,y) => )
        

    }

    console.log(height, width, newBlock)
    console.log(atBottom)

    print(cave)

}















// for (const x of directions) {
//     console.log(x)
// }

// console.log(blow)






p1 = p2 = 0
console.log('Part 1 : ', p1); //
console.log('Part 2 : ', p2); //