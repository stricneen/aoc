const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const textraw = buffer.split(/\n/);

aoc.printGrid(textraw)

const w = [-1, 0], e = [1, 0], n = [0, -1], s = [0, 1]

//      0,0         12,0  
//       2413432311323
//       3215453535623
//       3255245654254
//       3446585845452
//       4546657867536
//       1438598798454
//       4457876987766
// 0,12  3637877979653  12,12

const heatAt = (x, y) => {
    return parseInt(textraw[y][x])
}

const valid = (x, y) => x >= 0 && y >= 0 && x < textraw[0].length && y < textraw.length

const shortest = []
for (let i = 0; i < textraw.length; i++) {
    l = []
    for (let j = 0; j < textraw[0].length; j++) {
        l.push(Number.MAX_SAFE_INTEGER)
    }
    shortest.push(l)    
}

// console.log(shortest)

const r = (least, most) => {

    // x , y , heat, dir
     q = [[0, 0, 0, s], [0, 0, 0, e]]

    while (q.length) {

        const [x, y, heat, dir] = q.shift()

        dh = heat
        for (let i = least; i <= most; i++) {

            dx = x + (dir[0] * i)
            dy = y + (dir[1] * i)

            if (!valid(dx, dy)) continue

            // console.log(dx, dy)
            dh += heatAt(dx, dy)
            if (isNaN(dh)) continue

            next = [dx, dy, dh, dir]
            console.log(next)

            if (aoc.eqArr(dir, e) || aoc.eqArr(dir, w)) {
                q.push([dx, dy, dh, s])
                q.push([dx, dy, dh, n])
            }
            if (aoc.eqArr(dir, n) || aoc.eqArr(dir, s)) {
                q.push([dx, dy, dh, e])
                q.push([dx, dy, dh, w])
            }
        }
        
        console.log('>>>>>', q.length)
        console.log(q)
        q.forEach(([x,y,d,p]) => {
            if (d < shortest[y][x]) {
                shortest[y][x] = d
            }
        })

        q = q.reduce((a, [x,y,d,p]) => {
            if (d <= shortest[y][x]) {
                a.push([x,y,d,p])
            }
            return a
        }, [])

        
        // console.log(shortest)
        
        
        // if (q.length> 3)  { 
            //     console.log(q)
            //     process.exit()
            // }
        }
        q.sort(([x1,y1,h1,p1], [x2,y2,h2,p2]) => {
            return h1 - h2
        })
}
p1 = r(1, 3)
p2 = 0
console.log(shortest)
console.log()
console.log('Part 1:', p1); // 
console.log('Part 2:', p2); // 


// 2413432311323
// 3215453535623
// 3255245654254
// 3446585845452
// 4546657867536

// 2>>34^>>>1323
// 32v>>>35v5623
// 32552456v>>54
// 3446585845v52
// 4546657867v>6


// 0, *4, *5,  8, 19,*22,*24,*27,*36, 37, 40, 42, 50
// 3,  5, *6,*11,*15,*20, 27, 32,*35, 40, 46, 44, 47
// 6,  7, 11, 16, 17, 21, 26, 32,*40,*44,*46, 49, 51
