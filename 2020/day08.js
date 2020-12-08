const aoc = require('./aoc');
    
const buffer = aoc.readfile('day.txt');

const text = buffer.split(/\n/);

const instr = text.map(x => {
    return {i: x.split(' ')[0], v: parseInt(x.split(' ')[1]) }
});

var acc = 0;
var ptr = 0;

var exec = [];

while (true) {
    var curr = instr[ptr];

    if (exec.includes(ptr)) {
        break;
    }

    exec.push(ptr);

    console.log(curr);
    if (curr.i == 'nop') {
    }
    if (curr.i == 'acc') {
        acc += curr.v;
    }
    if (curr.i == 'jmp') {
        ptr += curr.v-1;
    }
    
    ptr ++;
console.log(acc, ptr);

}


console.log(acc);
    