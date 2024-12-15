
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(15);
const text = buffer.split(/\n/);
p1 = p2 = 0

const map = []
const m = []

for (const l of text) {
     if (l.indexOf('#') !== -1) map.push(l)
     else  m.push(l)
}
// console.log(m)

const dirs = {
     '^': aoc.dirs.U,
     'v': aoc.dirs.D,
     '<': aoc.dirs.L,
     '>': aoc.dirs.R,
}

const getview = (map,rx,ry,dir) => {
     if (dir === '^') return aoc.ia_up(rx,ry,map)
     if (dir === 'v') return aoc.ia_down(rx,ry,map)
     if (dir === '>') return aoc.ia_right(rx,ry,map)
     if (dir === '<') return aoc.ia_left(rx,ry,map)
}

const  moves = m.join('').split('');

// console.log(map)
// console.log(moves)

let [rx, ry] = aoc.findInGrid(map, x => x === '@')
// console.log('s',rx, ry)
for (const move of moves) {

     const [mx,my] = dirs[move]
     const [nx,ny] = [rx + mx, ry + my]
     const nloc = map[nx][ny]


     // console.log(nloc, move,mx,my,nx, ny)
     
     
     if (nloc === '#') {
          // console.log('wall')
     }

     if (nloc === '.') {
         map[nx] = aoc.replaceAt(map[nx], ny, '@')
         map[rx] = aoc.replaceAt(map[rx], ry, '.')
      
         rx = nx
         ry = ny
     }

     if (nloc === 'O') {
          let view = getview(map,rx,ry,move)
          
          

          // console.log('view',view)
          if (view.includes('.') && view.indexOf('.') < view.indexOf('#')) {
               
               for (let i = view.indexOf('.')-1; i >=0; i--) {
                  let [dx,dy] = [rx,ry]
                    for (let j = 0; j <= i; j++) {
                         [dx,dy] = [dx + mx, dy + my]
                    }
                    // console.log('dx,dy',dx,dy)
                    map[dx] = aoc.replaceAt(map[dx], dy, view[i])
                    map[dx-mx] = aoc.replaceAt(map[dx-mx], dy-my, '.')
                    

                    view = getview(map,rx,ry,move)
                    // console.log('view',getview(map,rx,ry,move))
               }

              
               rx = nx
               ry = ny
          }
     }
     // console.log(map)
     // console.log()

}

const boxes = aoc.findAllInGrid(map, x => x === 'O')
p1 = aoc.sum(boxes.map(x => 100 *x[0] + x[1]))



// ########
// #..O.O.#
// ##@.O..#
// #...O..#
// #.#.O..#
// #...O..#
// #......#
// ########

// <^^>>>vv<v>>v<<

assert(p1 === 1463715, 'p1')
assert(p2 === 7338, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);