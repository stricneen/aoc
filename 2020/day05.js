const aoc = require('./aoc');
const buffer = aoc.readfile('day05.txt');
const text = buffer.split(/\n/);

var test = ['FBFBBFFRLR', 'BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL'];

const decode = (x,u) => {
    var c = 0;
    var s = Math.pow(2, x.length-1);
    x.split('').forEach(x => {
        if (x==u) c += s;
        s /= 2;
    });
    return c;
};

var pos = text.map(x => {
    var r = decode(x.substring(0,7), 'B');
    var c = decode(x.substr(7,3), 'R');
    return r*8+c;
})

console.log("Part 1 : ", Math.max(...pos));

for(var i=Math.min(...pos);i<Math.max(...pos);i++) {
    if (pos.includes(i-1) && pos.includes(i+1) && !pos.includes(i)) {
        console.log("Part 2 : ",i);
    }
}
