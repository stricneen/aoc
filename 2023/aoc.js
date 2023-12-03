const fs = require('fs'),
    path = require('path');

// Read file contents
exports.readfile = (fn) => {
    const fp = path.join(__dirname, `./data/${fn}`);
    return fs.readFileSync(fp).toString();
}

exports.objClone = (o) => JSON.parse(JSON.stringify(o))

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
    console.log("\0o33[" + y + ";" + x + "H" + t);
}

// clear screen
exports.cls = () => console.log('\0o33[2J');

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

// Chunks an array into chunkSize
exports.chunk = (array, chunkSize) => {
    const x = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        x.push(chunk)
    }
    return x;
}

// Generator for window over array
exports.window = function*(array, size) {
    let c = 0;
    while(c < array.length - size + 1) {
        yield array.slice(c, c+size);
        c+=1;
    }
}

// Returns all numbers from a string
exports.extractNums = (l) => {
    return t = [...l.matchAll(/[-+]?\d+/g)]
        .map(x => parseInt(x[0]))
}

// Same as above - no negatives
exports.extractStrictNums = (l) => {
    return t = [...l.matchAll(/\d+/g)]
        .map(x => parseInt(x[0]))
}


// Returns all numbers from a string
exports.extractNumericDigits = (l) => {
    return t = [...l.matchAll(/[-+]?\d+/g)]
        .map(x => x[0])
        // .map(x => console.log(typeof(x)))
        // .map(x => x.join())
        // .map(x => parseInt(x))
        // .map(x => x.join())
        // .flat()
}


// ##### INT ARRAY FUNCS

// return all values 'up' from x,y (inc x,y)
exports.ia_left = (x, y, arr) => {
    c = []
    for (let i = y; i >=0 ; i--) {
        c.push(arr[x][i]);
    }
    return c
}

exports.ia_right = (x, y, arr) => {
    c = []
    for (let i = y; i < arr.length ; i++) {
        c.push(arr[x][i]);
    }
    return c
}

exports.ia_up = (x, y, arr) => {
    c = []
    for (let i = x; i >=0 ; i--) {
        c.push(arr[i][y]);
    }
    return c
}

exports.ia_down = (x, y, arr) => {
    c = [];
    for (let i = x; i < arr[0].length ; i++) {
        c.push(arr[i][y]);
    }
    return c;
}