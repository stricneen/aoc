
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(10);
const text = buffer.split(/\n/);
const map = text.map(x => x.split('').map(Number));

p1 = p2 = 0

const valid = ([x,y]) => x >= 0 && y >= 0 && x < map.length && y < map[0].length

const path = ([x,y], height, hc) => {

    if (height === 9) {
        hc.push([x,y])
    }
        
    const u = [x, y - 1];
    if (valid(u) && map[u[0]][u[1]] === height + 1) {
         path(u, height + 1, hc)
    }

    const d = [x, y + 1];
    if (valid(d) && map[d[0]][d[1]] === height + 1) {
         path(d, height + 1, hc)
    }
    
    const l = [x - 1, y];
    if (valid(l) && map[l[0]][l[1]] === height + 1) {
         path(l, height + 1, hc)
    }

    const r = [x + 1, y];
    if (valid(r) && map[r[0]][r[1]] === height + 1) {
         path(r, height + 1, hc)
    }

    return hc;
}

const heads = aoc.findAllInGrid(map, x => x === 0)
for (let i = 0; i < heads.length; i++) {
    const hc = path(heads[i], 0, []);
    p2 += hc.length;
    p1 += aoc.dedupArray(hc).length;
}

assert(p1 === 587, 'p1')
assert(p2 === 1340, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
