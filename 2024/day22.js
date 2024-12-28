const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(22);
const nums = buffer.split(/\n/).map(Number);

function* sequence(seed) {
    let n = seed;

    const step = (v, f) => {
        let step1 = f(v)
        let step2 = (v ^ step1) >>> 0;
        let step3 = step2 % 16777216;
        return step3
    }

    while (true) {
        let step1 = step(n, (v) => v * 64);
        let step2 = step(step1, (v) => Math.trunc(v / 32));
        let step3 = step(step2, (v) => v * 2048);

        n = step3
        yield step3
    }
}

const s = (seed, to) => {
    let n = sequence(seed)
    for (let i = 0; i < to; i++) {
        v = n.next().value
    }
    return v;
}

const memoc = new Map();
const changes = (seed) => {
    if (memoc.has(`${seed}`)) return memoc.get(`${seed}`)
    let p = seed % 10;
    const c = [];
    let seq = sequence(seed)
    for (let i = 0; i < 2000; i++) {
        let n = seq.next().value % 10;
        c.push([n, n - p]);
        p = n;
    }
    memoc.set(`${seed}`, c)
    return c
}

const memo = new Map();
const getSeqs = (seed, price, seq) => {
    if (memo.has(`${seed}.${price}`)) return memo.get(`${seed}.${price}`)
    const s = []
    for (let i = 4; i < seq.length; i++) {
        if (seq[i][0] == price) {
            s.push([price, `${seq[i - 3][1]},${seq[i - 2][1]},${seq[i - 1][1]},${seq[i][1]}`])
        }
    }
    memo.set(`${seed}.${price}`, s);
    return s;
}

const getAllSeqs = (seed) => {
    const seq = changes(seed);
    const s = []
    for (let i = 3; i < seq.length; i++) {
        s.push([seq[i][0], `${seq[i][1]},${seq[i - 1][1]},${seq[i - 2][1]},${seq[i - 3][1]}`])
    }
    return s;
}

const seqs = []
const nines = new Set();
for (const num of nums) {
    const ddd = getAllSeqs(num);
    // console.log(ddd)
    seqs.push([num, ddd]);

    const f = ddd.filter(([t, s]) => t === 7);
    // console.log(f)
    for (const [_, key] of f) {
        nines.add(key)
    }
}

const scores = {}
let cnt = nines.size

for (const nine of nines) {
    scores[nine] = 0
    for (const seq of seqs) {
        // console.log(seq[0])
        // console.log(seq)
        // if (seq[1].includes(nine)) {

        for (let i = 0; i < seq[1].length; i++) {
            if (seq[1][i][1] === nine) {
                scores[nine] += seq[1][i][0]
                break
            }
        }
    }
    console.log(cnt--)
}

const p1 = aoc.sum(nums.map(n => s(n, 2000)))
const p2 = Math.max(...Object.values(scores))

assert(p1 === 15303617151, 'p1')
assert(p2 === 1727, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);