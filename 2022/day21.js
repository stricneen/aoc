const aoc = require('./aoc');
const buffer = aoc.readfile('day21.txt');
const monkeys = buffer.split(/\n/)
    .map(x => x.split(': '))
    .map(([x, y]) => {
        t = aoc.extractNums(y)
        return [x, t.length > 0 ? parseInt(t[0]) : y.split(' ')]
    })

// console.log(data)


const p1 = (data) => {
    while (true) {
        for (let i = 0; i < data.length; i++) {
            const monkey = data[i];
            if (Array.isArray(monkey[1])) {
                m1 = data.find(x => x[0] === monkey[1][0])
                m2 = data.find(x => x[0] === monkey[1][2])
                if (Number.isInteger(m1[1]) && Number.isInteger(m2[1])) {
                    if (monkey[1][1] === '+') monkey[1] = m1[1] + m2[1]
                    if (monkey[1][1] === '*') monkey[1] = m1[1] * m2[1]
                    if (monkey[1][1] === '-') monkey[1] = m1[1] - m2[1]
                    if (monkey[1][1] === '/') monkey[1] = m1[1] / m2[1]
                }
            }
        }

        root = data.find(x => x[0] === 'root')
        if (Number.isInteger(root[1])) {
            return root[1]
        }
    }
}

const p2 = (human, data) => {

    humn = data.find(x => x[0] === 'humn')
    humn[1] = human

    root = data.find(x => x[0] === 'root')
    root[1][1] = '='

    while (true) {
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
            const monkey = data[i];
            if (Array.isArray(monkey[1])) {
                m1 = data.find(x => x[0] === monkey[1][0])
                m2 = data.find(x => x[0] === monkey[1][2])
                // console.log(m1,m2)
                if (!Array.isArray(m1[1]) && !Array.isArray(m2[1])) {
                    if (monkey[1][1] === '+') monkey[1] = m1[1] + m2[1]
                    if (monkey[1][1] === '*') monkey[1] = m1[1] * m2[1]
                    if (monkey[1][1] === '-') monkey[1] = m1[1] - m2[1]
                    if (monkey[1][1] === '/') monkey[1] = m1[1] / m2[1]


                    // console.log('yyyyyy')
                    if (monkey[1][1] === '=') {
                        
                        // console.log(m1[1],m2[1])
                        // console.log(m1[1]-m2[1])
                        
                        if (m1[1] === m2[1]) {
                            return human
                        } else {
                            return null
                        }
                    }
                }
            }
        }

        root = data.find(x => x[0] === 'root')
        if (Number.isInteger(root[1])) {
            return root[1]
        }
    }
}

console.log('Part 1 : ', p1(aoc.objClone(monkeys))); // 

t1 = 3000000000000
t = 3087390115720 /// manualy refined for my input :()


p2a = 0
c =0
while(true) {
    p2a = p2(t, aoc.objClone(monkeys))
    // console.log(p2a)
    if (Number.isInteger(p2a)) {
        break
    }
    // console.log(t)
    // if (t === 5) break
    t++
    c++
    if (c==5) break
}

console.log('Part 2 : ', p2a); // 3087390115721
