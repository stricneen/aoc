const aoc = require('./aoc');
const buffer = aoc.readfile('day22.txt');
const data = buffer.split(/\n/)

const map = data.filter(x => x.includes('.')).map(x => x.split(''))

const moves = data[data.length - 1].split('').reduce((a, e) => {
    if (isNaN(e)) {
        a.push(e)
        a.push('')
    } else {
        a[a.length - 1] += e
    }
    return a
}, ['']).filter(x => x !== '').map(x => isNaN(x) ? x : parseInt(x))

console.log(moves)

// start point 
pos = [0, map[0].findIndex(x => x === '.')]
dir = [0, 1]



for (const move of moves) {
   
    sdir = dir.toString()

    if (Number.isInteger(move)) { // move

        console.log('move', move)
        console.log(pos)

        // get the path (row or col)
        if (dir[0] === 0) { /// moving lr
            path = map[pos[0]]
        } else {
            path = []
            for (let cx = 0; cx < map.length; cx++) {
                path.push(map[cx][pos[1]])
            }
        }
        // console.log(path)
        path = path.filter(x => x !== ' ' && x != null)
        // console.log(path)/


        console.log(path.join(''), sdir)

        for (let i = 0; i < move; i++) {

            nextpos = [pos[0] + dir[0], pos[1] + dir[1]]


            // next = map[nextpos[0]][nextpos[1]]
            if (nextpos[0] >= map.length || nextpos[0] < 0) {
                next = undefined
            } else {
                next = map[nextpos[0]][nextpos[1]]
            }



            if (next === undefined || next === ' ') { // edge of map

                if (sdir === '0,1') { // right
                    if (path[0] === '.') {
                        nextpos = [pos[0], map[pos[0]].findIndex(x => x === '.')]
                    }
                }

                else if (sdir === '1,0') { // down
                    if (path[0] === '.') {
                        for (let cx = 0; cx < map.length; cx++) {
                            if (map[cx][pos[1]] === '.') {
                                nextpos = [cx, pos[1]]
                                break
                            }
                        }
                    }
                }

                else if (sdir === '0,-1') {
                    // console.log('bob')
                    // console.log(path)
                    // console.log(map[pos[0]].lastIndexOf('.'))
                    if (path[path.length - 1] === '.') {
                        nextpos = [pos[0], map[pos[0]].lastIndexOf('.')]
                        console.log('bob2', nextpos)

                    }
                }

                else if (sdir === '-1,0') { // up
                    console.log('x')
                    console.log(JSON.stringify(path))
                    console.log('xxxx',path[path.length - 1])
                    
                    if (path[path.length - 1] === '#') {
                        break;
                    }

                    if (path[path.length - 1] === '.') {
                        console.log('xx')
                        for (let cx = map.length - 1; cx >= 0; cx--) {
                            console.log(cx)
                            if (map[cx][pos[1]] === '.') {
                                nextpos = [cx, pos[1]]
                                break
                            }
                        }
                    }
                }

                console.log(sdir ,nextpos)

                next = map[nextpos[0]][nextpos[1]]

            }



            if (next === '.' || next === 'o') {
                pos = nextpos
                // map[pos[0]][pos[1]] = 'o' /// remove
            }

            if (next === '#') {
                break;
            }
            // next = map[nextpos[0]][nextpos[1]]
            // if (nextpos[0] >= map.length || nextpos[0] < 0) {
            //     next = undefined
            // } else {
            //     next = map[nextpos[0]][nextpos[1]]
            // }

            // console.log(next)

  


        }


    } else { // turn
        console.log('turn', move)

        if (move === 'R') {
            if (sdir === '0,1') { dir = [1, 0] }
            else if (sdir === '1,0') { dir = [0, -1] }
            else if (sdir === '0,-1') { dir = [-1, 0] }
            else if (sdir === '-1,0') { dir = [0, 1] }
        } else {
            if (sdir === '0,1') { dir = [-1, 0] }
            else if (sdir === '1,0') { dir = [0, 1] }
            else if (sdir === '0,-1') { dir = [1, 0] }
            else if (sdir === '-1,0') { dir = [0, -1] }
        }
        sdir = dir.toString()
    }
    console.log()
    map.map(x => console.log(x.join('')))

}

dirs =['0,1','1,0','0,-1','-1,0']
console.log(sdir)
console.log(pos[0]+1,pos[1]+1, dirs.indexOf(sdir))

p1 = ((pos[0]+1) * 1000) + ((pos[1]+1)*4) + dirs.indexOf(sdir)

console.log('Part 1 : ', p1); //  165094
console.log('Part 2 : ', 0); // 


/// 88278 l