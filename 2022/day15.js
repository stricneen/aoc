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


   
// Sensor at x=2692921, y=2988627: closest beacon is at x=2453611, y=3029623
// Sensor at x=9, y=16: closest beacon is at x=10, y=16
// row 10


// [ 2, 18, -2, 15 ]  sensor x,y beacon x,y

row = 2000000
onrow = []
t = []
for (let i = 0; i < data.length; i++) {
    console.log(data[i])
    manhatten = Math.abs(data[i][0] - data[i][2]) + Math.abs(data[i][1] - data[i][3])
    // console.log(manhatten)

    if (data[i][3] === row) {
        onrow.push(`${data[i][2]}, ${data[i][3]}`);
    }
    // from data[0],data[1] how many place can I reach on row 10

// 2,18

    distanceToRow = Math.abs(data[i][1] - row)
console.log(manhatten, distanceToRow)
    if (distanceToRow < manhatten) {
        l = []
        touch = [data[i][0], row]
        console.log('touch',touch)

        spread = Math.abs(manhatten - distanceToRow)
        console.log('spread', spread)
        for (let j = touch[0] - spread; j <= touch[0] + spread; j++) {
            l.push(`${j},${row}`)
            
        }
        // 6 <- t -> 6
        console.log(l)
        t = t.concat(l)
    }

console.log()
}
// console.log([...new Set(t)])

console.log([...new Set(t)].length - [...new Set(onrow)].length)


p1 = p2 = 0
console.log('Part 1', p1); //  4582667   .map(x => x.map(y => y.split(',')))
console.log('Part 2', p2); // 