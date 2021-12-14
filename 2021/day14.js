const aoc = require('./aoc');
const buffer = aoc.readfile('day14.txt');
const text = buffer.split(/\n/);

const trans = text.filter(x => x.indexOf('->') > -1).map(x => x.split(' -> ')).map(x => [x[0], x[1]]);
const start = text.filter(x => x.indexOf('->') === -1)[0];

const score = (curr) => {

    const p = curr.split('').sort();
    const r = p.reduce((a,e) => {
        if(a[e] !== undefined) {
            a[e] = a[e] + 1;
        }
        else {
            a[e] = 1;
        }
        return a;
    }, {});

    
    const scores = Object.keys(r).map(x => r[x]);
    const score = Math.max(...scores) - Math.min(...scores);
    
    console.log(score);
}

const insert = (curr, trans, c) => {
    if (c === 0) return curr;

    score(curr);
//NNCB
    const l = curr.split('');
    const pairs = [];
    //console.log(l)
    for (let i = 0; i < l.length -1; i++) {
        pairs.push(curr.split('').splice(i,2))   
    }

    // NNCB
    // CH -> B
    // HH -> N
    // CB -> H

    const next = pairs.reduce((a,e) => {
        const insert = trans.find(x => x[0] === `${e[0]}${e[1]}`)[1];
        return a + e[0] + insert;
    }, '') + pairs[pairs.length -1 ][1];



    //console.log(next);
    insert(next, trans, c-1);
}

const x = insert(start, trans, 41);

// console.log('Part 1 : ', trans);
// console.log('Part 2 : ', start);
