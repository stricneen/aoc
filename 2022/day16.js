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

const zeroFlows = nodes.filter(x => x.rate === 0 && x.valve !== 'AA');

for (const zeroFlow of zeroFlows) {
    const t = nodes.findIndex(x => x.valve === zeroFlow.valve);
    const r = nodes.splice(t, 1)[0]
    for (const node of nodes) {
        const connected = node.tunnels.findIndex(x => x[0] === r.valve);
        if (connected > -1) {
            // get the new destination
            const [nd, v] = zeroFlow.tunnels.find(x => x[0] !== node.valve);
            node.tunnels[connected][0] = nd;
            node.tunnels[connected][1] = node.tunnels[connected][1] + v;
        }
    }
}

console.log(nodes)
// location, mins remaining, flow rate, value
let q = [['AA', 30, 0, 0, []]]

let p1 = 0;
let c = 0;

const visited = new Set();

const add = ([loc, mins, flow, total, open]) => {
    const state = `${loc}-${mins}-${flow}-${total}-${open.sort()}`;
    if (visited.has(state)) return;
    visited.add(state)
    q.push([loc, mins, flow, total, open.sort()])
}

while (q.length) {

    const [loc, mins, flow, total, open] = q.shift();

    // const state = `${loc}-${mins}-${flow}-${total}-${open}`;
    // if (visited.has(state)) continue;
    // visited.add(state)

    // console.log('>>',loc, mins, flow, total, open)
    assert(mins >= 0, 'mins is negative')

    if (mins <= 0) {
        if (p1 < total) console.log('max', p1, loc, mins, flow, total, open)
        p1 = Math.max(p1, total);
        continue;
    }

    // all valves are open
    if (open.length === nodes.length - 1) {
        add([loc, 0, flow, total + (flow*mins), open])
    }

    const location = nodes.find(x => x.valve === loc);
    // current is not open
    if (!open.includes(location.valve) && location.valve !== 'AA') {
        // open valve
        add([loc, mins - 1, flow + location.rate, total + flow, [...open, location.valve]])
    }

    // move to other valves
    for (const [dest, cost] of nodes.find(x => x.valve === loc).tunnels) {
        if (mins >= cost) { // has enough time to move
            add([dest, mins - cost, flow, total + (flow * cost), open]);
        } else {
            add([dest, 0, flow, total + (flow * mins), open]);
        }
    }

    q = aoc.dedupArray(q)
    q.sort((a, b) => a[1] - b[1])
    // console.log(q)
    // console.log(q.length)
    // console.log()
    // if (c++ > 100000) {
    //     console.log(q)
    //     break;
    // }
}

assert(p1 === 2330, 'Part 1')

console.log('Part 1 : ', p1); // 5623
console.log('Part 2 : ', p1);    // 20570

// [
//     {
//       valve: "FF",
//       rate: 0,
//       tunnels: [
//         [ "EE", 1 ], [ "GG", 1 ]
//       ],



// Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
// Valve BB has flow rate=13; tunnels lead to valves CC, AA
// Valve CC has flow rate=2; tunnels lead to valves DD, BB
// Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
// Valve EE has flow rate=3; tunnels lead to valves FF, DD
// Valve FF has flow rate=0; tunnels lead to valves EE, GG
// Valve GG has flow rate=0; tunnels lead to valves FF, HH
// Valve HH has flow rate=22; tunnel leads to valve GG
// Valve II has flow rate=0; tunnels lead to valves AA, JJ
// Valve JJ has flow rate=21; tunnel leads to valve II

