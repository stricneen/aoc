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

    // console.log(count);

    return (count >= x.min && count <= x.max) ;

    

    console.log(x);
    console.log(valid);

});
// 17-20 k: wbbbcqlwlvphdsqckwbm

var count = valids.filter(x => x);

console.log(count.length);
    