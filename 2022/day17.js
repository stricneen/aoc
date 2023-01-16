const aoc = require('./aoc');
const buffer = aoc.readfile('day17.txt');
// const blow = buffer

function* block() {
    while (true) {
        yield [[0, 0], [1, 0], [2, 0], [3, 0]]
        yield [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]]
        yield [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]]
        yield [[0, 0], [0, 1], [0, 2], [0, 3]]
        yield [[0, 0], [1, 0], [0, 1], [1, 1]]
    }
}

// |......#|  3191

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
]

const print = (c) => {
    // console.log(c.length)
    for (let i = c.length - 1; i >= Math.max(c.length - 20, 0); i--) {
        console.log(`|${c[i].map(x => x).join('')}|  ${i+1}` )
    }
    console.log('---------')
    console.log()
}

const updateCave = (fn) => {
    for (let i = 0; i < cave.length - 1; i++) {
        for (let j = 0; j < 7; j++) {
            cave[i][j] = fn(i, j)
        }
    }
}

const updateCaveL = (fn) => {
    for (let i = 0; i < cave.length - 1; i++) {
        for (let j = 6; j >= 0; j--) {
            cave[i][j] = fn(i, j)
        }
    }
}

const scan = (fn) => {
    const r = []
    for (let i = 0; i < cave.length; i++) {
        for (let j = 0; j < 7; j++) {
            const x = fn(i, j);
            r.push(x)
        }
    }
    return r;
}

const canMoveRight = () => {
    c = scan((x, y) => {
        if (cave[x][y] === '@') {
            return cave[x][y + 1]
        }
        return false
    }).filter(x => x !== false)
    // console.log(c)
    return c.every(x => x === '@' || x === '.')
}

const canMoveLeft = () => {
    c = scan((x, y) => {
        if (cave[x][y] === '@') {
            return cave[x][y - 1]
        }
        return false
    }).filter(x => x !== false)
    // console.log(c)
    return c.every(x => x === '@' || x === '.')
}

const canMoveDown = () => {
    c = scan((x, y) => {
        if (cave[x][y] === '@' && x === 0) return '-'
        if (cave[x][y] === '@') {
            return cave[x - 1][y]
        }
    })
    // console.log(c)
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
//            if (above === '#' && spc === '') return '.'
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
            // if (left === '|') return '.'
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

base = 0
blockCount = 2022

b = 0

// blockCount = 13
for (let i = 0; i < blockCount; i++) {
console.log(i)
    moving = true

    base = caveHeight();

    while (cave.length < base + 8) {
        cave.push(Array(7).fill('.'))
    }

    
    // Add block
    const newBlock = blocks.next().value;
    newBlock.forEach(x => cave[x[1] + base + 3][x[0] + 2] = '@')
    
    // if (b > 142) print(cave)
// print(cave)

    while (moving) {
        const dir = directions.next().value
        // console.log(dir)
        if (dir === -1) {
            moveLeft()
        }
        else {
            moveRight()
        }

// if (b > 142) print(cave)
// print(cave)

        if (canMoveDown() === false) {
            updateCave((x, y) => cave[x][y] === '@' ? '#' : cave[x][y])
            moving = false


            b += newBlock.length
            if (b !== countBlocks()) {
                throw Error('nooooo')
            }
        }
        moveDown()
        // if (b > 140) print(cave)
        // print(cave)

    }
}

print(cave)

p1 = p2 = 0
console.log('Part 1 : ', caveHeight()); //
console.log('Part 2 : ', p2); //