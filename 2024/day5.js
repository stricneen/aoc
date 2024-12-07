const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(5);
const text = buffer.split(/\n/);

const order = []
const pages = []

for (let i = 0; i < text.length; i++) {
    const l = text[i];
    if (l.includes('|')) {
        order.push([parseInt(l.split('|')[0]), parseInt(l.split('|')[1])])
    }
    if (l.includes(',')) {
        pages.push(l.split(',').map(x => parseInt(x)))
    }
}
// console.log(order)
// console.log(pages)
p1 = p2 = 0


const mid = (a) => a[Math.trunc(a.length / 2)]

for (let i = 0; i < pages.length; i++) {
    valid = true
    const p = pages[i];
    for (let j = 0; j < order.length; j++) {
        const [a, b] = order[j];
        if (p.includes(a) && p.includes(b)) {
            if (p.indexOf(a) > p.indexOf(b)) {
                valid = false
                break
            }
        }
    }
    if (valid) {
        p1 += mid(p)
    } else {
        for (let k = 0; k < order.length; k++) {
            for (let j = k; j < order.length; j++) {
                const [a, b] = order[j];
                if (p.includes(a) && p.includes(b)) {
                    if (p.indexOf(a) > p.indexOf(b)) {
                        const temp = p[p.indexOf(a)];
                        p[p.indexOf(a)] = p[p.indexOf(b)];
                        p[p.indexOf(b)] = temp;
                    }
                }
            }
        }
        p2 += mid(p)
    }
}


// for (let i = 0; i < wrong.length; i++) {
//     const p = wrong[i];
//     for (let k = 0; k < order.length; k++) {
//         for (let j = 0; j < order.length; j++) {
//             const [a, b] = order[j];
//             if (p.includes(a) && p.includes(b)) {
//                 if (p.indexOf(a) > p.indexOf(b)) {
//                     const temp = p[p.indexOf(a)];
//                     p[p.indexOf(a)] = p[p.indexOf(b)];
//                     p[p.indexOf(b)] = temp;
//                 }
//             }
//         }
//     }
//     p2 += mid(p)
// }

assert(p1 === 5762, 'p1')
assert(p2 === 4130, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
