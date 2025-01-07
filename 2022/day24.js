const aoc = require('./aoc');
const [buffer, test] = aoc.readfilePro(24);
// const buffer = aoc.readfile('day.txt');
const data = buffer.split(/\n/)

const parse = (data) => {
    const blizzards = []
    for (let l = 0; l < data.length; l++) {
        for (let j = 0; j < data[0].length; j++) {
            const e = data[l][j];
            if (e === '^') blizzards.push([j, l, e, [0, -1]])
            if (e === 'v') blizzards.push([j, l, e, [0, 1]])
            if (e === '>') blizzards.push([j, l, e, [1, 0]])
            if (e === '<') blizzards.push([j, l, e, [-1, 0]])
        }
    }
    return [
        [data[0].indexOf('.'), 0],
        [data[data.length - 1].indexOf('.'), data.length - 1],
        blizzards
    ];
}

const print = ([start, end, mark, blizzards]) => {
    let p = ''
    for (let y = 0; y < end[1] + 1; y++) {
        for (let x = 0; x < end[0] + 1; x++) {
            let t = '.'
            if (x === 0 || y === 0 || x === end[0] + 1 || y === end[1]) t = '#'

            if (start[0] === x && start[1] === y) t = 's'
            if (end[0] === x && end[1] === y) t = 'e'


            const b = blizzards.find(b => b[0] === x && b[1] === y);
            if (b) t = b[2]

            if (mark[0] === x && mark[1] === y) t = 'E'

            p += t
        }
        p += '#\n'
    }
    console.log(p + '\n')
}

const step = (blizzards) => {
    const xbound = (x) => x === 0 ? data[0].length - 2 : x === data[0].length - 1 ? 1 : x;
    const ybound = (y) => y === 0 ? data.length - 2 : y === data.length - 1 ? 1 : y;
    const nblizzards = []
    for (const [x, y, d, [dx, dy]] of blizzards) {

        const [nx, ny] = [
            xbound(x + dx),
            ybound(y + dy)
        ];

        nblizzards.push([nx, ny, d, [dx, dy]])
    }
    return nblizzards
}

const [start, end, blizzards] = parse(data)


const traverse = (start, end, blizzards) => {
    let nblizzards = [...blizzards]
    // print([start, end, start, nblizzards])

    let q = [[start[0], start[1], 0]];
    let next = [];
    while (true) {
        while (q.length) {
            let [x, y, steps] = q.pop();

            // console.log(x, y, steps)
            // print([start, end, [x, y], nblizzards])

            if (x === end[0] && y === end[1]) {
                return [steps, nblizzards];
            }

            if (!nblizzards.some(b => b[0] === x && b[1] === y))
                next.push([x, y, steps + 1])

            for (const [dx, dy] of aoc.dirsArr) {

                const [nx, ny] = [x + dx, y + dy];
                if (nx === end[0] && ny === end[1]) {
                    next.push([nx, ny, steps + 1])
                }


                if (nx <= 0 || ny <= 0 || nx >= data[0].length - 1 || ny >= data.length - 1) continue;
                const blizzard = nblizzards.find(b => b[0] === nx && b[1] === ny);
                if (!blizzard) {
                    next.push([nx, ny, steps + 1])
                }
            }
        }

        q = aoc.dedupArray(next);
        next = []
        nblizzards = step(nblizzards)
    }

}

const [p1, b1] = traverse(start, end, step(blizzards))
const [p2a, b2a] = traverse(end, start, b1)
const [p2b, _] = traverse(start, end, b2a)

// console.log(p1, p2a, p2b)

console.log('Part 1 : ', p1); // 343
console.log('Part 2 : ', p1 + p2a + p2b); // 960

