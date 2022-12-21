const aoc = require('./aoc');
const buffer = aoc.readfile('day21.txt');
const data = buffer.split(/\n/)
    .map(x => x.split(': '))
    .map(([x,y]) => {
        t = aoc.extractNums(y)
        return [x, t.length > 0 ? parseInt(t[0]) : y.split(' ')]
    })

// console.log(data)

let p1=0
while (true) {
    for (let i = 0; i < data.length; i++) {
        const monkey = data[i];
        if (Array.isArray(monkey[1])) {
            m1 = data.find(x => x[0] === monkey[1][0])
            m2 = data.find(x => x[0] === monkey[1][2])
            if (Number.isInteger(m1[1]) && Number.isInteger(m2[1])){
                if (monkey[1][1] === '+') monkey[1] = m1[1] + m2[1]
                if (monkey[1][1] === '*') monkey[1] = m1[1] * m2[1]
                if (monkey[1][1] === '-') monkey[1] = m1[1] - m2[1]
                if (monkey[1][1] === '/') monkey[1] = m1[1] / m2[1]
            }
        }
    }

    root = data.find(x => x[0] === 'root')
    if (Number.isInteger(root[1])) {
        p1 = root[1]
        break
    }
}


console.log('Part 1 : ', p1); // 
// console.log('Part 2 : ', mix(data.map(x => x * 811589153), 10)); // 
