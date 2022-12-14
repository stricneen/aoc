const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const data = buffer.split(/\n\n/)
    .map(x => x.split(/\n/).map( y => JSON.parse(y)));

const compare = (a, b) => {
    console.log(a,'<>',b)
    ca = a[0]
    cb = b[0]

    if (ca === undefined) return true
    if (cb === undefined) return false
    
    if (Number.isInteger(ca) && Number.isInteger(cb)) {
        if (ca === cb) {
            return compare(a.slice(1), b.slice(1))
        }
        return a < b
    }

    if (Number.isInteger(ca) && Array.isArray(cb)) {
        ca = [ca]
    }
    if (Array.isArray(ca) && Number.isInteger(cb)) {
        cb = [cb]
    }

    const compareLists = (a,b) => {
console.log('-------', a,b)

        if (Array.isArray(a[0]) && Array.isArray(b[0])){
            return compareLists(a[0], b[0])
        }


        if (a.length === 0 && b.length === 0) return 0;

        if (a.length > 0 && b.length > 0) {
            if (a[0] < b[0]) return  1;
        }

        // if (b.length === 0) return -1;
        if (a.length > 0 && b.length === 0)  return -1
        // if (a.length === 0 && b.length > 0) return 1;

    
        

        if (a.length === 0) return  1;
        
        if (a[0] > b[0]) return -1;
        return compareLists(a.slice(1), b.slice(1))
    }


    // Testing lists
    console.log(ca,'<2>',cb)

    const cl = compareLists(ca, cb)
console.log('c1',cl)
    if (cl === 1) return true;
    if (cl === -1) return false;
    return compare(a.slice(1), b.slice(1))
    
    
    

}

const index = []
for (let i = 0; i < data.length; i++) {
    c = compare(data[i][0], data[i][1])
    console.log('----------->',c)
    if (c) {
        index.push(i+1)
    }
}
console.log(index)
console.log('Part 1', aoc.sum(index)); // 5623
// console.log('Part 2', p2());   // 20570