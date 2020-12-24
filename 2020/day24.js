const { networkInterfaces } = require('os');
const aoc = require('./aoc');
const buffer = aoc.readfile('day24.txt');
const text = buffer.split(/\n/);

const directions = text.map(x => {
    let a = x.split('');
    let r = [];
    while(a.length > 0) {
        r.push(a.splice(0, a[0] == 'e' || a[0] == 'w' ? 1 : 2  ))
    }
    return r.map(r => r.join(''));
});

const endPosition = directions.map(x => {
    let start = {x:0,y:0};

    x.forEach(e => {

        if (e == 'nw') start = { x: start.x,     y: start.y + 1}
        if (e == 'ne') start = { x: start.x + 1, y: start.y}
    
        if (e == 'e') start = { x: start.x + 1,  y: start.y - 1}
        if (e == 'w') start = { x: start.x - 1,  y: start.y + 1}
     
        if (e == 'se') start = { x: start.x,     y: start.y - 1}

        if (e == 'sw') start = { x: start.x -1,  y: start.y }


    });

    // [
    //     'w',  'se', 'w',  'e',
    //     'e',  'e',  'nw', 'ne',
    //     'se', 'nw', 'w',  'w',
    //     'sw', 'ne', 'w'
    //   ],
    return start;

});

const hash = (p) => (p.x * 1000) + p.y;

const hashes = endPosition.map(hash);

const group = hashes.reduce((a,e) => {
    let f = a.findIndex(x => x.hash == e);
    if (f == -1) {
        a.push({hash: e, c : 1})
    } else {
        a[f] = {hash: a[f].hash, c: a[f].c + 1}
    }
    return a;

}, []);

const flipped = group.filter(e => e.c % 2 == 1).map(x => x.hash);
console.log('Part 1 : ', flipped.length);

// console.log(flipped);

// Any black tile with zero or more than 2 black tiles immediately adjacent to it is flipped to white.
// Any white tile with exactly 2 black tiles immediately adjacent to it is flipped to black.
const surrounded = (current, pos) => {

    let s = 0;

    if (current.includes(hash({x: pos.x,     y:pos.y + 1}))) s++;
    if (current.includes(hash({x: pos.x,     y:pos.y - 1}))) s++;
    if (current.includes(hash({x: pos.x + 1, y:pos.y}))) s++;
    if (current.includes(hash({x: pos.x - 1, y:pos.y}))) s++;
    if (current.includes(hash({x: pos.x - 1, y:pos.y + 1}))) s++;
    if (current.includes(hash({x: pos.x + 1, y:pos.y - 1}))) s++;

    return s;
}

let current = flipped;
let area = 80;
let next = [];
for (let round = 0; round < 100; round++) {
   

    for (let x = -area; x < area; x++) {
        for (let y = -area; y < area; y++) {
           
            let h = hash({x:x,y:y});
            let s = surrounded(current, {x:x, y:y});

            if (current.includes(h) && (s == 1 || s == 2)) {
                next.push(h);
            } else if (!current.includes(h) && s == 2) {
                next.push(h);
            } 

        }

    }

    console.log(round);

    current = next;
}

console.log('Part 2 : ', next.length);


    