const aoc = require('./aoc');
const buffer = aoc.readfile('day01.txt');

const text = buffer.split(/\n/);
const l = text.map(x => parseInt(x));

for (var a = 0; a < l.length; a++) 
    for (var b =a; b < l.length; b++) 
        if (l[a] + l[b] == 2020) {
            console.log("Part 1 : ", l[a] * l[b]);
        }

for (var a = 0; a < l.length; a++) 
    for (var b =a; b < l.length; b++) 
        for (var c =b; c < l.length; c++)
            if (l[a] + l[b] + l[c] == 2020) {
                console.log("Part 2 : ", l[a] * l[b] * l[c]);
            }

