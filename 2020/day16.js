
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
        return { position: [], name: c[0], ranges: [[parseInt(r1[0]), parseInt(r1[1])], [parseInt(r2[0]), parseInt(r2[1])] ] };
});

const isInRange = (n,r) => (n >= r.ranges[0][0] && n <= r.ranges[0][1]) || (n >= r.ranges[1][0] && n <= r.ranges[1][1]);

let errors = 0;
let validtickets = [];

for (l of text) {
    const nums = l.split(',').map(x => parseInt(x));
    let allValid = true;
    for (n of nums) {
        let valid = false;
        for(r of ranges) {
            if (isInRange(n,r)) {
                valid = true;
            } 
        }
        if (valid == false)  {
            errors += n;
            allValid = false;
        }
    }
    if (allValid) validtickets.push(l);
}


const myTicket = '151,103,173,199,211,107,167,59,113,179,53,197,83,163,101,149,109,79,181,73'.split(',').map(x => parseInt(x));
//validtickets.push(myTicket);


for (let position = 0; position < validtickets[0].split(',').length; position++) {
    // console.log(position);
    let pos = [];
    for (l of validtickets) {
        // get num x of ticket
        pos.push(parseInt(l.split(',')[position]));
    }

    for(range of ranges) {
        const av = pos.map(p => isInRange(p,range));
        if (av.every(x => x == true)) {
            // console.log(range.name);
            range.position.push(position);       
        }
    }    
}


while(true) {

    const fixed = [];

    for (range of ranges) {
        if (range.position.length == 1 && !fixed.includes(range.position[0])) {
            fixed.push(range.position[0]);
        }
    }

    for(range of ranges) {
        if (range.position.length > 1) {
         
            for (f of fixed) {
                const index = range.position.indexOf(f);
                if (index > -1) {
                    range.position.splice(index, 1);
                }
            }

        }
    }

    if (ranges.every(r => r.position.length == 1)) {
        break;
    }


    // console.log(ranges);
}

const depts = []
ranges.forEach(x => { if (x.name.startsWith("departure")) {
    
    depts.push(myTicket[x.position]);


}});

console.log("Part 1 : ", errors);
console.log("Part 2 : ", aoc.product(depts));

// console.log(input);
    