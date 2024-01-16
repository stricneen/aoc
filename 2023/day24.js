const aoc = require('./aoc');
const buffer = aoc.readfile('day24.txt');
const raw = buffer.split(/\n/);

// 12, 31, 28 @ -1, -2, -1
const particles = raw.map(l => {
    [p, v] = l.split(' @ ')
    return [p.split(', ').map(x => parseInt(x)), v.split(', ').map(x => parseInt(x))]
})


// const testArea = [7, 27]
const testArea = [200000000000000,400000000000000]
// console.log(testArea)
p2 = 0

// 19, 13, 30 @ -2,  1, -2
// 18, 19, 22 @ -1, -1, -2
// 20, 25, 34 @ -2, -2, -4
// 12, 31, 28 @ -1, -2, -1
// 20, 19, 15 @  1, -5, -3

// https://en.m.wikipedia.org/wiki/Line%E2%80%93line_intersection

comp = (hail1, hail2) => {
    // console.log(hail1, hail2)

    const [[x1, y1, z1], [dx1, dy1, dz1]] = hail1
    const [x2, y2] = [x1 + dx1,y1 + dy1]
    

    const [[x3, y3, z2], [dx3, dy3, dz2]] = hail2
    const [x4, y4] =[ x3 + dx3, y3 + dy3]

    const den = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4))
    const cx = (((x1 * y2) - (y1 * x2)) * (x3 - x4)) - ((x1 - x2) * ((x3 * y4) - (y3 * x4)))
    const cy = (((x1 * y2) - (y1 * x2)) * (y3 - y4)) - ((y1 - y2) * ((x3 * y4) - (y3 * x4)))

    const [ix, iy] = [cx / den, cy / den]

    // console.log(ix, iy)

    if (den === 0) return false; //parallel

    const inTestArea = (ix >= testArea[0] && ix <= testArea[1] && iy >= testArea[0] && iy <= testArea[1])
    const inFutureA1 = (dx1 < 0 && ix < x1) || (dx1 > 0 && ix > x1)
    const inFutureB1 = (dy1 < 0 && iy < y1) || (dy1 > 0 && iy > y1)

    return inTestArea && inFutureA1  && inFutureB1
}

p1 = 0
for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
        cross = comp(particles[i], particles[j])
        if (cross) p1+=1
    }
}



// Hailstone A: 19, 13, 30 @ -2, 1, -2
// Hailstone B: 18, 19, 22 @ -1, -1, -2
// Hailstones' paths will cross inside the test area (at x=14.333, y=15.333).


console.log('Part 1:', p1); // 
console.log('Part 2:', p2); // 

// 21782 tl
// 28151 tl
// 28175 th

// 28174