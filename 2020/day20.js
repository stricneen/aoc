const { pathToFileURL } = require('url');
const aoc = require('./aoc');
const buffer = aoc.readfile('day20.txt');
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

const getedges2 = (tile) => {
    return [
        tile[0], 
        tile.reduce((a,e) =>  a + e[0],''),
        tile.reduce((a,e) =>  a + e[e.length-1],''),
        tile[tile.length-1]
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


// console.log(matches);

let p1 = 1;
matches.forEach((v,k) => {
    if (v[0] == 2) {
        p1 *= k;
    }
});
  
let print = (grid) => { grid.forEach(x => console.log(x)); console.log(); }

console.log("Part 1 : ", p1);
//require('assert').strictEqual(p1, 14129524957217);
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
const fitTile = (grid, edges, tomatch, edgefunc) => {

    for(r of flipRotate(grid)) {

        const e = edgefunc(r);

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
const rotateForFit = fitTile(topLeft, [2,3], topLeftedges[1], getedges);
// print(rotateForFit);

const findTile = (l, edge, n, fn) => {
    let r;
    l.forEach((v,k) => {
        const rotate = fitTile(v, [n], [edge], fn);
        if (rotate) {
            r = { id: k, grid: rotate};
            
            // console.log('found');
        }
    });
    return r;
}

const sideLength = Math.sqrt(tiles.size);
//console.log("Size : ", sideLength);


let grid = [ [ {id: topleftId, grid: rotateForFit} ]];
tiles.delete(topleftId);

for (let r = 0; r < sideLength; r++) {

    for (let c = 0; c < sideLength; c++) {
        if (r == 0 && c == 0) continue;

        if (c == 0) {
            
            const tomatch = grid[r-1][0];

            const bottomEdge = getedges2(tomatch.grid)[3];
            const nextTile = findTile(tiles, bottomEdge, 0, getedges2);
        
            grid.push([nextTile]);
//            row.push(nextTile);
            tiles.delete(nextTile.id);

            // print(nextTile.grid);

        } else {

            const row = grid[r];
            const tomatch = row[row.length-1];

            const rightEdge = getedges(tomatch.grid)[2];
            const nextTile = findTile(tiles, rightEdge, 1, getedges2);
        
            row.push(nextTile);
            tiles.delete(nextTile.id);

            // print(nextTile.grid);
        }

    }

}

const removeEdges = (grid) => {
    const inner =  grid.slice(1,grid.length-1);
    const inner2 = inner.map(x => x.slice(1,x.length-1));
    return inner2;
}

// console.log(grid);

const f = grid.map(r => r.map(r1 => removeEdges(r1.grid)));

const final = f.map(r => {
    const rr = [];
    for (let i = 0; i < r[0].length; i++) {

        let line = '';
        for (let j = 0; j < r.length; j++) {
            line += r[j][i];
        }
        rr.push(line);
    }
    return rr;
}).flat(1);

// print(final);

// 20 * 3   - 15 in total
const isMonster = (grid) => {
    // console.log(grid);
    return grid[0][18] == '#'
        && grid[1][0] == '#'
        && grid[1][5] == '#'
        && grid[1][6] == '#'
        && grid[1][11] == '#'
        && grid[1][12] == '#'
        && grid[1][17] == '#'
        && grid[1][18] == '#'
        && grid[1][19] == '#'
        && grid[2][1] == '#'
        && grid[2][4] == '#'
        && grid[2][7] == '#'
        && grid[2][10] == '#'
        && grid[2][13] == '#'
        && grid[2][16] == '#'
}


const scan = (grid) => {
    let monsters = 0;
    for (let x = 0; x < grid.length - 3; x++) {
        for (let y = 0; y < grid[0].length - 20; y++) {

            const g = [];
            g.push(grid[x].slice(y,y+20));
            g.push(grid[x+1].slice(y,y+20));
            g.push(grid[x+2].slice(y,y+20));
            

            if (isMonster(g)) monsters++;
        }
    }
    return monsters;
};

const f1 = rotate(rotate(rotate(flip(final))));
// print(f1);

const monsters = scan(f1);
// console.log(monsters);

let h = 0;
for (let i = 0; i < final.length; i++) {
    for (let j = 0; j < final[0].length; j++) {
        if (final[i][j] == '#') h++;

    }    
}

console.log("Part 2 : ", h - (monsters * 15));
//                   # 
// #    ##    ##    ###
//  #  #  #  #  #  #   