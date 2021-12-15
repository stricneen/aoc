const aoc = require('./aoc');
const buffer = aoc.readfile('day15.txt');
const text = buffer.split(/\n/);
const points = text.map(x => x.split('')).map(y => y.map(z => parseInt(z)));

const len =  (points[0].length -1);
const dist = (points[0].length -1) * 2;

const start = (Math.pow(2,len)) -1;
console.log(len);
console.log((start >>> 0).toString(2).padStart(dist ,'0'));

const stop = '1'.repeat(dist);

let lowest = 100000000;
let counter = start;
while(true) {

    const path = (counter >>> 0).toString(2).padStart(dist ,'0');

    const l = path.split('').filter(x => x === 0).length;
    const d = path.split('').filter(x => x === 1).length;
    if (l !== d) break;
    

    let score = 0;
    let x = 0;
    let y = 0;
    let valid = true;
    let go = '';
    for (const dir of path.split('')) {
        if (dir === '0') x++;
        if (dir === '1') y++;
        if (x > len || y > len) {
            valid = false;
            break;
        }
        go = go + dir // points[x][y].toString();
        //console.log(x,y)
        score += points[x][y];
       
    }
    
// 1163751742
// 1381373672
// 2136511328
// 3694931569
// 7463417111
// 1319128137
// 1359912421
// 3125421639
// 1293138521
// 2311944581

    if (score < lowest && valid) {
     console.log(score, go)
        lowest = score;
    }
    if (path === stop) break;
    counter ++;
}







console.log('Part 1 : ', lowest);
console.log('Part 2 : ', 0);
