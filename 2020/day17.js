const aoc = require('./aoc');
const buffer = aoc.readfile('day17.txt');
const text = buffer.split(/\n/);

const hash = (obj) => ((obj.w || 0) * 1000000) + (obj.x * 10000) + (obj.y * 100) + obj.z;

const input = () => {
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
    return grid;
};

const neighbours3d = function*(p)  {
        for(let z= -1; z < 2; z++)
            for(let y = -1; y < 2; y++)
                for(let x = -1; x < 2; x++) {
                    if (x != 0 || y != 0 || z != 0) {
                        yield {x:x + p.x, y:y + p.y, z:z + p.z}
                    }
                }
};

const neighbours4d = function*(p)  {
    for(let w= -1; w < 2; w++)
        for(let z= -1; z < 2; z++)
            for(let y = -1; y < 2; y++)
                for(let x = -1; x < 2; x++) {
                    if (x != 0 || y != 0 || z != 0 || w != 0) {
                        yield {x:x + p.x, y:y + p.y, z:z + p.z, w:w + p.w}
                    }
                }
};

const surround = (grid,p,nfunc) => {
    let active= 0;
    for (s of nfunc(p))
        if (grid.includes(hash(s))) {
            active++;
        }
    return active;
}

const iterate3d = (grid, size) => {
    const next = [];
        for(let x = -size; x < size; x ++)
            for(let y = -size; y < size; y ++)
                for(let z = -size; z < size; z ++) {

                    const p = {x:x, y:y, z:z};
                    const isActive = grid.includes(hash(p));
                    const mates = surround(grid, p, neighbours3d);

                    if (isActive && (mates == 2 || mates == 3)) {
                        next.push(hash(p));
                    }
                    if (isActive == false && mates == 3) {
                        next.push(hash(p));
                    }
                }
    return next;
}

const iterate4d = (grid, size) => {
    const next = [];
    for(let w = -size; w < size; w ++)
        for(let x = -size; x < size; x ++)
            for(let y = -size; y < size; y ++)
                for(let z = -size; z < size; z ++) {

                    const p = {x:x, y:y, z:z, w:w};
                    const isActive = grid.includes(hash(p));
                    const mates = surround(grid, p, neighbours4d);

                    if (isActive && (mates == 2 || mates == 3)) {
                        next.push(hash(p));
                    }
                    if (isActive == false && mates == 3) {
                        next.push(hash(p));
                    }
                }
    return next;
}


console.time('x');

const cycles = 6;
const size = text[0].length + 1;

let grid = input();
for(let cycle = 0; cycle < cycles; cycle++) {
    next = iterate3d(grid, size + cycle);
    // console.log(next.length);
    grid = next;
}
console.log("Part 1 : ", next.length);

grid = input();
for(let cycle = 0; cycle < cycles; cycle++) {
    next = iterate4d(grid, size + cycle);
    // console.log(next.length);
    grid = next;
}
console.log("Part 2 : ", next.length);
console.timeEnd('x');


