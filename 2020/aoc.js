var fs = require('fs'),
    path = require('path');

exports.readfile = (fn) => {
    const fp = path.join(__dirname, `./data/${fn}`);
    return fs.readFileSync(fp).toString();
}

exports.isNumber = (s) => /^\d+$/.test(s);

exports.sum = (l) => l.reduce((a,x) => x+a, 0);

exports.product = (l) => l.reduce((a,x) => x*a, 1);

exports.range = (s,e) => [...Array(Math.abs((e||0)-s)).keys()].map(x => x + (e?s:0));

// aoc.p(10,10,"Text");
exports.p = (x, y, t) => {
    console.log("\033[" + y + ";" + x + "H" + t);
}