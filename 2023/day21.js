const aoc = require('./aoc');
const buffer = aoc.readfile('day2.txt');
const raw = buffer.split(/\n/);

let start
raw.forEach((l, i) => {
    s = l.indexOf('S')
    if (s > -1) start = [[s, i]]
})

console.log(start)

// ...........
// .....###.#.
// .###.##..#.
// ..#.#...#..
// ....#O#....
// .##.OS####.
// .##..#...#.
// .......##..
// .##.#.####.
// .##..##.##.
// ...........


const at = (q) => {

    p = []
    raw.forEach(l => p.push(l))

    for ([x, y] of q) {
        p[y] = aoc.replaceAt(p[y], x, 'O')

    }

    aoc.printGrid(p)
}



// aoc.printGrid(raw)
q = [...start]
for (let step = 1; step <= 64; step++) {
    nq = []
    for ([x, y] of q) {

        n = raw[y-1][x]
        s = raw[y+1][x]
        e = raw[y][x+1]
        w = raw[y][x-1]

        // console.log(n,s,e,w)

        if ('.S'.includes(n)) nq.push([y-1,x])
        if ('.S'.includes(s)) nq.push([y+1,x])
        if ('.S'.includes(e)) nq.push([y,x+1])
        if ('.S'.includes(w)) nq.push([y,x-1])

    }

    q = [... new Set(nq.map(x => JSON.stringify(x)))].map(x => JSON.parse(x))

    at(q)

    console.log(step, q.length)
    // console.log(nq)
    console.log()
}





p1 = p2 = 0
console.log()
console.log('Part 1:', p1); // 
console.log('Part 2:', p2); // 
