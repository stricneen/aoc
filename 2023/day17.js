const aoc = require('./aoc');
const buffer = aoc.readfile('day17.txt');
const textraw = buffer.split(/\n/);

seen = new Set()
pq = [[0, 0, 0, 0, 0, 0]]

while (pq.length) {
    // console.log(pq.length)
    pq.sort((x,y) => y[0] - x[0])
    let [hl, x, y, dx, dy, n] = pq.pop()

    if (x === textraw[0].length-1 && y === textraw.length-1 && n >= 4) {
        console.log( [hl, x, y, dx, dy, n])
        
        console.log(hl)
        break
    }
    // if (pq.length > 2) break

    if (seen.has(JSON.stringify([x, y, dx, dy, n]))) continue
    seen.add(JSON.stringify([x, y, dx, dy, n]))

    // console.log( [hl, x, y, dx, dy, n],textraw[x][y])


    if (n < 10 && !aoc.eqArr([dx, dy], [0, 0])) {
        nx = x + dx
        ny = y + dy
        if (nx >= 0 && nx < textraw[0].length && ny >= 0 && ny < textraw.length) {
            pq.push([hl + parseInt(textraw[ny][nx]), nx, ny, dx, dy, n + 1])
        }
    }

    if (n >= 4 || aoc.eqArr([dx, dy], [0, 0]))
        for (k of Object.keys(aoc.dirs)) {
            let [ndx, ndy] = aoc.dirs[k]
            // console.log(dx, dy, ndx, ndy)
            if (!aoc.eqArr([ndx, ndy], [dx, dy]) && !aoc.eqArr([ndx, ndy], [-dx, -dy])) {
                nx = x + ndx
                ny = y + ndy
                // console.log(dx, dy, ndx, ndy)
                if (nx >= 0 && nx < textraw[0].length && ny >= 0 && ny < textraw.length) {

                    // console.log('adding ', nx,ny,textraw[ny][nx], [hl ,parseInt(textraw[ny][nx]), nx, ny, ndx, ndy, 1])
                    pq.push([hl + parseInt(textraw[ny][nx]), nx, ny, ndx, ndy, 1])
                }
            }
        }
}




p1 = 0
p2 = 0

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
