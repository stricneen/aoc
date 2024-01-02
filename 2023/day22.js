const aoc = require('./aoc');
const buffer = aoc.readfile('day22.txt');
const raw = buffer.split(/\n/);

// 1,0,1~1,2,1
// 0,0,2~2,0,2
// 0,2,3~2,2,3
// 0,0,4~0,2,4
// 2,0,5~2,2,5
// 0,1,6~2,1,6
// 1,1,8~1,1,9
blocks = {}
max = [0, 0, 0]

raw.forEach(l => {
    let [a, b] = l.split('~')
    let [x1, y1, z1] = a.split(',').map(x => parseInt(x))
    let [x2, y2, z2] = b.split(',').map(x => parseInt(x))
    blocks[l] = [[x1, y1, z1], [x2, y2, z2]]

    max = [Math.max(...[max[0], x1, x2]), Math.max(...[max[1], y1, y2]), Math.max(...[max[2], z1, z2])]
})

expand = ([[x1, y1, z1], [x2, y2, z2]]) => {
    const r = []
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            for (let z = z1; z <= z2; z++) {
                r.push([x, y, z])
            }
        }
    }
    return r;
}


const sim = (blocks) => {
    stage = []
    settled = []

    moved = new Set()

    keys = Object.keys(blocks).map(k => [k, blocks[k][0][2]])
    // keys.push([l, z1])
    keys = keys.sort((a, b) => a[1] - b[1]).map(x => x[0])

    // const keys = Object.keys(blocks).sort((a,b) => a[2] > b[2])
    // console.log(keys)
    // process.exit()
    while (settled.length < Object.keys(blocks).length) {

        keys.forEach(b => {
            if (settled.includes(b)) return
            // console.log(blocks[b])
            const [[x1, y1, z1], [x2, y2, z2]] = blocks[b];

            const brick = expand([[x1, y1, z1], [x2, y2, z2]]);

            if (z1 === 1) {
                stage.push(...brick.map(b => JSON.stringify(b)))
                settled.push(b)
                return
            }

            const down = brick.map(([x, y, z]) => [x, y, z - 1])

            canMove = down.map(x => !stage.includes(JSON.stringify(x)))
            // console.log(canMove)
            if (canMove.every(x => x === true)) {
                blocks[b] = [down[0], down[down.length - 1]]
                moved.add(b)
            } else {
                stage.push(...brick.map(b => JSON.stringify(b)))
                settled.push(b)
            }

        })
    }
    return [blocks, moved.size]
}

const [c, _] = sim(blocks)

p1 = 0
p2 = 0
Object.keys(c).forEach(k => {
    t = {...c};
    delete t[k];
    [, m] = sim(t)
    console.log(k, m)
    if (m === 0) p1 += 1
    if (m > 0) p2 += m
    
})

console.log()
console.log('Part 1:', p1); // 
console.log('Part 2:', p2); // 
