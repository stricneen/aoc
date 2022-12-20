const aoc = require('./aoc');
const buffer = aoc.readfile('day20.txt');
const data = buffer.split(/\n/).map(x => parseInt(x))

const mix = (code, times = 1) => {
    mixer = code.map((e, i) => [e, i])
    for (let t = 0; t < times; t++) {
        for (let i = 0; i < mixer.length; i++) {
            const pos = mixer.findIndex(x => x[1] === i)
            const num = mixer[pos][0]
            mixer.splice(pos, 1)
            mixer.splice((pos + num) % mixer.length, 0, [num, i])
        }
    }

    const final = mixer.map(x => x[0])
    const zero = final.findIndex(x => x === 0)
    return final[(zero + 1000) % final.length] +
        final[(zero + 2000) % final.length] +
        final[(zero + 3000) % final.length];
}

console.log('Part 1 : ', mix(data)); // 872
console.log('Part 2 : ', mix(data.map(x => x * 811589153), 10)); // 5382459262696
