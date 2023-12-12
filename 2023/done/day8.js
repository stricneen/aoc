const aoc = require('../aoc');
const buffer = aoc.readfile('day8.txt');
const textraw = buffer.split(/\n/);

const { insts, network } = textraw.reduce((a, e, i) => {
    if (i === 0) a.insts = e;
    if (i > 1) {
        const s = e.split(' = ')
        a.network[s[0]] = [s[1].slice(1, 4), s[1].slice(6, 9)]
    }
    return a;
}, { network: {} })

const traverse = (start, terminate) => {
    let i = 0;
    let node = start;
    let step = 0;

    while (true) {
        const ni = insts[i++ % insts.length] === 'R' ? 1 : 0
        node = network[node][ni];
        step++;
        if (terminate(node)) return step;
    }
}

const p2starts = Object.keys(network).filter(x => x.endsWith('A'));
const times = p2starts.map(x => traverse(x, y => y.endsWith('Z')));

console.log('Part 1:', traverse('AAA', f => f === 'ZZZ')); // 12643
console.log('Part 2:', aoc.lcm(times)); // 13133452426987