const aoc = require('./aoc');
    
const buffer = aoc.readfile('day06.txt');

const text = buffer.split(/\n/);
// const input = text.map(x => parseInt(x));
// 5348
const group = text.reduce((a,x) => {
        if (x.length == 0) {
            a.push([]);
            return a;
        } else {

            var e = a[a.length-1];
            e.push(x);
            return a;
        }


}, [[]]);

console.log(group);

var g = group.map(x => {

    if (x.length == 0) return 0;

var a = 0;
    var c = x[0];

    c.split('').forEach(e => {
        
        if (x.every(y => y.indexOf(e) > -1)){
            a++;
        }

    });


    return a;
});

console.log(g);

console.log(aoc.sum(g));

// const dedup = group.map(x => {
//     var y = x.split('');
//     var z = [...new Set(y)];

//     return z.sort().join('');
// });

// // console.log(dedup);

// const len = dedup.map(x => x.length);

// // console.log(len);

// console.log(aoc.sum(len));
    