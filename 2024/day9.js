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

// console.log(expanded)

// 00...111...2...333.44.5555.6666.777.888899


// console.log(expanded.length)
// console.log(gaps)
// console.log(files)


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

for (let i = files.length - 1; i >= 0; i--) {
    // console.log(expanded2.join(''))
    // console.log(i)
    const [fileLen, num, fpos] = files[i];
    // console.log(fileLen, num)
    // can it fit ?
    for (let j = 0; j < gaps.length; j++) {
        const [pos, space] = gaps[j];
        if (fileLen <= space && pos < fpos) {
            
            // console.log('fit', pos, space)
            // console.log('gaps', gaps)
            gaps[j] = [pos + fileLen, space - fileLen]
            gaps.push([fpos, fileLen])

            gaps.sort(([a1,b1], [a2,b2]) => a1 - a2)

        for (let i = 1; i < gaps.length; i++) {
            const [pos1, len1] = gaps[i-1];
            const [pos2, len2] = gaps[i];

            if (pos1 + len1 === pos2) {
                gaps[i-1] = [pos1, len1 + len2]
                gaps[i] = [0,0]
                
            }   
        }
            // console.log('gaps', gaps)
            for (let k = 0; k < fileLen; k++) {
                defrag2[pos + k] = num
                defrag2[fpos + k] = '.'
            }
            break
        }        
    }
   
}





for (let i = 0; i < defrag.length; i++) {
    if (defrag[i] === '.') {
        continue
    }
    p1 += defrag[i] * i
}

for (let i = 0; i < defrag2.length; i++) {
    if (defrag2[i] === '.') {
        continue
    }
    p2 += defrag2[i] * i
}

      
assert(p1 === 6288599492129, 'p1')
assert(p2 === 6321896265143, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
