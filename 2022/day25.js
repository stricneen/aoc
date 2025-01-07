const { assert } = require('console');
const aoc = require('./aoc');
const [buffer, test] = aoc.readfilePro(25);
// const buffer = aoc.readfile('day.txt');
const data = buffer.split(/\n/)

const tests = [
    ['1', '1'],
    ['2', '2'],
    ['3', '1='],
    ['4', '1-'],
    ['5', '10'],
    ['6', '11'],
    ['7', '12'],
    ['8', '2='],
    ['9', '2-'],
    ['10', '20'],
    ['15', '1=0'],
    ['20', '1-0'],
    ['2022', '1=11-2'],
    ['12345', '1-0---0'],
    ['314159265', '1121-1110-1=0'],
]

const example = [
    ['1=-0-2', '1747'],
    ['12111', '906'],
    ['2=0=', '198'],
    ['21', '11'],
    ['2=01', '201'],
    ['111', '31'],
    ['20012', '1257'],
    ['112', '32'],
    ['1=-1=', '353'],
    ['1-12', '107'],
    ['12', '7'],
    ['1=', '3'],
    ['122', '37'],
]

const snafu = (num) => {
    let r = []
    const digits = num.toString(5).toString().split('').reverse().map(Number);
    let carry = 0;
    for (const digit of digits) {
        const d = digit + carry;
        if (d < 3) {
            r.push(d);
            carry = 0;
        }
        if (d === 3) {
            r.push('=');
            carry = 1;
        }
        if (d === 4) {
            r.push('-');
            carry = 1;
        }
        if (d === 5) {
            r.push('0');
            carry = 1;
        }
    }
    r.reverse();
    if (carry === 1) {
        if (!Number.isInteger(r[0])) r.unshift(1);
        else if (r[0] === 1) r[0] = '2';
    }

    return `${r.join('')}`;
}

const decimal = (snafu) => {
    return digits = snafu.split('').reverse().reduce((acc, digit, i) => {
        const num = digit === '=' ? -2 : digit === '-' ? -1 : parseInt(digit);
        return acc + num * Math.pow(5, i);
    }, 0);
}

const runtest = () => {
    for (const [dec, snafu] of tests) {
        const convSnafu = decimal(snafu);
        assert(convSnafu === parseInt(dec), `Expected ${dec} but got ${convSnafu}`);
    }
    for (const [snafu, dec] of example) {
        const convSnafu = decimal(snafu);
        assert(convSnafu === parseInt(dec), `Expected ${dec} but got ${convSnafu}`);
    }
    for (const [dec, snaf] of tests) {
        const convDec = snafu(parseInt(dec));
        assert(convDec === snaf, `Expected ${snaf} from ${dec} but got ${convDec}`);
    }
    for (const [snaf, dec] of example) {
        const convDec = snafu(parseInt(dec));
        assert(convDec === snaf, `Expected ${snaf} from ${dec} but got ${convDec}`);
    }
}

runtest()

const decs = data.map(decimal)
const p1 = snafu(aoc.sum(decs))

console.log('Part 1 : ', p1); // 343
