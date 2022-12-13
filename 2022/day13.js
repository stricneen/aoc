const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const m = buffer.split(/\n/);

// 5768 h

// console.log(m)
stack = 0
const compare = (a,b) => {

// if (a  && b)
// {
//     console.log('xxxxxxxxx')
//     return false
// }
// if (a === undefined && b !== undefined) return true
// console.log(typeof a)


console.log(a,'<>',b)
stack ++
// if (stack > 10) return 
    // if (!b) return false;

    const ca = Number.isInteger(a) ? a : a.shift();
    cb = {}
    try {
    cb = Number.isInteger(b) ? b : b.shift();
    } catch {return false}
    // if (ca !== undefined && cb === undefined) return false



    if (typeof ca === 'undefined')return true
if (typeof cb === 'undefined')return false// a0 = a[0]
    // b0 = b[0]
    console.log('in',ca,cb)
    // console.log('first', a0,b0)

    if (Number.isInteger(ca) && Number.isInteger(cb)) {
        console.log('both nums')
        if (ca > cb) return false;
        if (ca < cb) return true;
        if ( ca===cb) {
            return compare(a, b)
        }
    }

    else if (Array.isArray(ca) && Array.isArray(cb)) {
        console.log('both arrays')

        if (ca.length === 0) return true
        if (cb.length ===0) return false

        x =[ [ 2, [ 3, [4,5,6] ] ], 8, 9 ] 
        y = [  2, [ 3, [4,5,6] ] , 8, 9 ] 

        console.log(ca)
        console.log(a)
        console.log(cb)
        console.log(b)

        return compare(ca.concat(a), cb.concat(b))
    }


    else if (Array.isArray(ca)) {
        return compare(ca, [cb])
    } else 
    {
        return compare([ca] ,cb)
    }

}

ctr = 0
p1 = 0
ind = 1
sc = []
while (ctr < m.length) {
stack = 0
    left = JSON.parse(m[ctr++])
    right = JSON.parse(m [ctr++])
    ctr++

    const c = compare(left, right)
if (c){
    p1+=ind
    sc.push(ind)
}
    console.log('-------', c)
// if (ctr > 11)break;
ind ++
}

console.log(sc)

p2=0
console.log('Part 1', p1);
console.log('Part 2', p2);
