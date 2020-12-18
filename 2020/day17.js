const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');

const text = buffer.split(/\n/);

const hash = (obj) => (obj.w * 1000000) + (obj.x * 10000) + (obj.y * 100) + obj.z;

let iy = 0;
let grid = [];
for (l of text) {
    for (c in l.split('')) {
        if (l[c] == '#') {
            grid.push(hash({x:parseInt(c),y:iy,z:0,w:0}));
        }
    }
    iy++;
}

const neighbours = function*(p)  {
    for(let w= -1; w < 2; w++)
        for(let z= -1; z < 2; z++)
            for(let y = -1; y < 2; y++)
                for(let x = -1; x < 2; x++) {
                    if (x != 0 || y != 0 || z != 0 || w != 0) {
                        yield {x:x + p.x, y:y + p.y, z:z + p.z, w:w + p.w}
                    }
                }
};

const surround = (grid,p) => {
    let active= 0;
    for (s of neighbours(p))
        if (grid.includes(hash(s))) {
            active++;
        }
    return active;
}

const cycles = 6;
let size = text[0].length + 1;
console.time('x');
let next = [];
for(let cycle = 0; cycle < cycles; cycle++) {

    for(let w = -size; w < size; w ++)
        for(let x = -size; x < size; x ++)
            for(let y = -size; y < size; y ++)
                for(let z = -size; z < size; z ++) {

                    const p = {x:x, y:y, z:z, w:w};
                    const isActive = grid.includes(hash(p));
                    const mates = surround(grid, p);

                    if (isActive && (mates == 2 || mates == 3)) {
                        next.push(hash(p));
                    }
                    if (isActive == false && mates == 3) {
                        next.push(hash(p));
                    }
                }

    console.log(next.length);
    size++;

    grid = next;
    next = [];
}
console.timeEnd('x');