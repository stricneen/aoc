const aoc = require('./aoc');
const buffer = aoc.readfile('day24.txt');
const text = buffer.split(/\n/);
const ops = text.map(x => {
    return x.split(' ');
});

//console.log(ops)


const valid = number => {
    let reg = { w: 0, x: 0, y: 0, z: 0 };
    let inp = 0;
    let s = number.toString();
    for (const op of ops) {

        const op2 = !Number.isNaN(parseInt(op[2])) ? parseInt(op[2]) : reg[op[2]]

        if (op[0] === 'inp') {
            reg[op[1]] = parseInt(s[inp]);
            inp++;
        }

        if (op[0] === 'add') {
            reg[op[1]] = reg[op[1]] + op2;
        }
        if (op[0] === 'mul') {
            reg[op[1]] = reg[op[1]] * op2;
        }
        if (op[0] === 'div') {
            reg[op[1]] = Math.floor(reg[op[1]] / op2)
        }
        if (op[0] === 'mod') {
            reg[op[1]] = reg[op[1]] % op2
        }
        if (op[0] === 'eql') {
            reg[op[1]] === op2 ? 1 : 0;
        }
    }
    // aoc.pj(reg)
    return reg.z === 0;
}

function* check() {
  //let c = 11111111111111;
    let c = 99999999999999;
    
    while (c > 0) {
        if (c.toString().indexOf('0') === -1)
            yield c;
        c--;
    }
}

// valid('13579246899999')

for (const num of check()) {
    // console.log(num)
    if (valid(num)) {        
        console.log('VALID : ' + num);
    }
}
