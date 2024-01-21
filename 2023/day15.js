const aoc = require('./aoc');
const buffer = aoc.readfile('day15.txt');

const hash = (msg) => {
    return msg.split('').reduce((a, e) => {
        a += e.charCodeAt(0)
        a *= 17
        a %= 256
        return a
    }, 0)
}

const seq = buffer.split(',')
const p1 = aoc.sum(seq.map(hash))

const boxes = Array.from(Array(256)).map(_ => [])
seq.forEach(s => {

    if (s.includes('=')) {
        const label = s.substring(0, s.indexOf('='))
        const boxIndex = hash(label)

        let box = boxes[boxIndex];

        const i = box.findIndex(([x, y]) => x === label)
        const lens = [label, parseInt(s.substring(s.indexOf('=') + 1))];

        if (i === -1) {
            box.push(lens)
        } else {
            // console.log('>>>', [...box.slice(0, i)])
            // console.log('>>>', lens)
            // console.log('>>>', [...box.slice(i + 1)])
            boxes[boxIndex] = [...box.slice(0, i), lens, ...box.slice(i + 1)]
        }
    } else {
        const label = s.substring(0, s.indexOf('-'))
        const box = hash(label)
        boxes[box] = boxes[box].filter(([x, y]) => x !== label)
    }

})
p1a = []
boxes.forEach((b, i) => {
    b.forEach((l, j) => {
        p1a.push((i + 1) * (j + 1) * (l[1]))
    })
})

console.log('Part 1:', p1); // 507291
console.log('Part 2:', aoc.sum(p1a)); // 296921
