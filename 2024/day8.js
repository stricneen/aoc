const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(8);
const text = buffer.split(/\n/);

const nodes = aoc.createMapArray();
const antinodes1 = [];
const antinodes2 = [];

for (let i = 0; i < text.length; i++) {
    const line = text[i].split('');
    for (let j = 0; j < line.length; j++) {
        if (line[j] !== '.' && line[j] !== '#') {
            nodes.add(line[j], [i, j])
        }
    }
}

const valid = ([x, y]) => x >= 0 && y >= 0 && y < text.length && x < text[0].length

for (const key of nodes.map().keys()) {
    for (const [[x1, y1], [x2, y2]] of aoc.pairs(nodes.map().get(key))) {
        // p1
        const xdiff = x2 - x1
        const ydiff = y2 - y1

        const node1 = [x1 - xdiff, y1 - ydiff]
        const node2 = [x2 + xdiff, y2 + ydiff]

        if (valid(node1)) antinodes1.push(node1)
        if (valid(node2)) antinodes1.push(node2)

        // p2
        antinodes2.push([x1, y1])
        antinodes2.push([x2, y2])
        node = [x1 - xdiff, y1 - ydiff]
        while (valid(node)) {
            antinodes2.push(node)
            node = [node[0] - xdiff, node[1] - ydiff]
        }

        node = [x2 + xdiff, y2 + ydiff]
        while (valid(node)) {
            antinodes2.push(node)
            node = [node[0] + xdiff, node[1] + ydiff]
        }
    }
}

p1 = aoc.dedupArray(antinodes1).length
p2 = aoc.dedupArray(antinodes2).length

assert(p1 === 291, 'p1')
assert(p2 === 1015, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
