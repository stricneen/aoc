
const aoc = require('./aoc');   
const buffer = aoc.readfile('day16.txt');

const text = buffer.split(/\n/);
const input = text.map(x => parseInt(x));

const valid = aoc.readfile('day16a.txt');
const ranges = valid.split(/\n/)
    .map(x => {
        const c = x.split(':');
        const rs = c[1].split(' or ');
        const r1 = rs[0].split('-');
        const r2 = rs[1].split('-');
        return { name: c[0], ranges: [[parseInt(r1[0]), parseInt(r1[1])], [parseInt(r2[0]), parseInt(r2[1])] ] };
});

const isInRange = (n) => (n >= r.ranges[0][0] && n <= r.ranges[0][1]) || (n >= r.ranges[1][0] && n <= r.ranges[1][1]);

let errors = 0;
let validtickets = [];

for (l of text) {
    const nums = l.split(',').map(x => parseInt(x));
    let allvalid = true;
    for (n of nums) {
        let valid = false;
        for(r of ranges) {
            if (isInRange(n)) {
                valid = true;
            } 
        }
        if (valid == false)  errors += n;
    }

    if (allvalid) validtickets.push(l);

}

    
// 48714980
// 2435749
// 2319789
// 115960
// 21980
// zone: 44-451 or 464-955
console.log("Part 1 : ", errors);
console.log(validtickets);


// console.log(input);
    