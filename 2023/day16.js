const aoc = require('./aoc');
const buffer = aoc.readfile('day16.txt');
const map = buffer.split(/\n/);
const mapV = buffer.split(/\n/);

p1 = 0
p2 = 0

const n = [-1, 0], s = [1, 0], e = [0, 1], w = [0, -1]

beams = [{ pos: [0, 0], dir: e }]
const visitedDir = new Map()
const visited = []
visitedDir.set('[0,0]', 1)


// console.log(visited.map().keys())

const canMove = (el) => {
    if (aoc.eqArr(el.dir, n)) return el.pos[0] >= 0
    if (aoc.eqArr(el.dir, s)) return el.pos[0] < map.length
    if (aoc.eqArr(el.dir, w)) return el.pos[1] >= 0
    if (aoc.eqArr(el.dir, e)) return el.pos[1] < map[0].length

    console.log('no way', el.dir, el.pos[1], map[0].length)
}

i = 0
while (true) {

    const nbeams = beams.reduce((a, el) => {

        const vkey = JSON.stringify({ pos: el.pos, dir: el.dir });
        const key = JSON.stringify(el.pos);
        // console.log(el ,key, canMove(el))
        if (el.pos[0] >= 0 && el.pos[0] < map.length && el.pos[1] >= 0 && el.pos[1] < map[0].length) {

            //    console.log(visited.map().get(key))

            if (visitedDir.has(vkey)) {
                visitedDir.set(vkey, visitedDir.get(vkey) + 1);
            } else {
                visitedDir.set(vkey, 1);
            }

            if (visited.includes(key) === false) visited.push(key)

            // console.log(mapV[el.pos[0]])
            mapV[el.pos[0]] = aoc.replaceAt(mapV[el.pos[0]], el.pos[1], '#')
        }

        if (canMove(el) == false) return a;

        loc = map[el.pos[0]][el.pos[1]]

        // console.log(loc ,el)

        if (loc === '.') {
            a.push({ pos: [el.pos[0] + el.dir[0], el.pos[1] + el.dir[1]], dir: [...el.dir] })
        } else if (loc === '\\') {

            if (aoc.eqArr(el.dir, n)) a.push({ pos: [el.pos[0], el.pos[1] - 1], dir: [...w] })
            if (aoc.eqArr(el.dir, s)) a.push({ pos: [el.pos[0], el.pos[1] + 1], dir: [...e] })
            if (aoc.eqArr(el.dir, e)) a.push({ pos: [el.pos[0] + 1, el.pos[1]], dir: [...s] })
            if (aoc.eqArr(el.dir, w)) a.push({ pos: [el.pos[0] - 1, el.pos[1]], dir: [...n] })


        } else if (loc === '/') {
            if (aoc.eqArr(el.dir, n)) a.push({ pos: [el.pos[0], el.pos[1] + 1], dir: [...e] })
            if (aoc.eqArr(el.dir, s)) a.push({ pos: [el.pos[0], el.pos[1] - 1], dir: [...w] })
            if (aoc.eqArr(el.dir, e)) a.push({ pos: [el.pos[0] - 1, el.pos[1]], dir: [...n] })
            if (aoc.eqArr(el.dir, w)) a.push({ pos: [el.pos[0] + 1, el.pos[1]], dir: [...s] })

        } else if (loc === '|') {
            if (el.dir[0] === 0) { // ew
                a.push({ pos: [el.pos[0] + n[0], el.pos[1] + n[1]], dir: [...n] })
                a.push({ pos: [el.pos[0] + s[0], el.pos[1] + s[1]], dir: [...s] })
            } else {
                a.push({ pos: [el.pos[0] + el.dir[0], el.pos[1] + el.dir[1]], dir: [...el.dir] })
            }

        } else if (loc === '-') {
            if (el.dir[1] === 0) { // ns
                // console.log('split')
                a.push({ pos: [el.pos[0] + e[0], el.pos[1] + e[1]], dir: [...e] })
                a.push({ pos: [el.pos[0] + w[0], el.pos[1] + w[1]], dir: [...w] })
            } else {
                a.push({ pos: [el.pos[0] + el.dir[0], el.pos[1] + el.dir[1]], dir: [...el.dir] })
            }

        }

        // aoc.printGrid(mapV)
        // // console.log()
        // console.log(a)
        // console.log('-----------------')
        return a;
    }, [])

    console.log(i, nbeams.length)


    beams = nbeams.filter(x => {

        key = JSON.stringify({ pos: x.pos, dir: x.dir })
        if (visitedDir.has(key)) {
            return visitedDir.get(key) < 3

        }

        return true;

    })

    i++; if (i > 10000 || beams.length === 0) break;
}

// 9027

console.log(visitedDir)
aoc.printGrid(mapV)
aoc.printGrid(beams)

console.log()
console.log('Part 1:', visited.length); // 6605
console.log('Part 2:', p2); // 
