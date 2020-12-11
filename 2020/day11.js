const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const text1 = buffer.split(/\n/);
// const input = text.map(x => parseInt(x));
const text = text1.join('');

const len = text1[0].length;

console.log(text);

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


const state2 = (grid, x) => {

    var ret = '';
    const ul = (x) % len == 0 ? '' : grid[x-len-1] || '';
    // const l  = (x) % len == 0 ? '' : text2[x-1] || '';
    const dl = (x) % len == 0 ? '' : grid[x+len-1] || '';

    const u  = grid[x-len] || '';
    const d  = grid[x+len] || '';

    const ur = (x+1) % len == 0 ? '' : grid[x-len+1] || '';
    const r  = (x+1) % len == 0 ? '' : grid[x+1] || '';
    const dr = (x+1) % len == 0 ? '' : grid[x+len+1] || '';


    const l = grid.slice(x +1, );
    console.log(l);

    const  s = ul + u + ur + l + r + dr + d + dl;

    if (grid[x] == '.') {
        ret += '.';
    } else if (grid[x] == 'L' && occ(s)==0){
        ret += '#';
    } else if (grid[x] == '#' && occ(s) >= 4 ) {
        ret += 'L';
    } else ret += grid[x];

    return ret;
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
l   = l.split('').map((x,i) => state2(l,i)).join('');
console.log(l);

