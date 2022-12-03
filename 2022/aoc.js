const fs = require('fs'),
    path = require('path');
const { exit } = require('process');

// Read file contents
exports.readfile = (fn) => {
    const fp = path.join(__dirname, `./data/${fn}`);
    return fs.readFileSync(fp).toString();
}

// Write header
exports.header = (s) => {
    console.log();
    console.log(s);
    console.log('-'.repeat(s.length));
}

// Check if input is a number
exports.isNumber = (s) => /^\d+$/.test(s);

// Sum a list
exports.sum = (l) => l.reduce((a, x) => x + a, 0);

// Product of list
exports.product = (l) => l.reduce((a, x) => x * a, 1);

// Create array range
exports.range = (s, e) => [...Array(Math.abs((e || 0) - s)).keys()].map(x => x + (e ? s : 0));

// aoc.p(10,10,"Text");
exports.p = (x, y, t) => {
    console.log("\033[" + y + ";" + x + "H" + t);
}

// clear screen
exports.cls = () => console.log('\033[2J');

// Distinct string
exports.dedup_str = (s) => [...new Set(s.split(''))].join('');

// Distinct list
exports.dedup = (a) => [...new Set(a)];

exports.dedupObj = (a) => {
    const x = a.map(x => JSON.stringify(x));
    const y = [...new Set(x)];
    return y.map(x => JSON.parse(x));
}

// Print JSON
exports.pj = (m) => console.dir(m, { depth: null, colors: true }, 2); console.log('');

exports.group = (l, f) => {
    const def = x => x.length == 0;
    const fn = f || def;
    return l.reduce((a, x) => {
        if (fn(x)) {
            a.push([]);
            return a;
        } else {
            a[a.length - 1].push(x);
            return a;
        }
    }, [[]]);
}

// Sort array of numbers
exports.sort_ints = (a) => a.sort((a, b) => a - b);

// Denary to binary
exports.denBin = (s) => (s >>> 0).toString(2);

// Reverse string
exports.revStr = (s) => s.split('').reverse().join('');


exports.between = (data, s, e) => data.split(s)[1].split(e)[0];

// Intersect on array or string
exports.intersect = (a, b) => {
    const x = (typeof a === 'string') ? a.split('') : a;
    const y = (typeof b === 'string') ? b.split('') : b;
    return x.filter(v => y.includes(v))
}

exports.chunk = (array, chunkSize) => {
    const x = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        x.push(chunk)
    }
    return x;
}