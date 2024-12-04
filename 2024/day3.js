const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfile('day3.txt');

const regex = /mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\)/g;
const found = [...buffer.matchAll(regex)];

const [p1,p2] = found.reduce(([n1,n2,d], [val,]) => {
    if (val === "do()") return [n1,n2,true];
    if (val === "don't()") return [n1,n2,false];

    const n = val.slice(0,-1).slice(4).split(',').map(x => parseInt(x));
    const mul = n[0] * n[1];
    return [n1 + mul, d ? n2 + mul : n2, d];
}, [0, 0, true]);

assert(p1 === 179571322, 'p1');
assert(p2 === 103811193, 'p2');
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
