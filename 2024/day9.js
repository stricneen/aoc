const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(9);
const text = buffer.split('').map(Number);

p1 = p2 = 0

const defrag = [];
let fileId = 0;

const gaps = []
const files = []

for (let i = 0; i < text.length; i++) {
    const length = text[i];
    if (i % 2 === 0) {
        files.push([length, fileId, defrag.length])
        for (let j = 0; j < length; j++) {
            defrag.push(fileId);
        }
        fileId++;
    } else {
        gaps.push([defrag.length, length])
        for (let j = 0; j < length; j++) {
            defrag.push(".");
        }
    }
}
const defrag2 = [...defrag]

// Part 1
while (true) {
    empty = defrag.indexOf('.')
    ls = defrag.length - 1
    while (defrag[ls] === '.') {
        ls--
    }
    if (ls <= empty) break;
    defrag[empty] = defrag[ls]
    defrag[ls] = '.'
}

// Part 2
for (let i = files.length - 1; i >= 0; i--) {
    const [fileLen, num, fpos] = files[i];
    for (let j = 0; j < gaps.length; j++) {
        const [pos, space] = gaps[j];
        if (fileLen <= space && pos < fpos) {
            gaps[j] = [pos + fileLen, space - fileLen]
            gaps.push([fpos, fileLen])
            gaps.sort(([a1, b1], [a2, b2]) => a1 - a2)

            for (let i = 1; i < gaps.length; i++) {
                const [pos1, len1] = gaps[i - 1];
                const [pos2, len2] = gaps[i];
                if (pos1 + len1 === pos2) {
                    gaps[i - 1] = [pos1, len1 + len2]
                    gaps[i] = [0, 0]
                }
            }

            for (let k = 0; k < fileLen; k++) {
                defrag2[pos + k] = num
                defrag2[fpos + k] = '.'
            }
            break
        }
    }
}


for (let i = 0; i < defrag.length; i++) {
    p1 += defrag[i] === '.' ? 0 : defrag[i] * i
    p2 += defrag2[i] === '.' ? 0 : defrag2[i] * i
}

assert(p1 === 6288599492129, 'p1')
assert(p2 === 6321896265143, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
