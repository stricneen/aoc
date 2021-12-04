const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, ``);
const dir = fs.readdirSync('.').filter(x => x.startsWith('day'));

console.log(dir);

