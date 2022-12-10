const aoc = require('./aoc');
const buffer = aoc.readfile('day10.txt');
const text = buffer.split(/\n/);

const cmds = text.map(x => x.split(' ')).map(([x, y]) => [x, parseInt(y)])

p1 = 0
reg = 1
crt = []

check = [20, 60, 100, 140, 180, 220]

cycle = 1
ptr = 0
curr = null
while (ptr < cmds.length) {

    const pixel = [reg - 1, reg, reg + 1].includes((cycle - 1) % 40) ? '\u2588' : ' '
    crt.push(pixel)

    cmd = cmds[ptr]
    if (curr === null) {
        if (cmd[0] === 'noop') ptr++
        if (cmd[0] === 'addx') curr = cmd[1]
    } else {
        ptr++
        reg += curr
        curr = null
    }

    if (check.includes(cycle)) {
        p1 += (reg * cycle)
    }

    cycle++
}

console.log("Part 1 : ", (p1)) // 15120
console.log("Part 2 : ", ('RKPJBPLA')) // RKPJBPLA

// draw screen
for (let i = 0; i < 6; i++) {
    console.log(crt.join('').slice(i * 40, (i * 40) + 40))
}
