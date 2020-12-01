const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const aoc = require('./aoc');
    
const buffer = aoc.readfile('day01.txt');

const text = buffer.split(/\n/);
const l = text.map(x => parseInt(x));


// const l = [1721
//     ,979
//     ,366
//     ,299
//     ,675
//     ,1456];

// Rank  857

for (var a = 0; a < l.length; a++) 
    for (var b =a; b < l.length; b++) 
        if (l[a] + l[b] == 2020) {
            console.log(l[a], l[b]);
            console.log("Part 1 : ", l[a] * l[b]);
        }

for (var a = 0; a < l.length; a++) 
    for (var b =a; b < l.length; b++) 
        for (var c =b; c < l.length; c++)
            if (l[a] + l[b] + l[c] == 2020) {
                console.log(l[a], l[b] , l[c]);
                console.log("Part 2 : ", l[a] * l[b] * l[c]);
            }







// const calc = input.map(x => (Math.floor(x/3))-2);
// const p1 = aoc.sum(calc);
// console.log("Part 1 ", p1);     // 3394689


// const calcFuel = (x) => x < 9 ? 0 : (Math.floor(x/3))-2 + calcFuel((Math.floor(x/3))-2);
// const calc2 = input.map(x => calcFuel(x));
// var p2 = aoc.sum(calc2);
// console.log("Part 2 ", p2);     // 5089160
