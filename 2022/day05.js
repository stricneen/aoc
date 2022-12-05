const aoc = require('./aoc');
const buffer = aoc.readfile('day05.txt');

const text = buffer.split(/\n/);
// const nums = text.map(x => parseInt(x));

let a = 'HTZD'
let b = 'QRWTGCS'
let c = 'PBFQNRCH'
let d = 'LCNFHZ'
let e = 'GLFQS'
let f = 'VPWZBRCS'
let g = 'ZFJ'
let h = 'DLVZRHQ' 
let i  = 'BHGNFZLD'

// move 2 from 1 to 9
const moves = text.map(x => x.split(' '))
     .map(x => ([x[1], x[3], x[5]]))

console.log(moves)

const stacks = [
    a.split(''),
    b.split(''),
    c.split(''),
    d.split(''),
    e.split(''),
    f.split(''),
    g.split(''),
    h.split(''),
    i.split(''),
    

]

console.log(stacks)
// move 2 from 1 to 9
for (let i = 0; i < moves.length; i++) {

    for (let j = 0; j < moves[i][0]; j++) {
        
        const m = stacks[(moves[i][1])-1].splice(-1)
        stacks[(moves[i][2])-1].push(m[0])
        
    }
    
//    RFFFBPNS
//    RFFFWBPNS
}
// console.log("Part 1 : ", (p1)) // 431
// console.log("Part 2 : ", (p2)) // 823
let p1 =''
for (let i = 0; i < stacks.length; i++) {
    p1 += stacks[i][stacks[i].length -1]
    
}
console.log(p1)