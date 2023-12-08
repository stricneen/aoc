const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfile('day8.txt');
const textraw = buffer.split(/\n/);

const {insts, network} = textraw.reduce((a,e,i) => {
    if (i === 0) a.insts = e;
    if (i === 1) a.network = {};
    if (i >1) {
        const s = e.split(' = ')
        a.network[s[0]] = [s[1].slice(1,4), s[1].slice(6,9)]
    }
    return a;
}, {})

console.log(insts, network)

let i = 0;
let c = 'AAA';
let p1a = 0;

while (true) {
    const ni = insts[i % insts.length] === 'R' ? 1 : 0
    i++

    c = network[c][ni];
    p1a++

    console.log(ni, c)


    if (c === 'ZZZ')break
}









p2a=0
console.log('Part 1:', p1a) // 
console.log('Part 2:', p2a) // 