const aoc = require('./aoc');
const buffer = aoc.readfile('day11.txt');
const text = buffer.split(/\n/);

const testmonkeys = [
    {
        items: [79, 98],
        op: (old) => old * 19,
        test: (x) => x % 23 === 0,
        tt: 2,
        tf: 3,
        inspected: 0
    },
    {
        items: [54, 65, 75, 74],
        op: (old) => old + 6,
        test: (x) => x % 19 === 0,
        tt: 2,
        tf: 0,
        inspected: 0
    },
    {
        items: [79, 60, 97],
        op: (old) => old * old,
        test: (x) => x % 13 === 0,
        tt: 1,
        tf: 3,
        inspected: 0
    },
    {
        items: [74],
        op: (old) => old + 3,
        test: (x) => x % 17 === 0,
        tt: 0,
        tf: 1,
        inspected: 0
    },
]

const monkeys = [
    {
        items: [ 99, 67, 92, 61, 83, 64, 98],
        op: (old) => old * 17,
        test: (x) => x % 3 === 0,
        tt: 4,
        tf: 2,
        inspected: 0
    },
    {
        items: [78, 74, 88, 89, 50],
        op: (old) => old * 11,
        test: (x) => x % 5 === 0,
        tt: 3,
        tf: 5,
        inspected: 0
    },
    {
        items: [  98, 91],
        op: (old) => old + 4,
        test: (x) => x % 2 === 0,
        tt: 6,
        tf: 4,
        inspected: 0
    },
    {
        items: [ 59, 72, 94, 91, 79, 88, 94, 51],
        op: (old) => old * old,
        test: (x) => x % 13 === 0,
        tt: 0,
        tf: 5,
        inspected: 0
    },
    {
        items: [95, 72, 78],
        op: (old) => old + 7,
        test: (x) => x % 11 === 0,
        tt: 7,
        tf: 6,
        inspected: 0
    },
    {
        items: [ 76],
        op: (old) => old + 8,
        test: (x) => x % 17 === 0,
        tt: 0,
        tf: 2,
        inspected: 0
    },
    {
        items: [ 69, 60, 53, 89, 71, 88],
        op: (old) => old + 5,
        test: (x) => x % 19 === 0,
        tt: 7,
        tf: 1,
        inspected: 0
    },
    {
        items: [72, 54, 63, 80],
        op: (old) => old + 3,
        test: (x) => x % 7 === 0,
        tt: 1,
        tf: 3,
        inspected: 0
    },
]

// console.log(testmonkeys.length)

worry = 0
round = 0

const m = [...monkeys]

for (let i = 0; i < m.length; i++) {
    m.inspected = 0
}

for (let round = 1; round <= 20; round++) {
    console.log('round', round)
    
    for(const monkey of m) {
        console.log(monkey)
        console.log(monkey.inspected)
        monkey.inspected += monkey.items.length
        console.log(monkey.items.length)
        console.log(monkey.inspected)
        console.log()
        for(const item of monkey.items) {

            newWorry = Math.trunc(monkey.op(item) / 3)
            // console.log(newWorry)
            if (monkey.test(newWorry)) {

                m[monkey.tt].items.push(newWorry)
                // console.log('>', monkey.tt)
            } 
            else 
            {
                m[monkey.tf].items.push(newWorry)
                // console.log('>' ,monkey.tf)
            }

            

        }
        monkey.items = []
      
    }
     
    // for(const x of m) {
    //     console.log(x.items)
    // }
    // for (const x of m) {
    //     console.log(x.inspected)
    // }
}

for (const x of m) {
    console.log(x.inspected)
}

s = aoc.sort_ints(m.map(x => x.inspected))
p1 = s[s.length-1] * s[s.length-2]
p2 = 0
console.log("Part 1 : ", (p1)) // 
console.log("Part 2 : ", (p2)) // 

