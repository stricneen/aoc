const aoc = require('./aoc');
const buffer = aoc.readfile('day10.txt');
const text = buffer.split(/\n/);
const input = text.map(x => parseInt(x));

const device = Math.max(...input) + 3;

input.push(0);
input.push(device);

console.time("start day 10");

const sorted = aoc.sort_ints(input);

const diff = sorted.reduce((a,e,i) => {
    if (i == 0) return a;
    a.push(e - sorted[i-1]);
    return a;
}, []);

const os = diff.filter(x => x == 1).length;
const ts = diff.filter(x => x == 3).length;
console.log("Part 1 : ", os * ts);


const split = sorted.reduce((a,e) => {
    if (a.length == 0) {
        a.push([e]);
        return a;
    }
    const lasta = a[a.length-1];
    const last = lasta[lasta.length-1];
        if (e - last == 3) {
            a.push([e]);
            return a;
        } else {
            lasta.push(e);
            return a;
        }
}, []);

const combs = split.map((e) => {
    if (e.length <=2 ) return 1;
    if (e.length == 3) return 2;
    if (e.length == 4) return 4;
    if (e.length == 5) return 7;
    
});

console.log("Part 2 : ", aoc.product(combs));

console.timeEnd("start day 10");