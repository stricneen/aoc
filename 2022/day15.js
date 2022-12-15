const aoc = require('./aoc');
const buffer = aoc.readfile('day15.txt');

// var regex = /=(\d+)/;

const parse = (l) => {
    let regex = /[-+]?\d+/g
    return t = [...l.matchAll(regex)]
        .map(x => parseInt(x[0]))
}

// const found = paragraph.match(regex);
const data = buffer.split(/\n/)
    .map(x => parse(x))
    .map(x => [...x, Math.abs(x[0] - x[2]) + Math.abs(x[1] - x[3])])



// Sensor at x=2692921, y=2988627: closest beacon is at x=2453611, y=3029623


// Sensor at x=9, y=16: closest beacon is at x=10, y=16
// row 10

//  0 -> 400
//  |
//  400
// 4000000
// 0 - 400000
// [ 2, 18, -2, 15 ]  sensor x,y beacon x,y
max = 4000000
// ground = []
// for (let x = 0; x < max + 1; x++) {
//     for (let y = 0; y < max + 1; y++) {
//         ground.push(`${x},${y}`)
//     }
// }
// console.log('ground')



// row = 10
onrow = []
t = []
const canReach = (x, y) => {
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i])
        distance = Math.abs(data[i][0] - x) + Math.abs(data[i][1] - y)
        // console.log(manhatten)
        if (distance <= data[i][4]) return true
    }
    return false
}
// console.log()
const edges = (data) => {
    const e = []
    const [x, y] = [data[0], data[1]]
    const dist = data[4] +1
    // console.log(x,y,dist)
    c= 0
    for (let i = x - dist; i <= x + dist; i++) {
        
            e.push([i, y- c])
            e.push([i, y+ c])
            
            c++
            // e.push([i + dist + dist, j])
    }
    // 2  10,10

    // 10 10
    // 9  11
    // 8  12
    // 9  11
    // 10 10

    //    10,8
    //  9,9    11,9
    // 8,10  x  12,10 
    //  9,11    11, 11
    //    10,12

    // console.log(data)
    // console.log(e)
    return e
}

console.log(edges([10,10,0,0,1]))

for (let i = 0; i < data.length; i++) {
    for (const [x, y] of edges(data[i])) {
        if (x >=0 && y >= 0 && x <= max && y <= max && !canReach(x, y)) {
            console.log(x, y, (x * 4000000) + y)
            // process.exit()
        }
    }
    // const element = data[i];
    // if (!canReach(x, y)) {
    //     console.log(x, y, (x * 4000000) + y)
    //     process.exit()
    // }
}


// for (let x = 1000000; x < 3000000; x++) {
//     for (let y = 1000000; y < 3000000; y++) {
//         if (!canReach(x, y)) {
//             console.log(x, y, (x * 4000000) + y)
//             process.exit()
//         }
//     }
// }

// console.log([...new Set(t)])

// console.log([...new Set(t)].length - [...new Set(onrow)].length)
// console.log(ground)
// qq = ground[0].split(',')
// p2 = (parseInt(qq[0]) * 4000000) + parseInt(qq[1])

p1 = p2 = 0
console.log('Part 1', p1); //  4582667   .map(x => x.map(y => y.split(',')))
console.log('Part 2', p2); // 