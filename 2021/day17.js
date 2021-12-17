const aoc = require('./aoc');
const buffer = aoc.readfile('day16.txt');

const tick = ([x, y], [vx, vy], c, maxy) => {
    if (c === 0) return undefined;
    const nx = x + vx;
    const ny = y + vy;

    let delta = 0;
    if (vx > 0) delta = -1;
    if (vx < 0) delta = 1;
    let nvx = vx + delta;  
    let nvy = vy - 1;
    if (ny > maxy) maxy = ny;
    
    if (intarget(nx, ny)) {
        return maxy;
    }

    return tick([nx, ny], [nvx, nvy], c - 1, maxy);
}

const intarget = (x, y) => {
    return x >= 287 && x <= 309 && y >= -76 && y <= -48;
}

let my = 0;
let hit = 0;
const limit = 500;
for (let x = 0; x <= limit; x++) {
    for (let y = -limit; y <= limit; y++) {
        const maxy = tick([0, 0], [x, y], 200, 0);
        if (maxy !== undefined) {
            hit++;
            if (maxy > my) {
                my = maxy;
            }
        }
    }
}

console.log('Part 1 : ', my)
console.log('Part 2 : ', hit);
