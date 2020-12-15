const aoc = require('./aoc');
const assert = require('assert');

const buffer = aoc.readfile('day14.txt');
const text = buffer.split(/\n/);


const getAddress = (mask, dec) => {
    const binary = aoc.revStr(aoc.denBin(dec));
    const mr = aoc.revStr(mask);
    return mr.split('')
        .reduce((a,e,i) => {
            switch (e) {
                case '0': return a;
                case '1': return a + Math.pow(2,i);
                case 'X': return binary[i] == '1' ? a + Math.pow(2,i) : a;
            }
        }, 0);
}

const getAddresses = (mask, dec, reg) => {
    
    const binreg =  aoc.revStr(aoc.denBin(reg));
    const mr = aoc.revStr(mask);

    let v2mask = '';
    for(var i = 0; i<mask.length ;i++) {
        const mx = mr[i];
        if (mx == 'X') { v2mask += 'X'}
        if (mx == '0') { v2mask += binreg[i] || 0 }
        if (mx == '1') { v2mask += '1'}
    } 
        
    const mx = aoc.revStr(v2mask);
    const floaters = mx.split('').filter(x => x == 'X').length;

    let addresses = [];
    for(var i=0;i<Math.pow(2,floaters);i++) {
        let c2 = aoc.denBin(i);
        let c = c2.padStart(floaters, '0')
        // console.log(c);
        let tmx = mx;
        for (var j=0; j < floaters; j++) {
            tmx = tmx.replace('X', c[j] || 0);
        } 
        
        addresses.push(parseInt(tmx, 2));
    }
    
    return addresses;

}



let mask = '';
let mem = {};
let mem2 = {};
for(const instr of text) {

    if (instr[1] == 'a') {
        mask = instr.substring(7);
        continue;
    } else {
        const reg = parseInt(aoc.between(instr, '[',']'));
        const binary = parseInt(instr.split('= ')[1]);

        mem[reg] = getAddress(mask, binary);;

        for(const address of getAddresses(mask, binary, reg)) {
            mem2[address] = binary;
        }
    }
}

// console.log(mem2);
assert.strictEqual(aoc.sum(Object.values(mem)), 13476250121721);
assert.strictEqual(aoc.sum(Object.values(mem2)), 4463708436768);

console.log("Part 1 : ", aoc.sum(Object.values(mem)));
console.log("Part 2 : ", aoc.sum(Object.values(mem2)));




    