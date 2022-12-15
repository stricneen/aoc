const aoc = require('./aoc');
const buffer = aoc.readfile('day15.txt');

const parse = (l) => {
    let regex = /[-+]?\d+/g
    return t = [...l.matchAll(regex)]
        .map(x => parseInt(x[0]))
}

const data = buffer.split(/\n/)
    .map(x => parse(x))
    .map(x => [...x, Math.abs(x[0] - x[2]) + Math.abs(x[1] - x[3])])

const max = 4000000

const canReach = (x, y) => {
    for (let i = 0; i < data.length; i++) {
        distance = Math.abs(data[i][0] - x) + Math.abs(data[i][1] - y)
        if (distance <= data[i][4]) return true
    }
    return false
}

const edges = (data) => {
    const e = []
    const [x, y] = [data[0], data[1]]
    const dist = data[4] +1
    c = 0
    for (let i = x - dist; i <= x + dist; i++) {  
            e.push([i, y- c])
            e.push([i, y+ c])
            c++
    }
    return e
}

// Part 2 scan
for (let i = 0; i < data.length; i++) {
    for (const [x, y] of edges(data[i])) {
        if (x >=0 && y >= 0 && x <= max && y <= max && !canReach(x, y)) {            
            // console.log(x, y, (x * 4000000) + y)
            p2 = (x * 4000000) + y;
            i = data.length
            break;
        }
    }
}

// console.log([...new Set(t)])

// console.log([...new Set(t)].length - [...new Set(onrow)].length)
// console.log(ground)
// qq = ground[0].split(',')
// p2 = (parseInt(qq[0]) * 4000000) + parseInt(qq[1])

p1 = 0
console.log('Part 1', p1); //  4582667   
console.log('Part 2', p2); // 10961118625406