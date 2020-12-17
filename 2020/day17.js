const { isMainThread } = require('worker_threads');
const aoc = require('./aoc');
const buffer = aoc.readfile('day17.txt');

const text = buffer.split(/\n/);

const hash = (obj) => (obj.x * 1000000) + (obj.y * 10000) + obj.z; 

let iy = 0;
let grid = [];
for (l of text) {
    for (c in l.split('')) {
        if (l[c] == '#') {
            grid.push(hash({x:parseInt(c),y:iy,z:0}));
        }
    }
    iy++;
}



const around = function*(p)  {
    
    yield {x: p.x+1, y:p.y+1, z:p.z+1};
    yield {x: p.x,   y:p.y+1, z:p.z+1};
    yield {x: p.x-1, y:p.y+1, z:p.z+1};
    yield {x: p.x+1, y:p.y+1, z:p.z};
    yield {x: p.x,   y:p.y+1, z:p.z};
    yield {x: p.x-1, y:p.y+1, z:p.z};
    yield {x: p.x+1, y:p.y+1, z:p.z-1};
    yield {x: p.x,   y:p.y+1, z:p.z-1};
    yield {x: p.x-1, y:p.y+1, z:p.z-1};

    yield {x: p.x+1, y:p.y, z:p.z+1};
    yield {x: p.x,   y:p.y, z:p.z+1};
    yield {x: p.x-1, y:p.y, z:p.z+1};
    yield {x: p.x+1, y:p.y, z:p.z};
    yield {x: p.x-1, y:p.y, z:p.z};
    yield {x: p.x+1, y:p.y, z:p.z-1};
    yield {x: p.x,   y:p.y, z:p.z-1};
    yield {x: p.x-1, y:p.y, z:p.z-1};

    yield {x: p.x+1, y:p.y-1, z:p.z+1};
    yield {x: p.x,   y:p.y-1, z:p.z+1};
    yield {x: p.x-1, y:p.y-1, z:p.z+1};
    yield {x: p.x+1, y:p.y-1, z:p.z};
    yield {x: p.x,   y:p.y-1, z:p.z};
    yield {x: p.x-1, y:p.y-1, z:p.z};
    yield {x: p.x+1, y:p.y-1, z:p.z-1};
    yield {x: p.x,   y:p.y-1, z:p.z-1};
    yield {x: p.x-1, y:p.y-1, z:p.z-1};
};

const surround = (grid,p) => {
    let active= 0;
    for (s of around(p))
        if (grid.includes(hash(s))) {
            active++;
        }
    return active;
}


const cycles = 6;
let size = text[0].length + 2;

let next = [];
for(let cycle = 0; cycle < cycles; cycle++) {

    for(let x = -size; x < size; x ++) 
        for(let y = -size; y < size; y ++) 
             for(let z = -size; z < size; z ++) {

                const p = {x:x, y:y, z:z};
                const isActive = grid.includes(hash(p));
                const mates = surround(grid, p);
 //console.log(mates);
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

console.log(surround(grid, {x:1,y:1,z:0}))






    