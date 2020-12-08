const aoc = require('./aoc');
const buffer = aoc.readfile('day08.txt');
const text = buffer.split(/\n/);
aoc.header('Day 8: Handheld Halting');
const instr = text.map(x => {
    return {op: x.split(' ')[0], arg: parseInt(x.split(' ')[1]) }
});

const exec = (instr) => {
    var acc = 0;
    var ptr = 0;    
    var exec = [];
    while (true) {
        var curr = instr[ptr];
        if (exec.includes(ptr)) {
            return {acc: acc, err: true};
        }
        if (ptr >=  instr.length) {
            return {acc: acc, err: false};
        }
        exec.push(ptr);
        if (curr.op == 'nop') {
        }
        if (curr.op == 'acc') {
            acc += curr.arg;
        }
        if (curr.op == 'jmp') {
            ptr += curr.arg-1;
        }
        ptr ++;    
    }
}

const r1 = exec(instr, true);
console.log("Part 1 : ", r1.acc);

for (var i = 0 ; i < instr.length; i++) {

    const test = instr.map((e,c) => {
        if (c == i && e.op == 'jmp') {
            return {op: 'nop', arg: e.arg};
        }
        if (c == i && e.op == 'nop') {
            return {op: 'jmp', arg: e.arg};
        }
        return e;
    });

    const r2 = exec(test, false);
    if (r2.err == false) {
        console.log("Part 2 : ", r2.acc);
    }
}