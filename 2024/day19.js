
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(19);
const text = buffer.split(/\n/);
const towels = text[0].split(', ');
const patterns = text.slice(2)

p1 = p2 = 0

const part1 = (towels, pattern) => {
    const queue = [pattern]
    while (queue.length) {
        const p = queue.shift()
        for (const towel of towels) {
            if (p === towel) {
                return 1;
            }

            if (p.startsWith(towel)) {
                queue.push(p.slice(towel.length))
            }
        }
        queue.sort((a, b) => a.length - b.length)
    }
    return 0;
}


const memo = new Map()
const part2 = (pattern) => {

    if (memo.has(`${pattern}`)) {
        return memo.get(`${pattern}`)
   }

   
   if (pattern === '') {
       return 1
    }
    
    let count = 0
    for (const towel of towels) {
        if (pattern.startsWith(towel)) {
            count += part2(pattern.slice(towel.length))
            memo.set(`${pattern}`, count)
        }
    }
    return count
}




for (const pattern of patterns) {
    const r = part2(pattern)
    p1 += r > 0 ? 1 : 0
    p2 += r
}

assert(p1 === 238, 'p1')
assert(p2 === 635018909726691, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
