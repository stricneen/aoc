const aoc = require('./aoc');
    
const buffer = aoc.readfile('day08.txt');

const text = buffer.split(/\n/);
const input = text.map(x => parseInt(x));



console.log(input);
    