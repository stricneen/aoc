const { POINT_CONVERSION_COMPRESSED } = require('constants');
const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const text1 = buffer.split(/\n/);
// const input = text.map(x => parseInt(x));
const text = text1.join('');

const len = 6 ;// text1[0].length; CHANGE

// console.log(text);

const occ = (x) => x.split('').filter(x => x == '#').join('').length;

const state = (text2, x) => {

    var ret = '';
    const ul = (x) % len == 0 ? '' : text2[x-len-1] || '';
    const l  = (x) % len == 0 ? '' : text2[x-1] || '';
    const dl = (x) % len == 0 ? '' : text2[x+len-1] || '';

    const u  = text2[x-len] || '';
    const d  = text2[x+len] || '';

    const ur = (x+1) % len == 0 ? '' : text2[x-len+1] || '';
    const r  = (x+1) % len == 0 ? '' : text2[x+1] || '';
    const dr = (x+1) % len == 0 ? '' : text2[x+len+1] || '';

    // console.log(ul);
    const  s = ul + u + ur + l + r + dr + d + dl;
if (x == 10) debugger;
// console.log(s);
    if (text2[x] == '.') {
        ret += '.';
    } else if (text2[x] == 'L' && occ(s)==0){
        ret += '#';
    } else if (text2[x] == '#' && occ(s) >= 4 ) {
        ret += 'L';
    } else ret += text2[x];

// mine #.LL.L#.## LLL
// actu #.LL.L#.## #LLLLLL.L#L.L.L..L.

    return ret;
}

const pos_to_coord = (data, width, coord) => {
    return data[(coord.y * width) + coord.x];
} 

const t = {name: 'Paul', age: 34};

const state2 = (grid, width, x) => {

    // whats to the left ?
    
    const view = aoc.range(0, grid.length)
        .map(e =>  { return {x: -e, y: 0 } })
       // .map(e => vat(grid, width, e))
        .filter(e => !!e);

    return view;




}

// var t = text;
// var i = 0;

// var l = text;
// while (true) {
 
//     const b = l.split('').filter(x => x == '#').join('').length;
//    l   = l.split('').map((x,i) => state(l,i)).join('');
//     // console.log(l);
//     const a = l.split('').filter(x => x == '#').join('').length;
    

//     // i++;
//     if (a == b) {
//        console.log(l.split('').filter(x => x == '#').join('').length);
//         break;

//     }
// }

var l = text;
var grid = aoc.range(1, 37);

l   = l.split('').map((x,i) => state2(grid,6, 8)).join('');
console.log(l);

// l   = l.split('').map((x,i) => state2(grid,20)).join('');
// console.log(l);

// l   = l.split('').map((x,i) => state2(grid,36)).join('');
// console.log(l);



// console.log(test);
