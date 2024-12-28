const bronKerbosch = require('@seregpie/bron-kerbosch');
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(23);
const raw = buffer.split(/\n/);
const comms = raw.map(e => e.split('-')).map(e => e.sort()).map(e => [e, JSON.stringify(e)]);



const triples = (network) => {
    const conns = new Set();
    for (const [[a, b], key] of network) {
        const aconn = network.filter(([k, _]) => k.includes(a)).map(([k, _]) => k.filter(e => e !== a));
        const bconn = network.filter(([k, _]) => k.includes(b)).map(([k, _]) => k.filter(e => e !== b));
        const intersect = aoc.intersect(aconn.flat(), bconn.flat());
        for (const i of intersect) {
            const triple = [a, b, i].sort();
            conns.add(JSON.stringify(triple));
        }
    }
    return conns;
}


// console.log(comms);

const nodes = new Set();
for (const c of comms) {
    nodes.add(c[0][0]);
    nodes.add(c[0][1]);   
}


const cy = []
for (const N of nodes) {
    cy.push({ data: { id: N } });
}
for (const c of comms) {
    cy.push({ data: { id: c[1], source: c[0][0], target:c[0][1] } });
}

console.dir(cy);
require('fs').writeFileSync('cy.json', JSON.stringify(cy, null, 2));

const d3 = {nodes: [], links: []};
for (const N of nodes) {
    d3.nodes.push({ id: N });
}
for (const c of comms) {
    d3.links.push({ source: c[0][0], target:c[0][1] });
}

let tt = [
    { // node a
        data: { id: 'a' }
    },
    { // node b
        data: { id: 'b' }
    },
    { // edge ab
        data: { id: 'ab', source: 'a', target: 'b' }
    }
]
// const map = new Map();
// for (const [[a,b], key] of comms) {
//     if (map.has(a)) {
//         map.get(a).push(b);
//     } else {
//         map.set(a, [b]);
//     }    
//     if (map.has(b)) {
//         map.get(b).push(a);
//     } else {
//         map.set(b, [a]);
//     }
// }

// console.log(map);




const trips = triples(comms);
const p1 = [...trips].filter(t => t.includes('\"t')).length;

const edges = comms.map(([[x, y], _]) => [x, y]);
const cliques = bronKerbosch(edges);
const largestSize = cliques.map(e => e.length).sort((a, b) => b - a)[0];

const p2 = cliques.filter(e => e.length === largestSize)[0].sort().join(',');




assert(p1 === 1083, 'p1');
assert(p2 === 'as,bu,cp,dj,ez,fd,hu,it,kj,nx,pp,xh,yu', 'p2');
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
