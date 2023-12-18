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

const r = (least, most) => {

    // x , y , heat, dir
    const q = [[0, 0, 0, s], [0, 0, 0, e]]

    while (q.length) {

        const [x, y, heat, dir] = q.shift()

        dh = heat
        for (let i = least; i <= most; i++) {

            dx = x + (dir[0] * i)
            dy = y + (dir[1] * i)

            dh += heatAt(dx, dy)
            if (isNaN(dh)) continue

            next = [dx, dy, dh, dir]

            if (aoc.eqArr(dir, e) || aoc.eqArr(dir, w)) {
                q.push([dx, dy, dh, s])
                q.push([dx, dy, dh, n])
            }
            if (aoc.eqArr(dir, n) || aoc.eqArr(dir, s)) {
                q.push([dx, dy, dh, e])
                q.push([dx, dy, dh, w])
            }


            console.log(next)
        }
    }
}

p1 = r(1, 3)
p2 = 0
console.log()
console.log('Part 1:', p1); // 
console.log('Part 2:', p2); // 
