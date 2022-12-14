const aoc = require('./aoc');
const buffer = aoc.readfile('day14.txt');
const data = buffer.split(/\n/)
    .map(x => x.split(' -> '))
    .map(x => x.map(y => y.split(',')))
    .map(z => z.map(([x, y]) => [parseInt(x), parseInt(y)]))



const space = ' '

const buildCave = (withFloor) => {
    const cave = Array(1000)
    for (let i = 0; i < cave.length; i++) {
        cave[i] = Array(1000).fill(space)
    }
    floor = 0
    for (let i = 0; i < data.length; i++) {
        for (const pair of aoc.window(data[i], 2)) {
            const [sx, sy] = pair[0]
            const [ex, ey] = pair[1]

            if (floor < sy) floor = sy
            if (floor < ey) floor = ey


            if (sx === ex) {
                [a, b] = aoc.sort_ints([sy, ey])
                for (let j = a; j <= b; j++) {
                    cave[j][sx] = '#';
                }
            } else {
                [a, b] = aoc.sort_ints([sx, ex])
                for (let j = a; j <= b; j++) {
                    cave[sy][j] = '#';
                }
            }
        }
    }
    if (withFloor) {
        floor += 2
        for (let i = 0; i < cave.length; i++) {
            cave[floor][i] = '#'
        }
    }
    return cave
}

const print = (c) => {
    for (let y = 0; y < 170; y++) {
        console.log('\x1b[36m', c[y].slice(300, 700).join(''), '\x1b[0m');
    }
}

const cave = buildCave(false)

const simulate = (cave) => {
    c = 0
    while (true) {
        sand = [0, 500]
        while (true) {
            if (sand[0] === 998) {
                return c; // off into the void
            }
            if (cave[sand[0] + 1][sand[1]] === space) {
                sand = [sand[0] + 1, sand[1]]
                continue;
            }
            if (cave[sand[0] + 1][sand[1] - 1] === space) {
                sand = [sand[0] + 1, sand[1] - 1]
                continue;
            }
            if (cave[sand[0] + 1][sand[1] + 1] === space) {
                sand = [sand[0] + 1, sand[1] + 1]
                continue;
            }
            if (sand[0] === 0 && sand[1] === 500) { // Blocked
                return c + 1
            }

            break;
        }
        cave[sand[0]][sand[1]] = 'O'
        c += 1

        // aoc.cls()
        // print(cave)
        // var waitTill = new Date(new Date().getTime() + 0.1 * 1000);
        // while(waitTill > new Date()){}
    }
}

console.log('Part 1', simulate(buildCave(false))); // 578
console.log('Part 2', simulate(buildCave(true))); // 24377