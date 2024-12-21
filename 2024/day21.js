const { assert, dir } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(21);
const codes = buffer.split(/\n/);

p1 = p2 = 0

const numPad = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ['#', "0", 'A']
]

dirs = {
    '>': [0, 1],
    'v': [1, 0],
    '<': [0, -1],
    '^': [-1, 0],
}

const changes = (arr) => {
    let c = 0
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] !== arr[i]) {
            c++
        }
    }
    return c;
}

const pathFindNumPad2 = (curr, dest) => {
    // console.log(curr, dest)
    const s = aoc.findInGrid(numPad, (x) => x === curr);
    const q = [[s, [curr], []]];
    const paths = []
    while (q.length) {
        // console.log(q[0])
        const [[x, y], p, p2] = q.shift();
        // console.log(x,y,p)

        if (numPad[x][y] === dest) {
            paths.push(p2)
            continue
        }

        for (const dir of '^>v<'.split('')) {
            const [dx, dy] = dirs[dir]
            const [nx, ny] = [x + dx, y + dy];
            if (nx >= 0 && nx < numPad.length && ny >= 0 && ny < numPad[0].length) {
                if (numPad[nx][ny] === '#') continue
                if (p.includes(numPad[nx][ny])) continue
                q.push([[nx, ny], [...p, numPad[nx][ny]], [...p2, dir]])
            }
        }
    }

    const min = Math.min(...paths.map(x => x.length))
    return paths.filter(x => x.length === min).filter(x => changes(x) < 2)

    // +---+---+---+
    // | 7 | 8 | 9 |
    // +---+---+---+
    // | 4 | 5 | 6 |
    // +---+---+---+
    // | 1 | 2 | 3 |
    // +---+---+---+
    //     | 0 | A |
    //     +---+---+


}


// const r = pathFindNumPad2(3, 7)
// console.log(r)
// process.exit(0)
// 379A
// ^A^^<<A>>AvvvA


const pathFindNumPad = (c, dest) => {
    //   console.log(c, dest)
    let curr = c
    let q = [[c, '']]
    let path = ''
    while (curr !== dest) {
        // console.log(q)
        curr = q[q.length - 1][0]
        if (curr === dest) {
            // console.log(c, dest, [...path, 'A'])
            return [...path, 'A']
        }

        if (curr === -1) {
            if (dest === 0) {
                q.push([0, path += '<'])
            } else {
                q.push([3, path += '^'])
            }
        }

        if (curr === 0) {
            if (dest === -1) {
                q.push([-1, path += '>'])
            } else {
                q.push([2, path += '^'])
            }
        }

        if (curr === 1) {
            if (dest > 3) {
                q.push([4, path += '^'])
            } else {
                q.push([2, path += '>'])
            }
        }

        if (curr === 2) {
            if (dest === 1) {
                q.push([1, path += '<'])
            } else if (dest === 3) {
                q.push([3, path += '>'])
            } else if (dest > 3) {
                q.push([5, path += '^'])
            } else {
                q.push([0, path += 'v'])
            }
        }

        if (curr === 3) {
            if (dest > 3) {
                q.push([6, path += '^'])
            } else if (dest === 2 || dest === 1) {
                q.push([2, path += '<'])
            } else {
                q.push([-1, path += 'v'])
            }
        }

        if (curr === 4) {
            if (dest > 6) {
                q.push([7, path += '^'])
            } else if (dest === 5 || dest === 6) {
                q.push([5, path += '>'])
            } else {
                q.push([1, path += 'v'])
            }
        }

        if (curr === 5) {
            if (dest === 4) {
                q.push([4, path += '<'])
            } else if (dest === 6) {
                q.push([6, path += '>'])
            } else if (dest > 6) {
                q.push([8, path += '^'])
            } else {
                q.push([2, path += 'v'])
            }
        }

        if (curr === 6) {
            if (dest > 6) {
                q.push([9, path += '^'])
            } else if (dest === 5 || dest === 4) {
                q.push([5, path += '<'])
            } else {
                q.push([3, path += 'v'])
            }
        }


        if (curr === 7) {
            if (dest > 7) {
                q.push([8, path += '>'])
            } else {
                q.push([4, path += 'v'])
            }
        }

        if (curr === 8) {
            if (dest === 9) {
                q.push([9, path += '>'])
            } else if (dest === 7) {
                q.push([7, path += '<'])
            } else {
                q.push([5, path += 'v'])
            }
        }

        if (curr === 9) {
            if (dest < 7) {
                q.push([6, path += 'v'])
            } else {
                q.push([8, path += '<'])
            }
        }


        // +---+---+---+
        // | 7 | 8 | 9 |
        // +---+---+---+
        // | 4 | 5 | 6 |
        // +---+---+---+
        // | 1 | 2 | 3 |
        // +---+---+---+
        //     | 0 | A |  < 10
        //     +---+---+
    }

}

//     +---+---+
//     | ^ | A |
// +---+---+---+
// | < | v | > |
// +---+---+---+

const pathFindDir = (c, dest) => {

    let curr = c
    let path = ''
    let q = [[c, '']]
    // console.log(c, dest)
    while (curr !== dest) {
        // console.log(curr, dest, path)
        switch (curr) {
            case 'A':
                if (dest === '^') {
                    curr = '^'
                    path += '<'
                } else {
                    curr = '>'
                    path += 'v'
                }
                break;

            case '^':
                if (dest === 'A') {
                    curr = 'A'
                    path += '>'
                } else {
                    curr = 'v'
                    path += 'v'
                }
                break;

            case '<':

                curr = 'v'
                path += '>'
                break;

            case '>':

                if (dest === 'A') {
                    curr = 'A'
                    path += '^'
                } else {
                    curr = 'v'
                    path += '<'
                }
                break

            case 'v':

                if (dest === '<') {
                    curr = '<'
                    path += '<'
                } else if (dest === '>') {
                    curr = '>'
                    path += '>'
                } else if (dest === 'A') {
                    curr = '>'
                    path += '>'
                } else {
                    curr = '^'
                    path += '^'
                }
                break
        }

    }

    // console.log(path+'A')
    // console.log()
    return path + 'A'
}


const keypad = (type) => {
    let r = ['']
    for (const [c, d] of aoc.window(type.split(''), 2)) {
        let t = []
        const p = pathFindNumPad2(c, d)
        for (const rr of r) {
            for (const pp of p) {
                t.push(rr + pp.join('') + 'A')
            }
        }
        r = t
    }
    return r
}

const dirpad = (type) => {
    const r = []
    for (const [c, d] of aoc.window(type.split(''), 2)) {
        // console.log(curr,dest)
        const p = pathFindDir(c, d)
        r.push(p)
        // console.log('>>>>',p)
    }
    return r.flat().join('')
}


const complexity = (type) => {

    const paths = keypad('A' + type)
    let min = Number.MAX_SAFE_INTEGER
    for (const path of paths) {
        const path2 = dirpad('A' + path)
        const path3 = dirpad('A' + path2)
        if (min > path3.length) {
            min = path3.length
        }
    }

    return min * aoc.extractStrictNums(type)[0]
}

for (const comb of codes) {
    p1 += complexity(comb)
}


assert(complexity('029A') === 68 * 29, '029A')
assert(complexity('980A') === 60 * 980, '980A')
assert(complexity('179A') === 68 * 179, '179A')
assert(complexity('456A') === 64 * 456, '456A')
assert(complexity('379A') === 64 * 379, '379A')


assert(p1 === 278568, 'p1')
assert(p2 === 1022577, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);