const aoc = require('../aoc');
const buffer = aoc.readfile('day14.txt');
const textraw = buffer.split(/\n/);

const tilt = (sqr) => {
    const t = []
    for (let i = 0; i < sqr.length; i++) {
        row = sqr[i];
        while (true) {
            c = row.indexOf('.O');
            if (c === -1) break;
            row = aoc.replaceAt(row, c, 'O')
            row = aoc.replaceAt(row, c + 1, '.')
        }
        t.push(row);
    }
    return t;
}

const load = (r) => {
    r = aoc.rotateCounter(r)
    s = 0
    for (let i = 0; i < r.length; i++) 
        for (let j = 0; j < r.length; j++)
            if (r[i][j] === 'O') s += r.length - j
         r = aoc.rotate(r)
    
    return s;
}

const cycle = (sqr) => {
    cs = sqr
    for (let i = 0; i < 4; i++) {
        // console.log(i)
        // aoc.printGrid(cs)
        // console.log()

        // cs = aoc.rotateCounter([...cs])
        // cs = aoc.rotateCounter([...cs])
        cs = tilt(cs)
        // aoc.printGrid(cs)
        cs = aoc.rotate(cs)

    }
    // cs = aoc.rotate(cs)
    // aoc.printGrid(cs)
    // cs = aoc.rotateCounter(cs)
    return cs;
}
const cy = (c1) => {
    c1 = aoc.rotateCounter(c1)
    c1 = cycle(c1)
    c1 = aoc.rotate(c1)
    return c1
}

// aoc.printGrid(textraw)


const t = aoc.rotateCounter(textraw)
const tt = tilt(t);
const ttt = aoc.rotate(tt)
const p1 = load(ttt);


c1 = [...textraw]
const x = {}
mx = 1000
// mx = 1000000000
for (let i = 0; i < mx; i++) {
      c1 = cy(c1);

      key = c1.join('')
      if (x[key]) {
        x[key] = x[key]+1

        if (x[key] === 2||x[key] === 3) console.log(x[key], i, load(c1))

      }
      else{
        x[key] = 1
      }

    //   if (x[key] > 4) console.log(x[key], i, load(c1))
}
const p2 = load(c1);

//  c1 = cy(c1);
// aoc.printGrid(c1)




console.log()
console.log('Part 1:', p1); // 109424
console.log('Part 2:', p2); // 102509
