const { stat } = require('fs');
const aoc = require('./aoc');
const { assert } = require('console');
const [buffer, isTest] = aoc.readfilePro(17);

function* block() {
    while (true) {
        yield [[[0, 0], [1, 0], [2, 0], [3, 0]], 0]
        yield [[[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]], 1]
        yield [[[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], 2]
        yield [[[0, 0], [0, 1], [0, 2], [0, 3]], 3]
        yield [[[0, 0], [1, 0], [0, 1], [1, 1]], 4]
    }
}

function* blow(dirs) {
    while (true) {
        for (let i = 0; i < dirs.length; i++) {
            yield dirs[i] === '<' ? [-1,i] : [1,i]
        }
    }
}

const blower = blow(buffer);
const blocks = block();

const cave = [
    Array(7).fill('.'),
]

const print = (c) => {
    for (let i = c.length - 1; i >= Math.max( 0); i--) {
        console.log(`|${c[i].map(x => x).join('')}|  ${i+1}` )
    }
    console.log('---------')
    console.log()
}

const updateCave = (fn) => {
    for (let i = Math.max(0, cave.length - 50) ; i < cave.length - 1; i++) {
        for (let j = 0; j < 7; j++) {
            cave[i][j] = fn(i, j)
        }
    }
}

const updateCaveL = (fn) => {
    for (let i = Math.max(0, cave.length - 50) ; i < cave.length - 1; i++) {
        for (let j = 6; j >= 0; j--) {
            cave[i][j] = fn(i, j)
        }
    }
}

const scan = (fn) => {
    const r = []
    for (let i = Math.max(0, cave.length - 50) ; i < cave.length; i++) {
        for (let j = 0; j < 7; j++) {
            const x = fn(i, j);
            r.push(x)
        }
    }
    return r;
}

const canMoveRight = () => {
    const c = scan((x, y) => {
        if (cave[x][y] === '@') {
            return cave[x][y + 1]
        }
        return false
    }).filter(x => x !== false)
    return c.every(x => x === '@' || x === '.')
}

const canMoveLeft = () => {
    const c = scan((x, y) => {
        if (cave[x][y] === '@') {
            return cave[x][y - 1]
        }
        return false
    }).filter(x => x !== false)
    return c.every(x => x === '@' || x === '.')
}

const canMoveDown = () => {
    c = scan((x, y) => {
        if (cave[x][y] === '@' && x === 0) return '-'
        if (cave[x][y] === '@') {
            return cave[x - 1][y]
        }
    })
    return c.every(x => x === undefined || x === '@' || x === '.')
}

const moveDown = () => {
    if (canMoveDown()) {
        updateCave((x, y) => {
            spc = cave[x][y]
            above = cave[x + 1][y]
            if (above === '@') return '@'
            if (spc === '@' && above === '.') return '.'
            if (spc === '@' && above === '#') return '.'
            return cave[x][y]
        })
    }
}

const moveLeft = () => {
    if (canMoveLeft()) {
        updateCave((x, y) => {
            spc = cave[x][y]
            left = cave[x][y + 1]
            if (spc === '#') return '#'
            if (left === undefined || left === '#') return '.'
            if (left === '@') return '@'
            if (spc === '@' && left === '.') return '.'
            return cave[x][y]
        })
    }
}

const moveRight = () => {
    if (canMoveRight()) {
        updateCaveL((x, y) => {
            spc = cave[x][y]
            right = cave[x][y - 1]
            if (spc === '#') return '#'
            if (right === undefined|| right === '#') return '.'
            if (right === '@') return '@'
            if (spc === '@' && right === '.') return '.'
            return cave[x][y]
        })
    }
}

const countBlocks = () => {
    const t = scan((x, y) => cave[x][y] === '#' ? 1 : 0)
    return aoc.sum(t);
}

const caveHeight = () => {
    const t = scan((x, y) => cave[x][y] === '#' ? x + 1 : 0)
    return Math.max(...t)
}

const topTwentyRows = () => {

}

// base = 0
const stateSet = new Set();
const sim = () =>{
    const p1blockCount = 2022
    let statedir = 0;
    let stateblock = 0;
    for (let i = 0; i < p1blockCount; i++) {

        // console.log(i)
    
        // Add extra rows to the cave
        let base = caveHeight();
        while(cave.length < base + 8) {
            cave.push(Array(7).fill('.'))
        }
        
        // Add new block to the cave
        const [newBlock, sblock] = blocks.next().value;
        stateblock = sblock;
        newBlock.forEach(x => cave[x[1] + base + 3][x[0] + 2] = '@')
        
        // Drop
        let moving = true;
        while (moving) {
            const [dir, sdir] = blower.next().value
            statedir = sdir;
            dir === -1 ? moveLeft() : moveRight()
     
            if (canMoveDown() === false) {
                updateCave((x, y) => cave[x][y] === '@' ? '#' : cave[x][y])
                moving = false
            }
            moveDown()
        }

        // get the state of block, dir * top 20 lines
        // const state = `${stateblock}-${statedir}-${topTwentyRows()}`

        // console.log(state)
        // if (stateSet.has(state)) {
        //     console.log('Found a loop')
        //     break;
        // }

        // stateSet.add(state)
    }
    return caveHeight();
}


const p2Height = 1000000000000;

const p1 = sim();
assert(p1 === isTest ? 3068 : 3211, 'Part 1')
console.log('Part 1 : ', p1); //
// console.log('Part 2 : ', p2); //