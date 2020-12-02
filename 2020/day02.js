const aoc = require('./aoc');
const buffer = aoc.readfile('day02.txt');

const text = buffer.split(/\n/);
const input = text.map(x => {
    var s = x.split(' ');
    var m = s[0].split('-');
    var l = s[1][0];
    return {min: parseInt(m[0]), max: parseInt(m[1]), l: l, pw: s[2]};
});

var valids = input.map(x => {
    const count = x.pw.split('').filter(y => y == x.l).length;
    return (count >= x.min && count <= x.max) ;
});

var count = valids.filter(x=>x);
console.log("Part 1", count.length);


var valids2 = input.map(x => {
    const p1 = x.pw[x.min - 1];
    const p2 = x.pw[x.max - 1];
    return (p1 != p2 && (p1 == x.l || p2 == x.l))
});

var count2 = valids2.filter(x=>x);
console.log("Part 2", count2.length);
    