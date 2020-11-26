var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, './data/day01.txt');

var buffer = fs.readFileSync(filePath).toString();

var text = buffer.split(/\n/);
// var input = text.map(x => parseInt(x));





console.log(text);
    