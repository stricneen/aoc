const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const textraw = buffer.split(/\n/);

aoc.printGrid(textraw)

const size = 1_000_000
const m = []
for (let i = 0; i < size; i++) {
    m.push('.'.repeat(size))
}


// s = [350, 350]
s = [2, 2]

const set = ([x, y]) => {
    m[y] = aoc.replaceAt(m[y], x, '#')
}
const get = ([x, y]) => {
    return m[y][x]
}


set(s)

directions = [[-1,0],[1,0],[0,-1],[0,1]]
fill = (x, y) => {
    let stack = [{ x, y }];

    while (stack.length) {
        let current = stack.pop();
        for (let i = 0; i < directions.length; i++) {
            let child = {
                x: current.x + directions[i][0],
                y: current.y + directions[i][1]
            }
            if (get([child.x,child.y]) === '.' ) {
                set([child.x,child.y])
                stack.push(child);
            }
        }
    }
}


textraw.forEach(inst => {
    t = inst.split(' ')
    
    console.log(t[2],t[2].slice(2,7))
    
    console.log(Number(`0x${t[2].slice(2,7)}`), 'RDLU'[parseInt(t[2].slice(7,8))])
    // d = t[0], f = parseInt(t[1])
    d = 'RDLU'[parseInt(t[2].slice(7,8))], f = Number(`0x${t[2].slice(2,7)}`)

    if (d === 'R') {
        for (let i = 0; i < f; i++) {
            s = [s[0] + 1, s[1]]
            set(s)
        }
    }
    if (d === 'L') {
        for (let i = 0; i < f; i++) {
            s = [s[0] - 1, s[1]]
            set(s)
        }
    }
    if (d === 'U') {
        for (let i = 0; i < f; i++) {
            s = [s[0], s[1] - 1]
            set(s)
        }
    }
    if (d === 'D') {
        for (let i = 0; i < f; i++) {
            s = [s[0], s[1] + 1]
            set(s)
        }
    }
});

p1 = 0
inside = false


// aoc.printGrid(m)
fill(s[0]+1,s[1]+1)
// aoc.printGrid(m)
for (let i = 0; i < m.length; i++) {

    l = m[i].split('').forEach((x,j) => {
        if (x === '#') {
            inside= true
             p1++
         } 
    
    })





}

// R 6 (#70c710)
// D 5 (#0dc571)
// L 2 (#5713f0)
// D 2 (#d2c081)
// R 2 (#59c680)
// D 2 (#411b91)
// L 5 (#8ceee2)
// U 2 (#caa173)
// L 1 (#1b58a2)
// U 2 (#caa171)
// R 2 (#7807d2)
// U 3 (#a77fa3)
// L 2 (#015232)
// U 2 (#7a21e3)
p2 = 0
console.log()
console.log('Part 1:', p1); // 
console.log('Part 2:', p2); // 
