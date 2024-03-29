var fs = require('fs'),
    path = require('path');
const { exit } = require('process');

exports.readfile = (fn) => {
    const fp = path.join(__dirname, `./data/${fn}`);
    return fs.readFileSync(fp).toString();
}

exports.header = (s) => {
    console.log();
    console.log(s);
    console.log('-'.repeat(s.length));
}

exports.isNumber = (s) => /^\d+$/.test(s);

exports.sum = (l) => l.reduce((a,x) => x+a, 0);

exports.product = (l) => l.reduce((a,x) => x*a, 1);

exports.range = (s,e) => [...Array(Math.abs((e||0)-s)).keys()].map(x => x + (e?s:0));

// aoc.p(10,10,"Text");
exports.p = (x, y, t) => {
    console.log("\033[" + y + ";" + x + "H" + t);
}

exports.cls = () => console.log('\033[2J');

exports.dedup_str = (s) => [...new Set(s.split(''))].join('');

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
    return l.reduce((a,x) => {
        if (fn(x)) {
            a.push([]);
            return a;
        } else {
            a[a.length-1].push(x);
            return a;
        }
    }, [[]]);
}

exports.sort_ints = (a) => a.sort((a, b) => a - b);

exports.denBin = (s) => (s >>> 0).toString(2);

exports.revStr = (s) => s.split('').reverse().join('');

exports.between = (data, s, e) =>   data.split(s)[1].split(e)[0];

