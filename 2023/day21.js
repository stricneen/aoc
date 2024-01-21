const aoc = require('./aoc');
const buffer = aoc.readfile('day21.txt');
const raw = buffer.split(/\n/);
let sr, sc

raw.forEach((l, r) => {
    c = l.indexOf('S')
    if (c > -1) {
        sr = r
        sc = c
    }
})

// console.log(sr, sc)

const fill = (sr, sc, steps) => {
    q = [[sr, sc, steps]]
    seen = new Set()
    ans = new Set()
    seen.add(`${sr}-${sc}`)

    while (q.length) {

        const [r, c, s] = q.shift();
        if (s % 2 === 0) ans.add(`${r}-${c}`)
        if (s === 0) continue

        Object.values(aoc.dirs)
            .map(([dr, dc]) => [dr + r, dc + c])
            .forEach(([nr, nc]) => {

                if (nr < 0 || nc < 0 || nr >= raw[0].length || nc >= raw.length) return
                if (raw[nr][nc] === '#') return
                if (seen.has(`${nr}-${nc}`)) return

                seen.add(`${nr}-${nc}`)
                q.push([nr, nc, s - 1])
            })
    }
    return ans.size
}

p1 = fill(sr, sc, 64)



// Grid 131 * 131
// Start 65,65
// console.log(raw.length, raw[0].length)

steps = 26501365

size = raw.length

gridWidth = Math.floor(steps / size) - 1

odd = (Math.floor(gridWidth / 2) * 2 + 1) ** 2
even = (Math.floor((gridWidth + 1) / 2) * 2) ** 2

oddPoints = fill(sr, sc, (size * 2) + 1)
evenPoints = fill(sr, sc, size * 2)

corners = [
    fill(size - 1, sc, size - 1),
    fill(0, sc, size - 1),
    fill(sr, 0, size - 1),
    fill(sr, size - 1, size - 1),
]


ssteps = Math.floor(size / 2) - 1
small = [
    fill(0, 0, ssteps),
    fill(0, size - 1, ssteps),
    fill(size - 1, 0, ssteps),
    fill(size - 1, size - 1, ssteps),
]

lsteps = Math.floor(size * 3 / 2) - 1
large = [
    fill(0, 0, lsteps),
    fill(0, size - 1, lsteps),
    fill(size - 1, 0, lsteps),
    fill(size - 1, size - 1, lsteps),
]



// console.log(gridWidth)
// console.log(odd, even)

p2 = (odd * oddPoints) +
    (even * evenPoints) +
    aoc.sum(corners) +
    ((gridWidth + 1) * aoc.sum(small)) +
    ((gridWidth) * aoc.sum(large))

// 636438636712955 th
// 636444936338916
// 636445024541816

// 40924885401
// 7744

// console.log((odd * oddPoints) )
// console.log(even * evenPoints)
// console.log(aoc.sum(corners) )
// console.log( ((gridWidth + 1) * aoc.sum(small)))
// console.log(((gridWidth) * aoc.sum(large)))


// console.log(odd)
// console.log(oddPoints)

// 316922312545344
// 319462813740000
// 23382
// 802119500
// 5498284521

console.log()
console.log('Part 1:', p1); // 3841
console.log('Part 2:', p2); // 636391426712747


/*

26501365 steps

 Grid 131 * 131
 Start 65,65

> 26501365 - 65
            26501300
> 26501300 / 131
            202300
>



*/

// ...........
// .....###.#.
// .###.##.O#.
// .O#O#O.O#..
// O.O.#.#.O..
// .##O.S####.
// .##.O#O..#.
// .O.O.O.##..
// .##.#.####.
// .##O.##.##.
// ...........