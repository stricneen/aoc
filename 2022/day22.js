const aoc = require('./aoc');
const buffer = aoc.readfile('day22.txt');
const data = buffer.split(/\n/)

const moves = data[data.length - 1].split('').reduce((a, e) => {
    if (isNaN(e)) {
        a.push(e)
        a.push('')
    } else {
        a[a.length - 1] += e
    }
    return a
}, ['']).filter(x => x !== '').map(x => isNaN(x) ? x : parseInt(x))

const UP = '-1,0'
const DOWN = '1,0'
const LEFT = '0,-1'
const RIGHT = '0,1'


const mov1 = ([x, y], [dx, dy], [xa, xb]) => {
    max = 200
    npx = (x + dx + max) % max
    npy = (y + dy + max) % max

    while (true) {
        next = map[npx][npy]

        if (next === '.' || next === 'o') { 
            return [npx, npy, dx, dy]
        }

        if (next === '#') {
            if (x < 0 || y < 0 || x > 199) return [xa, xb, dx, dy]
            return [x, y, dx, dy]
        }

        npx = (npx + dx + max) % max
        npy = (npy + dy + max) % max
    }
}

const mov2 = ([x, y], [dx, dy]) => {

    if (dx === -1) { // up
        if (y < 50) return mov1([y + 50, 49], [0, 1], [x,y])
        if (y < 100) return mov1([y + 100, -1], [0, 1], [x,y]) // *
        if (y < 150) return mov1([200, y - 100], [-1, 0], [x,y])
    }

    if (dx === 1) { // down
        if (y < 50) return mov1([-1, y + 100], [1, 0], [x,y])
        if (y < 100) return mov1([y + 100, 51], [0, -1], [x,y])
        if (y < 150) return mov1([y - 50, 102], [0, -1], [x,y])
    }

    if (dy === -1) { // left
        if (x < 50) return mov1([149 - x, -1], [0, 1], [x,y])
        if (x < 100) return mov1([99, x - 50], [1, 0], [x,y])
        if (x < 150) return mov1([149 - x , 49], [0, 1], [x,y]) // *
        if (x < 200) return mov1([-1, x - 100], [1, 0], [x,y]) // *
    }

    if (dy === 1) { // right
        if (x < 50) return mov1([149 - x, 100], [0, -1], [x,y]) // *
        if (x < 100) return mov1([50, x + 50], [-1, 0], [x,y])
        if (x < 150) return mov1([149 - x, 150], [0, -1], [x,y])
        if (x < 200) return mov1([150, x - 100], [-1, 0], [x,y])

    }
    throw new Error('Bad data')
}

const solve = (fn) => {
    // start point 
    map = data.filter(x => x.includes('.')).map(x => x.split(''))
    pos = [0, map[0].findIndex(x => x === '.')]
    dir = [0, 1]

    for (const move of moves) {
        sdir = dir.toString()
        
        if (Number.isInteger(move)) { // move

            for (let i = 0; i < move; i++) {

                nextpos = [pos[0] + dir[0], pos[1] + dir[1]]
                next = (map[nextpos[0]] || {})[nextpos[1]]
                if (next === undefined || next === ' ') { // edge of map
                    
                    nextpos = fn(pos, dir, pos)
                    next = map[nextpos[0]][nextpos[1]]
                    dir = [nextpos[2], nextpos[3]]
                }

                if (next === '.' || next === 'o') {
                    pos = nextpos;
                    map[pos[0]][pos[1]] = 'o'
                }
                if (next === '#') break;

            }
        } else { // turn
            if (move === 'R') {
                if (sdir === RIGHT) { dir = [1, 0] }
                if (sdir === DOWN) { dir = [0, -1] }
                if (sdir === LEFT) { dir = [-1, 0] }
                if (sdir === UP) { dir = [0, 1] }
            } else {
                if (sdir === RIGHT) { dir = [-1, 0] }
                if (sdir === DOWN) { dir = [0, 1] }
                if (sdir === LEFT) { dir = [1, 0] }
                if (sdir === UP) { dir = [0, -1] }
            }
            sdir = dir.toString()
        }
    }
    return ((pos[0] + 1) * 1000) + ((pos[1] + 1) * 4) + [RIGHT, DOWN, LEFT, UP].indexOf(sdir)
}

console.log('Part 1 : ', solve(mov1)); //  165094
console.log('Part 2 : ', solve(mov2)); // 95316
