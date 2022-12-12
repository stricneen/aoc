const aoc = require('./aoc');
const buffer = aoc.readfile('day12.txt');
const m = buffer.split(/\n/).map(x => x.split(''));
const map = m.map(x => x.map(y => y.charCodeAt(0)))

S = 83
E = 69
console.log(map)
start = []
end = []
paths = []
dists = []



for (let x = 0; x < map.length; x++) {
    dists.push([])
    for (let y = 0; y < map[0].length; y++) {
        const pos = map[x][y];
        dists[x].push(Infinity)
        if (pos === 83) {
            start = [x, y]
            map[x][y] = 97
        }
        if (pos === 69) {
            end = [x, y]
            map[x][y] = 122
        }
    }
}

const surround = ([x, y]) => {
    const up = (map[x - 1] || {})[y] === undefined ? Infinity : (map[x - 1] || {})[y];
    const down = (map[x + 1] || {})[y] === undefined ? Infinity : (map[x + 1] || {})[y];
    const left = (map[x] || {})[y - 1] === undefined ? Infinity : (map[x] || {})[y - 1];
    const right = (map[x] || {})[y + 1] === undefined ? Infinity : (map[x] || {})[y + 1];
    return [up, down, left, right];
}

pos = [[...start]]
dists[start[0]][start[1]] = 0

console.log(start)
console.log(pos)

// process.exit()
// dists[start[0]][start[1]] = 0
// t = dists[0]
// t[0] = 0
// dists[0][0] = 0
// console.log(dists)
//   Sabqponm
//   123ryxxl
//   234szExk
//   acctuvwj
//   abdefghi

//   012qponm
//   12cryxxl
//   2ccszExk
//   acctuvwj
//   abdefghi



// Sabqponm
// abcryxxl
// accszExk
// acctuvwj
// abdefghi

count = 0
// process.exit()
while (true) {

    // const stood = start
    // console.log('stood', stood)
    // const dist = dists[stood[0], stood[1]]
    // console.log('map', map)
// console.log('count',count)
    np = []
    console.log(pos.length)
    for (const [x, y] of pos) {
        const dist = dists[x][y]
        const curr = map[x][y]

        const s = surround([x,y]);
        // console.log('curr', curr, x,y)
        // console.log('surround', s)

        // if (s.includes(123)) {
        //     process.exit()
        // }


        // up
        // console.log(s[0]-curr)
        // console.log(dist+1)
        // console.log(dists[x-1][y])// > dist + 1)

        if ((s[0] - curr <= 1) && dists[x-1][y] > dist + 1) {
            dists[x-1][y] = dist + 1
            np.push([x-1,y ])
            // console.log('up')
        }
        // down
        if ((s[1] - curr  <= 1) && dists[x+1][y] > dist + 1) {
            // console.log('down')


            dists[x+1][y ] = dist + 1
            np.push([x+1, y])
        }
        //l
        if ((s[2] - curr  <= 1) && dists[x][y-1] > dist + 1) {
            
            // console.log('left')
            dists[x][y-1] = dist + 1
            np.push([x, y-1 ])
        }     
        //r
        if ((s[3] - curr  <= 1) &&  dists[x][ y+1 ] > dist + 1 ) {
            // console.log('right')
            dists[x][y+1] = dist + 1
            np.push([x, y+1 ])
        }


    }

//   Sabqponm
//   abcryxxl
//   accszExk
//   acctuvwj
//   abdefghi

//   012qponm
//   123ryxxl
//   23cszExk
//   3cctuvwj
//   abdefghi

    // console.log(dists)

    pos = np

    // console.log('pos', np)
    // console.log('----------------------')
    // if (stood === 69) break;
    count++
    // if (count === 1) break
    if (pos.length === 0) break;
}

// for (const xxx of dists) {
//     console.log(JSON.stringify(xxx))
// }

console.log(start,end)
console.log(dists[end[0]][end[1]])
// console.log(surround(start))
// p1 = Math.max(...dists.flat().filter(x => x !== Infinity))
// console.log("Part 1 : ", p1) // 120384
// console.log("Part 2 : ", solve(realmonkeys, 20, 3)) // 32059801242

// low
// 306
// 307

// high
// 428

// 422