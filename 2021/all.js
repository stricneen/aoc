// const fs = require('fs');
// const path = require('path');

// const fp = path.join(__dirname, ``);
// const dir = fs.readdirSync('.').filter(x => x.startsWith('day'));

// console.log(dir);

// var exec = require('child_process').exec, child;
// child = exec('node day01.js',
//   function (error, stdout, stderr) {
//     console.log(stdout);
// });

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// 4 / 7 

(async () => {
    // require('./day01');
    // require('./day02');
    // require('./day03');
    // require('./day04');
    // require('./day05');
    // require('./day06');
    // require('./day07');
    require('./day08');
    require('./day09');
    require('./day10');
    require('./day11');
    require('./day12');
    await sleep(100000);
  })();

