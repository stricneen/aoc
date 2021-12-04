const aoc = require('./aoc');
const buffer = aoc.readfile('1.int');
const text = buffer.split(',');
const prog = text.map(x => parseInt(x));

//const test = '2,4,4,5,99,0 '.split(',').map(x => parseInt(x));

const prog1 = [...prog];
prog1[1] = 12; prog1[2] = 2;
const out1 = require('./comp').exe(prog1);
console.log(out1.prog[0]);

for(let x=0;x<100;x++){
    for(let y=0;y<100;y++){
        const p = [...prog];
        p[1] = x; p[2] = y;
        const o = require('./comp').exe(p);
        if (o.prog[0] === 19690720) {
            // console.log(x, y, o.prog[0]);
            console.log((x * 100) + y);
        }
    }
}