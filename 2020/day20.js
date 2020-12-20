const { timeLog } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const text = buffer.split(/\n/);

const tilesRaw = text.reduce((a,e) => {

    if (e.length == 0) return a;

    if (e.startsWith('Tile')){
        const num = parseInt(aoc.between(e, ' ', ':'));
        console.log(a);
        return [a[0].set(num, []), num];
    }

    const tile = a[0].get(a[1]);
    tile.push(e);
    return [a[0].set(a[1], tile), a[1]];
}, [new Map(), 0])[0];

const tiles = tilesRaw


console.log(tiles.size);
    