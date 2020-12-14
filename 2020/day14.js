const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const aoc = require('./aoc');
    
const buffer = aoc.readfile('day14.txt');

const text = buffer.split(/\n/);
console.log(text);
// mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
// mem[8] = 11
// mem[7] = 101
// mem[8] = 0

const getNum = (mask, dec) => {
    
    const binary = (dec >>> 0).toString(2).split("").reverse().join("");
    const mr = mask.split('').reverse().join('');
    console.log(dec, '>', binary );

    let r = 0;
    let v = 1;

    for(var i = 0; i<mask.length ;i++) {
        
        const mx = mr[i];
        // console.log(mx);

        let val = binary[i];

        if (mx == '0') continue;
        if (mx == '1') { r += Math.pow(2,i); continue; }
        if (mx == 'X' && val == '1') r += Math.pow(2,i);
        
        
    } 
    
    console.log('r-',r);

    return r;

}

let mask = '';
let mem = {};
for(let x in text) {
    // console.log(text[x]);

    if (text[x][1] == 'a') {
        mask = text[x].substring(7);
        continue;
    } else {
        const reg = text[x].split('[');
        console.log(reg);
        const reg2 = parseInt(reg[1].split(']')[0]);


        const binary = parseInt(text[x].split('= ')[1]);
        console.log(binary);



        const val = getNum(mask, binary);
        mem[reg2] = val;

    }


}
console.log(mem);

var e = 0;

console.log(aoc.sum(Object.values(mem)));





    