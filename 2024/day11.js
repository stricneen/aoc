
const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(11);
const text = buffer.split(' ').map(Number);

p1 = p2 = 0

const splitNum = (num) => {
     return [parseInt(num.toString().substring(0, num.toString().length / 2)),
     parseInt(num.toString().substring(num.toString().length / 2))]
}

const memo = new Map()
const expand = (a, l) => {

     if (memo.has(`${a.toString()}.${l}`)) {
          return memo.get(`${a.toString()}.${l}`)
     }

     if (l === 0) { return 1 }

     let n = 0
     if (a === 0) {
          n = expand(1, l - 1)
     }
     else if (a.toString().length % 2 === 0) {
          const [x, y] = splitNum(a)
          n = expand(x, l - 1) + expand(y, l - 1)
     }
     else {
          n = expand(a * 2024, l - 1)
     }

     memo.set(`${a.toString()}.${l}`, n)
     return n
}

for (let i = 0; i < text.length; i++) {
     p1 += expand(text[i], 25)
     p2 += expand(text[i], 75)
}


assert(p1 === 199982, 'p1')
assert(p2 === 237149922829154, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);
