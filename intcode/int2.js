const aoc = require('./aoc');
const buffer = aoc.readfile('2.int');
const text = buffer.split(',');
const prog = text.map(x => parseInt(x));

//const test = '2,4,4,5,99,0 '.split(',').map(x => parseInt(x));

const prog1 = [...prog];

const out1 = require('./comp').exe(prog1);
console.log(out1.prog[0]);

