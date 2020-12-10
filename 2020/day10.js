const aoc = require('./aoc');
const buffer = aoc.readfile('day10.txt');
const text = buffer.split(/\n/);
const input = text.map(x => parseInt(x));

const device = Math.max(...input) + 3;

input.push(0);
input.push(device);
input.sort(function(a, b) {
    return a - b;
  });

console.log("sorted", input);

const diff = input.reduce((a,e,i) => {
    if (i == 0) return a;
    a.push(e - input[i-1]);
    return a;
}, []);

const os = diff.filter(x => x == 1).length;
const ts = diff.filter(x => x == 3).length;
// console.log(os);
// console.log(ts);
console.log(os * ts);


// split in part where 3 

// sorted [ 0,  1,      4,  5,  6,  7,    10, 11, 12,    15, 16,   19,    22]

const split = input.reduce((a,e) => {
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

console.log(split);


const combs = split.map((e) => {

    if (e.length <=2 ) return 1;

    if (e.length == 5) return 7;

    return x = ((e.length- 2) * 2);

    


});





 // 4 = 4 combs
// 3 = 2 combs   

// [4 ,5  ,6]
// [4   ,5,6,  7]
// l - 2 * *2


console.log(combs);

console.log(aoc.product(combs));

// 19208


// console.log("Device" , device);
// console.log(input);
    
// 4 = 4 combs
// 3 = 2 combs



// (0), 1,     4, 5, 6, 7,    10, 11, 12,        15, 16,   19, (22)
// (0), 1,     4, 5, 6, 7,    10, 12,          15,  16,         19, (22)
// (0), 1,     4, 5, 7,       10, 11, 12,      15, 16,         19, (22)
// (0), 1,     4, 5, 7,       10, 12,          15,  16,       19, (22)
// (0), 1,     4, 6, 7,       10, 11, 12,      15, 16,      19, (22)
// (0), 1,     4, 6, 7,       10, 12,          15, 16,     19, (22)
// (0), 1,     4, 7,          10, 11, 12,       15, 16,     19, (22)
// (0), 1,     4, 7,          10, 12,          15,  16,        19, (22)
