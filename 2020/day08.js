const aoc = require('./aoc');
    const buffer = aoc.readfile('day08.txt');
const text = buffer.split(/\n/);

const instr = text.map(x => {
    return {i: x.split(' ')[0], v: parseInt(x.split(' ')[1]) }
});


const exec = (instr) => {
    var acc = 0;
    var ptr = 0;    
    var exec = [];
    while (true) {
        var curr = instr[ptr];
        if (exec.includes(ptr)) {
            return false;
        }
        if (ptr ==  instr.length) {
            return acc;
        }
    
        exec.push(ptr);
    
        if (curr.i == 'nop') {
        }
        if (curr.i == 'acc') {
            acc += curr.v;
        }
        if (curr.i == 'jmp') {
            ptr += curr.v-1;
        }
        ptr ++;    
    }
}


for (var i = 0 ; i < instr.length; i++) {
    const test = instr.map((e,c) => {
        if (c == i && e.i == 'jmp') {
            return {i: 'nop', v: e.v};
        }
        if (c == i && e.i == 'nop') {
            return {i: 'jmp', v: e.v};
        }
        return e;
    });

    var r = exec(test);
    if (r !== false) {
        console.log("Part 2 : ", r);
    }
}