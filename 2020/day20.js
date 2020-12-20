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
        tile.reduce((a,e) =>  a + e[0],''),
        tile.reduce((a,e) =>  a + e[e.length-1],''),
        tile[tile.length-1]
    ];
};

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

const edges = new Map();
tiles.forEach((v,k) => {
    edges.set(k, getedges(v));
});

console.log(edges);

const matches = new Map();
edges.forEach((v,k) => {

    const other = others(k, edges);
    
    let c = 0;

    v.forEach(x => { 
        if (other.includes(x)) c++
        // if (other.includes(aoc.revStr(x))) c++
    });

    matches.set(k, c);
} );


console.log(matches);

let p1 = 1;
matches.forEach((v,k) => {
    if (v == 2) {
        p1 *= k;
    }
});
  
console.log(p1);