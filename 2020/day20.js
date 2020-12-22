const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const text = buffer.split(/\n/);

const tiles = text.reduce((a,e) => {

    if (e.length == 0) return a;

    if (e.startsWith('Tile')){
        const num = parseInt(aoc.between(e, ' ', ':'));
        return [a[0].set(num, []), num];
    }

    const tile = a[0].get(a[1]);
    tile.push(e);
    return [a[0].set(a[1], tile), a[1]];
}, [new Map(), 0])[0];

const getedges = (tile) => {
    return [
        tile[0], 
        aoc.revStr(tile.reduce((a,e) =>  a + e[0],'')),
        tile.reduce((a,e) =>  a + e[e.length-1],''),
        aoc.revStr(tile[tile.length-1])
    ];
};

const edges = new Map();
tiles.forEach((v,k) => {
    edges.set(k, getedges(v));
});

// console.log(edges);

const matches = new Map();
edges.forEach((v,k) => {

    const others = (tile, map) => {
        let r = [];
        map.forEach((v,k) => {
            if (k != tile) {
                r = r.concat(v);
                r = r.concat(v.map(x => aoc.revStr(x)));
            }
        });
        return r;
    };

    const other = others(k, edges);
    let c = 0;
    let ms = [];
    v.forEach(x => { 
        if (other.includes(x)) {
            ms.push(x);
            c++;
        }
    });
    matches.set(k, [c, ms]);
} );


console.log(matches);

let p1 = 1;
matches.forEach((v,k) => {
    if (v[0] == 2) {
        p1 *= k;
    }
});
  
let print = (grid) => { grid.forEach(x => console.log(x)); console.log(); }

// console.log("Part 1 : ", p1);
// require('assert').strictEqual(p1, 14129524957217);
// require('assert').strictEqual(p1, 20899048083289);

const rotate = (grid) => {
    const r = grid.map(x => '');
    grid.forEach(x => {
        let c = x.length-1;
        x.split('').forEach(y => r[c--] += y);
    });
    return r;
};

const flip = (grid) => grid.map(aoc.revStr);

const revMatch = (val, check) => {
    return val == check || val == aoc.revStr(check);
};


// Returns each orientation / flip
const flipRotate = function*(grid) {

    let rot = grid;
    for (let i = 0; i < 4; i++) {
        rot = rotate(rot);
        yield rot;
    }

    rot  = flip(rot);
    for (let i = 0; i < 4; i++) {
        rot = rotate(rot);
        yield rot;
    }

}

// Takes a tile - rotates until it fits 
//      0       [2, '....']
//     1 2      [3, '....']
//      3
const fitTile = (grid, edges, tomatch) => {

    for(r of flipRotate(grid)) {

        const e = getedges(r);

        const e2 = edges.map((x,i) => e[x] == tomatch[i]); 
        if (e2.every(x => x))
        {
            return r;
        }
        //console.log(e2);

        const e3 = edges.reverse().map((x,i) => e[x] == tomatch[i]); 
        if (e3.every(x => x))
        {
            return r;
        }
        //console.log(e3);
    }
};
    

// Pick the top corner
let topleftId = 0;
matches.forEach((v,k) => {
    if (v[0] == 2) topleftId = k;  
});



const topLeft = tiles.get(topleftId);
const topLeftedges = matches.get(topleftId);
const rotateForFit = fitTile(topLeft, [2,3], topLeftedges[1]);

print(rotateForFit);

const commonEdges = new Map();
matches.forEach((v,k) => {
    v[1].forEach(edge => {
        if (commonEdges.has(edge)) {
            commonEdges.set(edge, [k].concat(commonEdges.get(edge)));
        } else if (commonEdges.has(aoc.revStr(edge))) {
            commonEdges.set(aoc.revStr(edge), [k].concat(commonEdges.get(aoc.revStr(edge))));
        } else {
            commonEdges.set(edge, [k]);
        }
    });
});

console.log(tiles.keys());

const sideLength = Math.sqrt(tiles.size);
console.log("Size : ", sideLength);

const s = [];
for (let i = 0; i < sideLength; i++) {
    let row = [];
    for (let j = 0; j < sideLength; j++) {
        row.push(0);
    }
    s.push(row);
}

s[0][0] = topleftId;

console.log(s);

console.log(commonEdges);
const commonEdgesTiles = [];
commonEdges.forEach(v => commonEdgesTiles.push(v));


console.log(commonEdgesTiles);
//      0       [2, '....']
//     1 2      [3, '....']
//      3


