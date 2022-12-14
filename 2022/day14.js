const aoc = require('./aoc');
const buffer = aoc.readfile('day14.txt');
const data = buffer.split(/\n/)
    .map(x => x.split(' -> '))
    .map(x => x.map(y => y.split(',')))
    .map(z => z.map(([x, y]) => [parseInt(x), parseInt(y)]))

const cave = Array(1000)
for (let i = 0; i < cave.length; i++) {
    cave[i] = Array(1000).fill('.')
}


// Build cave
for (let i = 0; i < data.length; i++) {
    for (const pair of aoc.window(data[i], 2)) {
        const [sx, sy] = pair[0]
        const [ex, ey] = pair[1]
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

const p = (c) => {
    for (let y = 0; y < 100; y++) {
        console.log(c[y].slice(400, 600).join(''))
    }
}

c = 0
while (true) {

// console.log(c)
    sand = [0,500]
    while (true) {
        // console.log(sand[0])
        // down ?
        if (sand[0] === 998) {
            console.log(c)
            p(cave)
            process.exit()
        }
        if (cave[sand[0] + 1][sand[1]] === '.') {
            sand = [sand[0] + 1, sand[1]]
            continue;
        }

        if (cave[sand[0] + 1][sand[1] - 1] === '.') {
            sand = [sand[0] + 1, sand[1] -1]
            continue;
        }
        if (cave[sand[0] + 1][sand[1] + 1] === '.') {
            sand = [sand[0] + 1, sand[1] +1]
            continue;
        }

     
        break;
    }
    cave[sand[0]][sand[1]] = 'O'
    c+=1
    // if (c > 24) break;
}





p(cave)


p1 = p2 = 0
console.log('Part 1', p1); // 
console.log('Part 2', p2);   // 