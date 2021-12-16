const aoc = require('./aoc');
const buffer = aoc.readfile('day16.txt');
const text = buffer.split(/\n/)[0];


const hextobin = (code) => {
    return parseInt(code.toString(), 16).toString(2).padStart(4, '0');
}

const bintodec = (code) => {
    return parseInt(code.toString(), 2).toString(10);
}

const bin = (code) => {
    return code.split('').map(x => hextobin(x)).reduce((a, e) => [...a, ...e.split('').map(x => parseInt(x))], []);
}

const decode = (packet, cmds = []) => {

    if (packet.length === 0) return cmds;
    const version = parseInt(bintodec(packet.splice(0, 3).join('')));
    const type = parseInt(bintodec(packet.splice(0, 3).join('')));

    if (type === 4) { // literal
        let first = packet.splice(0, 5);
        let c = [first.slice(1)];
        while (first[0] !== 0) {
            first = packet.splice(0, 5);
            c.push(first.slice(1))
        }
        const val = parseInt(bintodec(c.flat().join('')))
        return { v: version, t: type, val };
    }

    const id = packet.splice(0, 1)[0];
    
    if (id === 0) {
        const num = packet.splice(0, 15).join('');
        const len = parseInt(bintodec(num));
        const sub = packet.splice(0, len);
        const s = [];
        while(sub.length > 0) {
            s.push(decode(sub));
        }
        return { v: version, t: type, val:s };
    }

    if (id === 1) {
        const num = packet.splice(0, 11).join('');
        const len = parseInt(bintodec(num));
        const sub = [];
        for (let i = 0; i < len; i++) {
            sub.push(decode(packet));
        }
        return { v: version, t: type, val: sub };
    }
}



const sumVersions = (ops) => {
    if (Array.isArray(ops.val)) {
        return ops.v + aoc.sum(ops.val.map(sumVersions))
    } else if (Number.isInteger(ops.val)) {
        return ops.v;
    } else {
        return ops.v + sumVersions(ops.val);
    }
}



// console.log('sum (16)', sumVersions('8A004A801A8002F478'));
// console.log('sum (12)', sumVersions('620080001611562C8802118E34'));
// console.log('sum (23)', sumVersions('C0015000016115A2E0802F182340'));
// console.log('sum (31)', sumVersions('A0016C880162017C3686B18A3D4780'));

const structure = decode(bin(text));
const p1 = sumVersions(structure);
console.log('Part 1 : ', p1);
