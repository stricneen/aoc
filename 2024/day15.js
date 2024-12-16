
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(15);
const text = buffer.split(/\n/);

const map = []
const map2 = []
const m = []

for (const l of text) {
     if (l.indexOf('#') !== -1) {
          map.push(l)
          map2.push(l.replace(/#/g, '##').replace(/O/g, '[]').replace(/\./g, '..').replace(/@/g, '@.'))
     }
     else m.push(l)
}
const moves = m.join('').split('');

const dirs = {
     '^': aoc.dirs.U,
     'v': aoc.dirs.D,
     '<': aoc.dirs.L,
     '>': aoc.dirs.R,
}

const getview = (map, rx, ry, dir) => {
     if (dir === '^') return aoc.ia_up(rx, ry, map)
     if (dir === 'v') return aoc.ia_down(rx, ry, map)
     if (dir === '>') return aoc.ia_right(rx, ry, map)
     if (dir === '<') return aoc.ia_left(rx, ry, map)
}

const part1 = (map) => {

     // clesar screen
     // process.stdout.write('\x1Bc')
     // hide cursor
     // process.stdout.write('\u001B[?25l')

     let [rx, ry] = aoc.findInGrid(map, x => x === '@')
     for (const move of moves) {

          const [mx, my] = dirs[move]
          const [nx, ny] = [rx + mx, ry + my]
          const nloc = map[nx][ny]


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
               let view = getview(map, rx, ry, move)



               // console.log('view',view)
               if (view.includes('.') && view.indexOf('.') < view.indexOf('#')) {

                    for (let i = view.indexOf('.') - 1; i >= 0; i--) {
                         let [dx, dy] = [rx, ry]
                         for (let j = 0; j <= i; j++) {
                              [dx, dy] = [dx + mx, dy + my]
                         }
                         // console.log('dx,dy',dx,dy)
                         map[dx] = aoc.replaceAt(map[dx], dy, view[i])
                         map[dx - mx] = aoc.replaceAt(map[dx - mx], dy - my, '.')


                         view = getview(map, rx, ry, move)
                         // console.log('view',getview(map,rx,ry,move))
                    }


                    rx = nx
                    ry = ny
               }
          }
          // console.log(map)
          // console.log()
                    // aoc.printGrid(map)
                    // print(map)


                    // seconds = 0.1
                    // var waitTill = new Date(new Date().getTime() + seconds * 1000);
                    // while(waitTill > new Date()){}

     }

     const boxes = aoc.findAllInGrid(map, x => x === 'O')
     return aoc.sum(boxes.map(x => 100 * x[0] + x[1]))

}

const print = (map) => {

     const GREY = '\u001b[38;2;100;100;100m';
     const GOLD = '\u001b[38;2;255;215;100m';
     const LIME = '\u001b[38;2;0;215;0m';
 
     // move cursor to 0;0
     process.stdout.write('\u001b[0;0H')

     
     for (let i = 0; i < map.length; i++) {
          
          for (let j = 0; j < map[0].length; j++) {
               
               const char = map[i][j];
               switch (char) {     
                    case '#': process.stdout.write(GREY + char); break;
                    case '.': process.stdout.write(' '); break;
                    case '[': process.stdout.write(LIME + char); break;
                    case ']': process.stdout.write(LIME + char); break;
                    case 'O': process.stdout.write(LIME + char); break;
                    case '@': process.stdout.write(GOLD + char); break;
               }
               
          }
          console.log()

     }

}

const part2 = (map) => {
     // clesar screen
     // process.stdout.write('\x1Bc')
     // hide cursor
     // process.stdout.write('\u001B[?25l')
     let [rx, ry] = aoc.findInGrid(map, x => x === '@')
     for (const move of moves) {
          const [mx, my] = dirs[move]
          const [nx, ny] = [rx + mx, ry + my]
          const nloc = map[nx][ny]

          if (nloc === '#') {
               // console.log('wall')
          }

          if (nloc === '.') {
               map[nx] = aoc.replaceAt(map[nx], ny, '@')
               map[rx] = aoc.replaceAt(map[rx], ry, '.')
               rx = nx
               ry = ny
          }

          if (nloc === '[' || nloc === ']') {

               if (move === '<' || move === '>') {
                    let view = getview(map, rx, ry, move)
                    if (view.includes('.') && view.indexOf('.') < view.indexOf('#')) {

                         for (let i = view.indexOf('.') - 1; i >= 0; i--) {
                              let [dx, dy] = [rx, ry]
                              for (let j = 0; j <= i; j++) {
                                   [dx, dy] = [dx + mx, dy + my]
                              }
                              map[dx] = aoc.replaceAt(map[dx], dy, view[i])
                              map[dx - mx] = aoc.replaceAt(map[dx - mx], dy - my, '.')

                              view = getview(map, rx, ry, move)
                         }
                         rx = nx
                         ry = ny
                    }
               }

               if (move === '^') {

                    // get all boxes affected by move
                    let boxLocs = []
                    let check = [[rx, ry]]
                    while (check.length > 0) {
                         const [cx, cy] = check.pop()
                         boxLocs.push([cx, cy])
                         if (map[cx + mx][cy + my] === '[') {
                              check.push([cx - 1, cy])
                              check.push([cx - 1, cy + 1])
                         }
                         if (map[cx + mx][cy + my] === ']') {
                              check.push([cx - 1, cy])
                              check.push([cx - 1, cy - 1])
                         }
                    }
                    boxLocs.sort((a, b) => a[0] - b[0])
                    boxLocs = aoc.dedupArray(boxLocs)

                    // can move up ?
                    let canmove = true
                    for (const [lx, ly] of boxLocs) {
                         const [checkx, checky] = [lx - 1, ly]
                         // above must be in list or '.'    
                         if (boxLocs.find(([lx, ly]) => checkx === lx && checky === ly) === undefined) {
                              if (map[checkx][checky] !== '.') {
                                   canmove = false
                              }
                         }
                    }

                    if (canmove) {
                         for (const [lx, ly] of boxLocs) {
                              map[lx - 1] = aoc.replaceAt(map[lx - 1], ly, map[lx][ly])
                              map[lx] = aoc.replaceAt(map[lx], ly, '.')
                         }

                         rx = nx
                         ry = ny
                    }
               }

               if (move === 'v') {

                    // get all boxes affected by move
                    let boxLocs = []
                    let check = [[rx, ry]]
                    while (check.length > 0) {
                         const [cx, cy] = check.pop()
                         boxLocs.push([cx, cy])
                         if (map[cx + mx][cy + my] === '[') {
                              check.push([cx + 1, cy])
                              check.push([cx + 1, cy + 1])
                         }
                         if (map[cx + mx][cy + my] === ']') {
                              check.push([cx + 1, cy])
                              check.push([cx + 1, cy - 1])
                         }
                    }
                    boxLocs.sort((a, b) => b[0] - a[0])
                    boxLocs = aoc.dedupArray(boxLocs)

                    // can move down ?
                    let canmove = true
                    for (const [lx, ly] of boxLocs) {
                         const [checkx, checky] = [lx + 1, ly]
                         // above must be in list or '.'    
                         if (boxLocs.find(([lx, ly]) => checkx === lx && checky === ly) === undefined) {
                              // not in list
                              if (map[checkx][checky] !== '.') {
                                   canmove = false
                              }
                         }
                    }

                    if (canmove) {
                         for (const [lx, ly] of boxLocs) {
                              map[lx + 1] = aoc.replaceAt(map[lx + 1], ly, map[lx][ly])
                              map[lx] = aoc.replaceAt(map[lx], ly, '.')
                         }

                         rx = nx
                         ry = ny
                    }
               }
          }

          // aoc.printGrid(map)
          // print(map)


          // seconds = 0.1
          // var waitTill = new Date(new Date().getTime() + seconds * 1000);
          // while(waitTill > new Date()){}
     }

     

     const boxes = aoc.findAllInGrid(map2, x => x === '[')
     return aoc.sum(boxes.map(x => 100 * x[0] + x[1]))
}


const p1 = part1(map)
const p2 = part2(map2)
assert(p1 === 1463715, 'p1')
assert(p2 === 1481392, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);