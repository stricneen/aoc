const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const data = buffer.split(/\n\n/)
    .map(x => x.split(/\n/).map( y => JSON.parse(y)));


// const compare2 = (a, b) => {
//     console.log(a,'<>',b)
//     if (Number.isInteger(a) && Array.isArray(b)) {
//         a = [a]
//     }
    
//     if (Array.isArray(a) && Number.isInteger(b)) {
//         b = [b]
//     }
    
//     if (Number.isInteger(a) && Number.isInteger(b)) {
//         if (a<b) return 1
//         if (a===b) return 0
//         return -1
//     }
    
    
//     if (Array.isArray(a) && Array.isArray(b)) {
    
//         i=0
//         while (i < a.length && i < b.length){
//             t = compare(a[i],b[i])
//             console.log(i,a,b)
//             if (t === 1) return 1
//             if (t === -1) return -1
//             i++
//         }

//         if (i === a.length) {
//             if (a.length === b.length) {
//                 return 0
//             }
//             return 1
//         }
//         return -1

//     }


//     // Testing lists

// }

const compare = (a, b, tab) => {
    console.log(' '.repeat(tab * 2), a,'<>',b)

    if (Number.isInteger(a) && Number.isInteger(b)) {
        if (a<b) return 1
        if (a>b) return -1
        return 0
    }

    if (Array.isArray(a) && Number.isInteger(b)) b = [b]
    if (Array.isArray(b) && Number.isInteger(a)) a = [a]

    // TWO LISTS
    min = Math.min(a.length, b.length)
console.log('min', min)
    for (let i = 0; i <= min; i++) {
        console.log(' '.repeat(tab * 2), i, a, b)
        n = compare(a[i], b[i], tab + 1)

        if (n === 1) return 1
        if (n === -1) return -1
    }

    console.log('wtf')

}


const index = []
for (let i = 0; i < data.length; i++) {
    c = compare(data[i][0], data[i][1] ,0)
    console.log('----------->',c)
    if (c === 1) {
        index.push(i+1)
    }
}

console.log(index)
console.log('Part 1 : ', aoc.sum(index)); // 5623
// console.log('Part 2', p2());   // 20570

 // [1,2,4,6]