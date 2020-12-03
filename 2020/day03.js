const aoc = require('./aoc');
const buffer = aoc.readfile('day03.txt');
const text = buffer.split(/\n/);

const check = (x,y) =>  {
    var xn = x;
    var trees = 0;
    for (var i = y; i < text.length; i+=y) {
        const line = text[i];
        if (line.split('')[xn % line.length] == '#') {
            trees ++;
        }
        xn += x;
    }
    return trees;
}

console.log("Part 1 : ", check(3,1));

var results = [check(1,1), check(3,1), check(5,1), check(7,1), check(1,2)];
var p2 = aoc.product(results);

console.log("Part 2 : ", p2);
