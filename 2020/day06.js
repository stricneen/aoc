const aoc = require('./aoc');
    
const buffer = aoc.readfile('day06.txt');

const text = buffer.split(/\n/);
// const input = text.map(x => parseInt(x));
// 5348
const group = text.reduce((a,x) => {

        if (x.length == 0) {
            a.push("");
            return a;
        } else {
             a[a.length-1] += x;
             return a;
        }


}, [""]);



const dedup = group.map(x => {
    var y = x.split('');
    var z = [...new Set(y)];

    return z.sort().join('');
});

console.log(dedup);

const len = dedup.map(x => x.length);

console.log(len);

console.log(aoc.sum(len));
    