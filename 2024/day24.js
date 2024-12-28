const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(24);
const raw = buffer.split(/\n/);

const lines = {}
const gates = []
const outputs = []

// const cy = []
const nodes = new Set();
const edges = new Set();


// console.dir(cy);
// require('fs').writeFileSync('cy.json', JSON.stringify(cy, null, 2));

for (const L of raw) {
    if (L.includes(':')) {
        const [l, v] = L.split(': ')
        lines[l] = parseInt(v)
        nodes.add(l)
    }
    if (L.includes('->')) {
        const [a, b, c, d, e] = L.split(' ')
        gates.push([a, b, c, e])
        outputs.push(e)

        nodes.add(a)
        nodes.add(c)
        nodes.add(e)
        
        edges.add([a, c, e])

    }
}

// for (const N of nodes) {
//     cy.push({ data: { id: N } });
// }
// for (const [a,b,c] of edges) {
//     cy.push({ data: { id: `${a}.${c}`, source: a, target:c } });
//     cy.push({ data: { id: `${b}.${c}`, source: b, target:c } });
// }


// // const d3 = {nodes:[], links:[]}
// // for (const N of nodes) {
// //     d3.nodes.push({ id: N,group:1  });
// // }
// // for (const [a,b,c] of edges) {
// //     d3.links.push({ source: a, target:c ,value:1});
// //     d3.links.push({ source: b, target:c ,value:1});
    
// // }
// // // console.dir(cy);
// // require('fs').writeFileSync('cy24.json', JSON.stringify(d3, null, 2));

// // mrh AND bnc -> rvw
// // wrg XOR mjr -> z44
// // y10 XOR x10 -> gtn
// // y42 AND x42 -> dmw
// // wmj OR pft -> tkg
// // x13 AND y13 -> qkc
// // y05 XOR x05 -> tjs

// let out = 'digraph G {\n'
// const gw = {nodes:[], links:[]}

// // const xf = `${l} [fillcolor=orange,style=filled,label="${l}",shape="diamond"]`
// // const yf = `${l} [fillcolor=green,style=filled,label="${l}",shape="diamond"]`
// // const zf = `${l} [fillcolor=blue,style=filled,label="${l}",shape="diamond"]`

// for (const N of nodes) {
//     if (N.startsWith('x')) {
//         out += `${N} [fillcolor=orange,style=filled,label="${N}",shape="diamond"];\n`
//     }
//     if (N.startsWith('y')) {
//         out += `${N} [fillcolor=seagreen1,style=filled,label="${N}",shape="diamond"];\n`
//     }
//     if (N.startsWith('z')) {
//         out += `${N} [fillcolor=skyblue,style=filled,label="${N}",shape="diamond"];\n`
//     }
// }
// for (const [a,b,c] of edges) {
//     out += `${a} -> ${c};\n`
//     out += `${b} -> ${c};\n`
    
//     // d3.links.push({ source: a, target:c ,value:1});
//     // d3.links.push({ source: b, target:c ,value:1});
    
// }
// out += '}\n'
// // console.dir(cy);
// require('fs').writeFileSync('gw.json', out);


// const swaps = ['z11','vkq']
// cwc kmc
// console.log(swaps.sort().join(','))
// process.exit(0)


const compute = (gates, lines) => {
    while (gates.length > 0) {
        // console.log(gates)
        for (let i = 0; i < gates.length; i++) {
            const [g1, log, g2, out] = gates[i]
            if (g1 in lines && g2 in lines) {
                gates.splice(i, 1)

                switch (log) {
                    case 'AND':
                        lines[out] = lines[g1] & lines[g2]
                        break;
                    case 'OR':
                        lines[out] = lines[g1] | lines[g2]
                        break;
                    case 'XOR':
                        lines[out] = lines[g1] ^ lines[g2]
                        break;

                    default:
                        assert(false, 'Unknown gate')
                }
                break
            }
        }
    }

    const out = []
    for (const key in lines) {
        if (key.startsWith('z')) {
            out[aoc.extractNums(key)] = lines[key]
        }
    }

    return parseInt(out.reverse().join('').toString(), 2);
}

const p1 = compute([...gates], JSON.parse(JSON.stringify(lines)))


const wrong = []
const terminals = ['x', 'y', 'z']
for (const [in1, op, in2, out] of gates) {
    
    if (out[0] === 'z' && out !== 'z45' && op !=='XOR') {
        wrong.push(out)
    }

    if (op==='XOR' && 
    !terminals.includes(in1[0]) && 
    !terminals.includes(in2[0]) &&
    !terminals.includes(out[0])) {
        wrong.push(out)
    }

    if (op === 'AND' && ![in1,in2].includes('x00')) {
        for (const [in11, op1, in21, out1] of gates) {
            if ((out == in11 || out==in21) && op1 !== 'OR') {
                    wrong.push(out)
            }
        }
    }

    if (op === 'XOR') {
        for (const [in11, op1, in21, out1] of gates) {
            if ((out == in11 || out==in21) && op1 == 'OR') {
                    wrong.push(out)
            }
        }
    }
}

// hqh,mmk,pvb,qdq,vkq,z11,z24,z38

const p2 = ([...new Set(wrong)].sort().join(','))



assert(p1 === 48063513640678, 'p1');
assert(p2 === 'hqh,mmk,pvb,qdq,vkq,z11,z24,z38', 'p2');
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
