const aoc = require('./aoc');
const buffer = aoc.readfile('day24.txt');
const raw = buffer.split(/\n/);

const particles = raw.map(l => {
    [p, v] = l.split(' @ ')
    return [p.split(', ').map(x => parseInt(x)), v.split(', ').map(x => parseInt(x))]
})

const testArea = [200000000000000, 400000000000000]

const intersect = (hail1, hail2) => {

    const [[x1, y1, z1], [dx1, dy1, dz1]] = hail1
    const [[x2, y2, z2], [dx2, dy2, dz2]] = hail2

    a1 = dy1
    b1 = -dx1
    c1 = (dy1 * x1) - (dx1 * y1)

    a2 = dy2
    b2 = -dx2
    c2 = (dy2 * x2) - (dx2 * y2)

    if ((a1 * b2) === (a2 * b1)) return false;

    ix = ((c1 * b2) - (c2 * b1)) / ((a1 * b2) - (a2 * b1))
    iy = ((c2 * a1) - (c1 * a2)) / ((a1 * b2) - (a2 * b1))

    const inTestArea = (ix >= testArea[0] && iy >= testArea[0] && ix <= testArea[1] && iy <= testArea[1])
    const inFutureH1 = (ix - x1) * dx1 >= 0 && (iy - y1) * dy1 >= 0
    const inFutureH2 = (ix - x2) * dx2 >= 0 && (iy - y2) * dy2 >= 0

    return inTestArea && inFutureH1 && inFutureH2
}


p1 = 0
c = 0
for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
        cross = intersect(particles[i], particles[j])

        c += 1

        if (cross) p1 += 1
    }
    // break;
}


p2 = 0


console.log('Part 1:', p1); // 28174
console.log('Part 2:', p2); // 

