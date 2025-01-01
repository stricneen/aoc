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


for (const valve of nodes) {
    valve.dists = {};
    const visited = new Set();
    const q = [[valve.valve, 0]];
    while (q.length) {
        const [loc, dist] = q.shift();
        if (visited.has(loc)) continue;

        if (valve.rate > 0 || valve.valve === 'AA') valve.dists[loc] = dist;
        visited.add(loc);

        for (const [tunnel, _] of nodes.find(x => x.valve === loc).tunnels) {
            q.push([tunnel, dist + 1]);
        }
    }
}


const zeroFlows = nodes.filter(x => x.rate === 0 && x.valve !== 'AA');
const nonZeroFlows = nodes.filter(x => x.rate !== 0 && x.valve !== 'AA');

let tt = 0;
const indices = {};
for (const iterator of nodes) {
    indices[iterator.valve] = tt++;
}

console.log(nodes)

const memo = new Map();

const dfs = (time, valve, bitmask) => {
    const key = `${time}-${valve}-${bitmask}`;
    // console.log(time, valve, bitmask, bitmask.toString(2))
    // if (memo.has(key)) return memo.get(key);
    
    let max = 0
    const node =  nodes.find(x => x.valve === valve);

    for (const [tunnel, cost] of Object.entries(node.dists)) {
        const bit = 1 << indices[tunnel];
        if (bitmask & bit) continue; // already opened ?
        const remaining = time - cost - 1;

        if (remaining <= 0) continue;
        max = Math.max(max, dfs(remaining, tunnel, bitmask | bit) + (node.rate * remaining));
    }

    memo.set(key, max);
    return max;
}

// 1651 // 2330

const aa = dfs(30, 'AA', 0)
console.log(memo)
console.log(aa)

