const aoc = require('./aoc');
const buffer = aoc.readfile('day14.txt');
const data = buffer.split(/\n/)
    .map(x => x.split(' -> '))
    .map(x => x.map(y => y.split(',')))
    .map(z => z.map(([x, y]) => [parseInt(x), parseInt(y)]))

    // print('\b'*len(old_buffer)+buffer)
aoc.cls();
// const rock = '🪨 ';
// const sand = '🟡';
const rock = '#'
const sand = 'O'
const space = ' '
const dim = 1000
const buildCave = (withFloor) => {
    const cave = Array(dim)
    for (let i = 0; i < cave.length; i++) {
        cave[i] = Array(dim).fill(space)
    }
    floor = 0
    for (let i = 0; i < data.length; i++) {
        for (const pair of aoc.window(data[i], 2)) {
            const [sx, sy] = pair[0]
            const [ex, ey] = pair[1]

            floor = Math.max(floor, sy, ey)
            // if (floor < sy) floor = sy
            // if (floor < ey) floor = ey


            if (sx === ex) {
                [a, b] = aoc.sort_ints([sy, ey])
                for (let j = a; j <= b; j++) {
                    cave[j][sx] = rock;
                }
            } else {
                [a, b] = aoc.sort_ints([sx, ex])
                for (let j = a; j <= b; j++) {
                    cave[sy][j] = rock;
                }
            }
        }
    }
    if (withFloor) {
        floor += 2
        for (let i = 0; i < cave.length; i++) {
            cave[floor][i] = rock
        }
    }
    return cave
}
let printbase = 0
let ob = ''
let sb = ''
const print = (c, base) => {
    printbase = Math.max(40, printbase , base)
    // printbase = Math.max(40, printbase)
    // ob = sb
    // sb = ''
    aoc.cls()
    for (let y = printbase - 40; y < printbase ; y++) {
        console.log('\x1b[36m', c[y].slice(360 , 530).join(''), '\x1b[0m');
    }
}

const cave = buildCave(false)

const simulate = (cave) => {
    c = 0
    while (true) {
        let pos = [0, 500]
        while (true) {
            if (pos[0] === 998) {
                return c; // off into the void
            }
            if (cave[pos[0] + 1][pos[1]] === space) {
                pos = [pos[0] + 1, pos[1]]
                continue;
            }
            if (cave[pos[0] + 1][pos[1] - 1] === space) {
                pos = [pos[0] + 1, pos[1] - 1]
                continue;
            }
            if (cave[pos[0] + 1][pos[1] + 1] === space) {
                pos = [pos[0] + 1, pos[1] + 1]
                continue;
            }
            if (pos[0] === 0 && pos[1] === 500) { // Blocked
                return c + 1
            }

            break;
        }
        cave[pos[0]][pos[1]] = sand
        c += 1

        
        print(cave, pos[0])
        var waitTill = new Date(new Date().getTime() + 0.1 * 1000);
        while(waitTill > new Date()){}
    }
}
// print(cave)
// console.log('🪨')
// console.log('Part 1', simulate(buildCave(false))); // 578
console.log('Part 2', simulate(buildCave(true))); // 24377