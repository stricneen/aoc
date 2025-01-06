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
            yield dirs[i] === '<' ? [-1, i] : [1, i]
        }
    }
}



const cave = [
    Array(7).fill('.'),
]

const print = (c) => {
    for (let i = c.length - 1; i >= Math.max(0); i--) {
        console.log(`|${c[i].map(x => x).join('')}|  ${i + 1}`)
    }
    console.log('---------')
    console.log()
}

const updateCave = (fn) => {
    for (let i = Math.max(0, cave.length - 50); i < cave.length - 1; i++) {
        for (let j = 0; j < 7; j++) {
            cave[i][j] = fn(i, j)
        }
    }
}

const updateCaveL = (fn) => {
    for (let i = Math.max(0, cave.length - 50); i < cave.length - 1; i++) {
        for (let j = 6; j >= 0; j--) {
            cave[i][j] = fn(i, j)
        }
    }
}

const scan = (fn) => {
    const r = []
    for (let i = Math.max(0, cave.length - 50); i < cave.length; i++) {
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
            if (right === undefined || right === '#') return '.'
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
    let t = '';
    const height = caveHeight();
    for (let i = Math.max(height - 20, 0); i < height; i++) {
        // console.log(cave[i]);
        for (let j = 0; j < 7; j++) {
            t += cave[i][j]
        }
    }
    return t
}

// base = 0

const part1 = () => {
    const p1blockCount = 2022
    const blower = blow(buffer);
    const blocks = block();

    for (let i = 0; i < p1blockCount; i++) {

        // console.log(i)

        // Add extra rows to the cave
        let base = caveHeight();
        while (cave.length < base + 8) {
            cave.push(Array(7).fill('.'))
        }

        // Add new block to the cave
        const [newBlock, _] = blocks.next().value;
        newBlock.forEach(x => cave[x[1] + base + 3][x[0] + 2] = '@')

        // Drop
        let moving = true;
        while (moving) {
            const [dir, _] = blower.next().value
            dir === -1 ? moveLeft() : moveRight()

            if (canMoveDown() === false) {
                updateCave((x, y) => cave[x][y] === '@' ? '#' : cave[x][y])
                moving = false
            }
            moveDown()
        }
    }
    return caveHeight();
}

const stateMap = new Map();
const part2 = () => {
    const p2Height = 1000000000000;
    const p1blockCount = 2022
    let statedir = 0;
    let stateblock = 0;

    const blower = blow(buffer);
    const blocks = block();

    const heights = []

    for (let i = 0; i < p1blockCount; i++) {

        // console.log(i)

        // Add extra rows to the cave
        let base = caveHeight();
        while (cave.length < base + 8) {
            cave.push(Array(7).fill('.'))
        }

        heights.push(caveHeight())

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

        // if (i > 24) {
            // get the state of block, dir * top 20 lines
            const state = `${stateblock}-${statedir}-${topTwentyRows()}`

            console.log(state)
            if (stateMap.has(state)) {
                const [li, lh] = stateMap.get(state)
                console.log('Found a loop', li, i-li, lh, caveHeight() - lh, caveHeight())
                // break;

                const blocksBeforeFirstCycle = li;
                const heightBeforeFirstCycle = lh;
                const blocksLeftafterFirstCycle = p2Height - blocksBeforeFirstCycle;
                const blocksPerCycle = i - li;
                const heightsAdeedPerCycle = caveHeight() - lh;
                const cyclesRequired = Math.trunc(blocksLeftafterFirstCycle / blocksPerCycle);

                const heightAtEndOfCycles = cyclesRequired * heightsAdeedPerCycle;

                console.log('blocksBeforeFirstCycle', blocksBeforeFirstCycle)
                console.log('heightBeforeFirstCycle', heightBeforeFirstCycle)
                console.log('blocksLeftafterFirstCycle', blocksLeftafterFirstCycle)
                console.log('cyclesRequired', cyclesRequired)
                console.log('heightsAdeedPerCycle', heightsAdeedPerCycle)
                console.log('heightAtEndOfCycles', heightAtEndOfCycles)

                const blocksRequiredAfterCycles = p2Height - blocksBeforeFirstCycle - (cyclesRequired * blocksPerCycle)
                console.log('blocksRequiredAfterCycles', blocksRequiredAfterCycles)

                console.log('heights', heights)

                const remaining = heights[heights.length - 1] - heights[heights.length - blocksRequiredAfterCycles + 1]
                console.log('remaining', remaining)

                const height = heightBeforeFirstCycle + heightAtEndOfCycles + remaining



                console.log('height', height)
                console.log(height === 1589142857183, 1589142857183 - height)
                break;
            }

            stateMap.set(state, [i, caveHeight()])
        // }
    }
    return caveHeight();
}

// 1750 cycle

const blocksBeforeFirstCycle = 264

/*

264 blocks before first cycle


Found a loop 201 35 312 53 365


312     height when first seen 
365     height at first cycle


35      blocks per cycle

53      height added each cycle

201     blocks before first cycle

312     height at first seen 

1000000000000 - 201 = 999999999799 (blocks left after first cycle)

999999999799 / 35 = 28571428565 (cycles required)

28571428565 * 53 = 1514285713945 (height at the end of 28571428565 cycles)


999999999799 % 35 = 24

1514285713945 + 

1514285714288 - 1514285713945 = 343


1514285714288 (ans)

*/


const heightAtFirstCycle = 417

const cycleHeight = 2781

// const p1 = part1();
// assert(p1 === isTest ? 3068 : 3211, 'Part 1')
// console.log('Part 1 : ', p1); //

console.log('Part 2 : ', part2()); //
// console.log('Part 2 : ', p2); //


// tl     1589142857107
//  1     1589142857108
//          1589142857183
