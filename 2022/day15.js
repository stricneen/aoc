const aoc = require('./aoc');
const buffer = aoc.readfile('day15.txt');

const data = buffer.split(/\n/)
    .map(aoc.extractNums)
    .map(x => [...x, Math.abs(x[0] - x[2]) + Math.abs(x[1] - x[3])])

const max = 4000000
const row = 2000000

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
    const dist = data[4] + 1
    c = 0
    for (let i = x - dist; i <= x + dist; i++) {
        e.push([i, y - c])
        e.push([i, y + c])
        c++
    }
    return e
}

const p1 = () => {
    onrow = []
    t = []
    for (let i = 0; i < data.length; i++) {
        manhatten = Math.abs(data[i][0] - data[i][2]) + Math.abs(data[i][1] - data[i][3])

        if (data[i][3] === row) {
            onrow.push(`${data[i][2]}, ${data[i][3]}`);
        }

        distanceToRow = Math.abs(data[i][1] - row)
        if (distanceToRow < manhatten) {
            l = []
            touch = [data[i][0], row]
            spread = Math.abs(manhatten - distanceToRow)
            for (let j = touch[0] - spread; j <= touch[0] + spread; j++) {
                l.push(`${j},${row}`)
            }
            t = t.concat(l)
        }
    }
    return [...new Set(t)].length - [...new Set(onrow)].length;
}

// Part 2 scan
const p2 = () => {
    for (let i = 0; i < data.length; i++) {
        for (const [x, y] of edges(data[i])) {
            if (x >= 0 && y >= 0 && x <= max && y <= max && !canReach(x, y)) {
                // console.log(x, y, (x * 4000000) + y)
                return (x * 4000000) + y;
            }
        }
    }
}

console.log('Part 1 : ', p1()); //  4582667   
console.log('Part 2 : ', p2()); // 10961118625406