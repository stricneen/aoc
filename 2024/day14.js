
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(14);
const text = buffer.split(/\n/);
p1 = p2 = 0

const robots = []
for (let i = 0; i < text.length; i++) {
     robots.push(aoc.extractNums(text[i]));
}

const quads = [0, 0, 0, 0]
const room = [101, 103]

const move = (x, y, dx, dy, d = 1) => {
     return [(x + (dx * d) + (room[0] * d)) % room[0], (y + (dy * d) + (room[1] * d)) % room[1]]
}

for (const [x, y, dx, dy] of robots) {
     const [fx, fy] = move(x, y, dx, dy, 100)
     if (fx === Math.trunc(room[0] / 2)) continue;
     if (fy === Math.trunc(room[1] / 2)) continue;
     if (fx < room[0] / 2 && fy < room[1] / 2) quads[0]++
     if (fx < room[0] / 2 && fy > room[1] / 2) quads[1]++
     if (fx > room[0] / 2 && fy < room[1] / 2) quads[2]++
     if (fx > room[0] / 2 && fy > room[1] / 2) quads[3]++
 }
p1 = aoc.product(quads)

const isTree = (robots) => {
     let adj = 0
     const sr = robots.map(r => JSON.stringify([r[0], r[1]]))
     for (const [x, y, dx, dy] of robots) {
          // if (robots.filter(([nx, ny, ndx, ndy]) => nx === x + 1 && ny === y).length > 0) adj++;
          if (sr.includes(JSON.stringify([x + 1, y]))) adj++;
     }
     return adj > 100;
}

const print = (n) => {

     const c = 0
     let g = []
     for (let i = 0; i < room[1]; i++) {
          g.push(new Array(room[0]).fill('.'))
     }

     for (const [x, y] of n) {
          g[y][x] = '#'
     }


     for (let i = 0; i < room[1]; i++) {
          console.log(g[i].join(''))
     }
}

let n = [...robots]
while(!isTree(n)) {
      n = n.map(([x,y,dx,dy]) => {
          let [nx,ny] = move(x,y,dx,dy)
          return [nx,ny,dx,dy]
      })
      p2++
}

print(n)

assert(p1 === 223020000, 'p1')
assert(p2 === 7338, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);