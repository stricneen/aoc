const aoc = require('./aoc');
const buffer = aoc.readfile('day16.txt');
const text = buffer.split(/\n/)[0];

const hextobin = (code) => parseInt(code.toString(), 16).toString(2).padStart(4, '0');
const bintodec = (code) => parseInt(parseInt(code.toString(), 2).toString(10));
const bin = (code) => code.split('').map(x => hextobin(x)).reduce((a, e) => [...a, ...e.split('').map(x => parseInt(x))], []);

const decode = (packet) => {
    const version = bintodec(packet.splice(0, 3).join(''));
    const type = bintodec(packet.splice(0, 3).join(''));

    if (type === 4) {
        let first = packet.splice(0, 5);
        let c = [first.slice(1)];
        while (first[0] !== 0) {
            first = packet.splice(0, 5);
            c.push(first.slice(1))
        }
        const val = bintodec(c.flat().join(''));
        return { v: version, t: type, val };
    }

    const id = packet.splice(0, 1)[0];

    if (id === 0) {
        const num = packet.splice(0, 15).join('');
        const len = bintodec(num);
        const sub = packet.splice(0, len);
        const s = [];
        while (sub.length > 0) {
            s.push(decode(sub));
        }
        return { v: version, t: type, val: s };
    }

    if (id === 1) {
        const num = packet.splice(0, 11).join('');
        const len = bintodec(num);
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

const calc = (struct) => {
    if (struct.t === 4) return struct.val;
    const subs = struct.val.map(x => calc(x));
    if (struct.t === 0) return aoc.sum(subs); // sum
    if (struct.t === 1) return aoc.product(subs); // product

    if (struct.t === 2) return Math.min(...subs); // min
    if (struct.t === 3) return Math.max(...subs); // max

    if (struct.t === 5) return subs[0] > subs[1] ? 1 : 0; // gt
    if (struct.t === 6) return subs[0] < subs[1] ? 1 : 0; // lt
    if (struct.t === 7) return subs[0] === subs[1] ? 1 : 0; // eq
}


const structure = decode(bin(text));
const p1 = sumVersions(structure);
console.log('Part 1 : ', p1);

const p2 = calc(structure);
console.log('Part 2 : ', p2);

// console.assert(3 === calc(decode(bin('C200B40A82'))));
// console.assert(54 === calc(decode(bin('04005AC33890'))));
// console.assert(7 === calc(decode(bin('880086C3E88112'))));
// console.assert(9 === calc(decode(bin('CE00C43D881120'))));
// console.assert(1 === calc(decode(bin('D8005AC2A8F0'))));
// console.assert(0 === calc(decode(bin('F600BC2D8F'))));
// console.assert(0 === calc(decode(bin('9C005AC2F8F0'))));
// console.assert(1 === calc(decode(bin('9C0141080250320F1802104A08'))));

// console.assert(16 === sumVersions(decode(bin('8A004A801A8002F478'))));
// console.assert(12 === sumVersions(decode(bin('620080001611562C8802118E34'))));
// console.assert(23 === sumVersions(decode(bin('C0015000016115A2E0802F182340'))));
// console.assert(31 === sumVersions(decode(bin('A0016C880162017C3686B18A3D4780'))));
