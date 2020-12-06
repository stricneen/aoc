const aoc = require('./aoc');
    
const buffer = aoc.readfile('day06.txt');

const text = buffer.split(/\n/);

const groups = aoc.group(text);

const lengths = groups.map(l => l.join(''))
                    .map(l => aoc.dedup_str(l))
                    .map(x => x.length);

console.log("Part 1 : ", aoc.sum(lengths));


var g = groups.map(x => {
    if (x.length == 0) return 0;
    var a = 0;
    x[0].split('').forEach(e => {
        if (x.every(y => y.indexOf(e) > -1)){
            a++;
        }
    });
    return a;
});

console.log("Part 2 : ", aoc.sum(g));
