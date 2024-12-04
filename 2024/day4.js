const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(4);
const text = buffer.split(/\n/);

p1 = p2 = 0

for (let i = 0; i < text.length; i++) {
    const e = text[i];
    p1 += [...e.matchAll(/XMAS/g), ...aoc.revStr(e).matchAll(/XMAS/g)].length
}
for (let i = 0; i < text[0].length; i++) {
    const e = aoc.getCol(text, i);
    p1 += [...e.matchAll(/XMAS/g), ...aoc.revStr(e).matchAll(/XMAS/g)].length
}
for (let i = 0; i < text.length + text[0].length; i++) {
    const e = aoc.getDiagNE(text, i);
    p1 += [...e.matchAll(/XMAS/g), ...aoc.revStr(e).matchAll(/XMAS/g)].length
}
for (let i = 0; i < text.length + text[0].length; i++) {
    const e = aoc.getDiagNW(text, i);
    p1 += [...e.matchAll(/XMAS/g), ...aoc.revStr(e).matchAll(/XMAS/g)].length
}


const isXmas = (x) => x[0][0] === 'M' && x[0][2] === 'S' && x[1][1] === 'A' && x[2][0] === 'M' && x[2][2] === 'S'

for (let i = 0; i < text.length - 2; i++) {
    for (let j = 0; j < text.length - 2; j++) {
        t = []
        t.push(text[i][j] + text[i][j + 1] + text[i][j + 2])
        t.push(text[i + 1][j] + text[i + 1][j + 1] + text[i + 1][j + 2])
        t.push(text[i + 2][j] + text[i + 2][j + 1] + text[i + 2][j + 2])

        if (isXmas(t)) p2++
        t = aoc.rotate(t)
        if (isXmas(t)) p2++
        t = aoc.rotate(t)
        if (isXmas(t)) p2++
        t = aoc.rotate(t)
        if (isXmas(t)) p2++
    }
}

assert(p1 === 2557, 'p1')
assert(p2 === 1854, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
