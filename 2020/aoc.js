var fs = require('fs'),
    path = require('path');

exports.readfile = (fn) => {
    const fp = path.join(__dirname, `./data/${fn}`);
    return fs.readFileSync(fp).toString();
};

exports.sum = (l) => l.reduce((x,a) => x+a, 0);