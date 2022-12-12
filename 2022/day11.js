const aoc = require('./aoc');
const buffer = aoc.readfile('day11.txt');
const text = buffer.split(/\n/);

const testmonkeys = [
    {
        items: [79, 98],
        op: (old) => old * 19,
        test: (x) => x % 23 === 0,
        red: (x) => x % 23,
        key: 23,
        tt: 2,
        tf: 3,
        inspected: 0
    },
    {
        items: [54, 65, 75, 74],
        op: (old) => old + 6,
        test: (x) => x % 19 === 0,
        red: (x) => x % 19,
        key: 19,

        tt: 2,
        tf: 0,
        inspected: 0
    },
    {
        items: [79, 60, 97],
        op: (old) => old * old,
        test: (x) => x % 13 === 0,
        red: (x) => x % 13,
        key: 13,

        tt: 1,
        tf: 3,
        inspected: 0
    },
    {
        items: [74],
        op: (old) => old + 3,
        test: (x) => x % 17 === 0,
        red: (x) => x % 17,
        key: 17,

        tt: 0,
        tf: 1,
        inspected: 0
    },
]

const realmonkeys = [
    {
        items: [99, 67, 92, 61, 83, 64, 98],
        op: (old) => old * 17,
        test: (x) => x % 3 === 0,
        key: 3,
        tt: 4,
        tf: 2
    },
    {
        items: [78, 74, 88, 89, 50],
        op: (old) => old * 11,
        test: (x) => x % 5 === 0,
        key: 5,
        tt: 3,
        tf: 5
    },
    {
        items: [98, 91],
        op: (old) => old + 4,
        test: (x) => x % 2 === 0,
        key: 2,
        tt: 6,
        tf: 4
    },
    {
        items: [59, 72, 94, 91, 79, 88, 94, 51],
        op: (old) => old * old,
        test: (x) => x % 13 === 0,
        key: 13,
        tt: 0,
        tf: 5
    },
    {
        items: [95, 72, 78],
        op: (old) => old + 7,
        test: (x) => x % 11 === 0,
        key: 11,
        tt: 7,
        tf: 6
    },
    {
        items: [76],
        op: (old) => old + 8,
        test: (x) => x % 17 === 0,
        key: 17,
        tt: 0,
        tf: 2
    },
    {
        items: [69, 60, 53, 89, 71, 88],
        op: (old) => old + 5,
        test: (x) => x % 19 === 0,
        key: 19,
        tt: 7,
        tf: 1
    },
    {
        items: [72, 54, 63, 80],
        op: (old) => old + 3,
        test: (x) => x % 7 === 0,
        key: 7,
        tt: 1,
        tf: 3
    },
];

const realmonkeys2 = realmonkeys.map(x => ({...x, items: [...x.items]}))

const solve = (m, rounds, worryFn) => {

    const monkeys = m.map(x => ({ ...x, inspected: 0 }))
    const mod = aoc.product(monkeys.map(m => m.key))

    for (let round = 1; round <= rounds; round++) {

        for (const monkey of monkeys) {
            monkey.inspected += monkey.items.length
            for (const item of monkey.items) {
                // const newWorry = worryFn(monkey.op(item)) //  (Math.trunc(monkey.op(item) / worried)) //% (mod )
                const newWorry = worryFn(monkey.op(item)) // % mod
                const toMonkey = monkey.test(newWorry) ? monkey.tt : monkey.tf;
                monkeys[toMonkey].items.push((newWorry))
            }
            monkey.items = []
        }
    }
    const s = aoc.sort_ints(monkeys.map(x => x.inspected)).reverse()
    return s[0] * s[1]
}


const mod = aoc.product(realmonkeys.map(m => m.key))
console.log("Part 1 : ", solve(realmonkeys, 20, worry => Math.trunc(worry / 3))) // 120384
console.log("Part 2 : ", solve(realmonkeys2, 10000, worry => worry % mod)) // 32059801242
