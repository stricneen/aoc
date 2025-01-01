const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(16);
const data = buffer.split('\n');

const nodes = data.map(x => {
    const [a, b] = x.split('; ');
    return {
        valve: a.split(' ')[1],
        rate: parseInt(aoc.extractStrictNums(a.split(' ')[4])),
        tunnels: b.replaceAll(/,/g, '').split(' ').slice(4).map(x => [x, 1])
    }
})

for (const node of nodes) {
    node.dists = {};
    const visited = new Set();
    const q = [[node.valve, 0]];
    while (q.length) {
        const [loc, dist] = q.shift();
        if (visited.has(loc)) continue;
        if ((nodes.find(x => x.valve === loc).rate > 0) && loc !== node.valve) 
            node.dists[loc] = dist;
        visited.add(loc);
        for (const [tunnel, _] of nodes.find(x => x.valve === loc).tunnels) {
            q.push([tunnel, dist + 1]);
        }
    }
}

let tt = 0;
const indices = {};
for (const iterator of nodes.filter(x => x.valve !== 'AA')) {
    indices[iterator.valve] = tt++;
}

const n = {}
for (const node of nodes) {
    n[node.valve] = node;
}

const memo = new Map();
const dfs = (time, valve, bitmask) => {
    // const key = `${time}-${valve}-${bitmask}`;
    // if (memo.has(key)) return memo.get(key);

    let max = 0
    for (const [tunnel, cost] of Object.entries(n[valve].dists)) {
        const bit = 1 << indices[tunnel];
        if (bitmask & bit) continue; // already opened ?

        const remaining = time - cost - 1;
        if (remaining <= 0) continue;
        max = Math.max(max, dfs(remaining, tunnel, bitmask | bit) + (n[tunnel].rate * remaining));
    }

    // memo.set(key, max);
    return max;
}

const p1 = dfs(30, 'AA', 0b0)
assert(p1 === 2330, 'Part 1 failed');
console.log('Part 1 : ', p1); //  2330  1707


const masks = (1 << Object.keys(nodes[0].dists + 1).length) - 1
let p2 = 0
for (let i = 0; i < masks / 2; i++) {
    const r = dfs(26, 'AA', i) + dfs(26, 'AA', masks ^ i);
    p2 = Math.max(p2, r);
}

assert(p2 === 2675, 'Part 2 failed');
console.log('Part 2 : ', p2) 
