
const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const text = buffer.split(/\n/);

const cmds = text.map(x => x.split(' ')).map(([x,y])=> [x,parseInt(y)] )
cmds.push(...Array(100).fill(['noop']))
reg = 1
c = []

// console.log(cmds)

let queue = []

check = [20,60,100,140,180,220]
// rn = []

cycle = 1
while(true) {

    if (cycle > 22) break;

    cmd = cmds[cycle-1]
    console.log(cycle, cmd)

// 21,19,18,21,16
 


    queue = queue.map(([x,y]) => [x, y -1])
    exec = queue.find(([x,y]) => y === 0)
    queue = queue.filter(([x,y]) => y > 0)


    if (cmd[0] === 'noop') {
    }
    if(cmd[0] === 'addx') {
        queue.push([cmd[1], 1])
    }
    // console.log(queue)

    // console.log(cycle, reg)

    if (exec )  {
        reg += exec[0]
        console.log(cycle,'>',reg )
    }

    if (check.includes(cycle)) {
        console.log('-------------->',reg)
    }

    cycle ++

// console.log()
    
}

// console.log(reg)

// console.log(reg[19])
// console.log(reg[20])
// console.log(reg[21])

// noop
// noop
// addx 3
// noop
// addx -21
// addx 28
// addx 1









p1=p2=0
console.log("Part 1 : ", (p1)) // 
console.log("Part 2 : ", (p2)) // 


// 2 addx 15
// 3 addx -11
// 4 addx 6
// 5 addx -3
// 6 addx 5
// 7 addx -1
// 8 addx -8
// 9 addx 13
// 10 addx 4
// noop
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx 5