
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(12);
// const text = buffer.split(' ').map(Number);
const text = buffer.split(/\n/);

p1 = p2 = 0

// const start = [0, 0]

const charAt = ([x, y]) => text[y][x]



// AAAA
// BBCD
// BBCC
// EEEC


p1 = p2 = 0

const regions = []
const queue = [[0, 0, text[0][0]]]
const nq = []
const visited = []
let id = 0
while (queue.length > 0 || nq.length > 0) {

     const [x, y, c] = queue.length > 0 ? queue.pop() : nq.pop()
     const currString = JSON.stringify([x, y]);
     visited.push(currString)
     const surrounding = aoc.surrounding(x, y, text)
     for (const [r, x1, y1] of surrounding) {
          if (!visited.includes(JSON.stringify([x1, y1]))) {
               if (c === r) {
                    queue.push([x1, y1, r])
               } else {
                    nq.push([x1, y1, r])
               }
          }
     }

     // can we attach to a region?
     let added = false
     for (const [id, type, members] of regions) {
          for (const [r, x1, y1] of surrounding) {
               if (members.includes(JSON.stringify([x1, y1])) && c === type) {
                    // console.log('attaching to', id, type)
                    if (!members.includes(currString)) members.push(currString)
                    added = true
                    break
               }
          }
          if (members.includes(c)) {
               added = true
          }
     }

     if (!added) {
          const exiisting = regions.filter(([id, type, members]) => type === c && members.includes(JSON.stringify([x, y])))
          if (exiisting.length === 0) {
               regions.push([id++, c, [JSON.stringify([x, y])]])
          }
     }
}


const calcPermimeter = (members) => {
     let total = 0
     for (let i = 0; i < members.length; i++) {
          const [x, y] = JSON.parse(members[i])
          let t = 4
          if (members.includes(JSON.stringify([x + 1, y]))) {
               t -= 1
          }
          if (members.includes(JSON.stringify([x - 1, y]))) {
               t -= 1
          }
          if (members.includes(JSON.stringify([x, y + 1]))) {
               t -= 1
          }
          if (members.includes(JSON.stringify([x, y - 1]))) {
               t -= 1
          }
          total += t
     }
     console.log('perimeter', total)
     return total
}


// OOOOO
// O.O.O
// OOOOO
// O.O.O
// OOOOO

const calcSides = (members) => {
     let total = []

     for (let i = 0; i < members.length; i++) {
          const [x, y] = JSON.parse(members[i])

          if (!members.includes(JSON.stringify([x + 1, y]))) {
               total.push([x, y, 'd'])
          }
          if (!members.includes(JSON.stringify([x - 1, y]))) {
               total.push([x, y, 'u'])
          }
          if (!members.includes(JSON.stringify([x, y + 1]))) {
               total.push([x, y, 'r'])
          }
          if (!members.includes(JSON.stringify([x, y - 1]))) {
               total.push([x, y, 'l'])
          }

     }

     console.log(total)
     const tt = []


     const joinEdges = (arr) => {


          const n = []
          if (d === 'u' || d === 'd') {
               arr.sort((a, b) => a[1] - b[1])
          } else {
               arr.sort((a, b) => a[0] - b[0])
          }

          // console.log(arr)

          while (arr.length > 0) {

               const [x, y, d] = arr.pop()
               console.log('>>', x, y, d)
               added = false
               for (let i = 0; i < n.length; i++) {

                    if (d === 'u' || d === 'd') {

                         const [fx, fy, fd] = n[i][0]
                         if (fx === x && y + 1 === fy) { n[i].push([x, y, d]); added = true; console.log('a'); break }
                         if (fx === x && y - 1 === fy) { n[i].unshift([x, y, d]); added = true; console.log('a'); break }

                         const [ex, ey, ed] = n[i][n[i].length - 1]
                         if (ex === x && y === ey - 1) { n[i].push([x, y, d]); added = true; console.log('b'); break }
                         if (ex === x && y === ey + 1) { n[i].unshift([x, y, d]); added = true; console.log('b'); break }

                    } else {

                         const [fx, fy, fd] = n[i][0]
                         if (fy === y && x + 1 === fx) { n[i].push([x, y, d]); added = true; console.log('a'); break }
                         if (fy === y && x - 1 === fx) { n[i].unshift([x, y, d]); added = true; console.log('a'); break }

                         const [ex, ey, ed] = n[i][n[i].length - 1]
                         if (ey === y && x === ex - 1) { n[i].push([x, y, d]); added = true; console.log('b'); break }
                         if (ey === y && x === ex + 1) { n[i].unshift([x, y, d]); added = true; console.log('b'); break }

                    }
                    // if (fy === y && fy + 1 === x) { n[i].push([x, y, d]); added = true;console.log('c'); break }
                    // if (ey === y && ey - 1 === x) { n[i].unshift([x, y, d]); added = true;console.log('d'); break }

               }
               if (!added) n.push([[x, y, d]])

               console.log('joined', n)
          }

          console.log('>>>>>>>>>', n.length)
          return n
     }


     const u = total.filter(([x, y, d]) => d === 'u');
     const d = total.filter(([x, y, d]) => d === 'd');
     const l = total.filter(([x, y, d]) => d === 'l');
     const r = total.filter(([x, y, d]) => d === 'r');


     return [...joinEdges(u), ...joinEdges(d), ...joinEdges(l), ...joinEdges(r)].length


}


for (const [id, type, members] of regions) {
     console.log(id, type, members)

     const area = members.length;
     const perimeter = calcPermimeter(members)
     const sides = calcSides(members)
     // console.log(id, type, area, perimeter, area * perimeter)
     console.log(id, type, area, sides, area * sides)
     console.log()


     p1 += area * perimeter;
     p2 += area * sides;
     // console.log()
}



// tl   643368
        923480
// th   930268
// th  1068904


assert(p1 === 1477762, 'p1')
assert(p2 === 923480, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);