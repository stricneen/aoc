const aoc = require('./aoc');
const buffer = aoc.readfile('day14.txt');
const text = buffer.split(/\n/);

const trans = text.filter(x => x.indexOf('->') > -1).map(x => x.split(' -> ')).map(x => [x[0], x[1]]);
const start = text.filter(x => x.indexOf('->') === -1)[0];

const inckey = (obj, key, by = 1) => {
    if (obj[key]) {obj[key] = obj[key] + by}
    else (obj[key] = by)
}

const score = (pairs) => {
    const count = {};   
    const keys = Object.keys(pairs);
    keys.forEach(key => {
        inckey(count, key.split('')[0], pairs[key]);
    });
    inckey(count, start.split('').slice(-1)[0]);
    return count;
}

const tick = (pairs, depth) => {
     if (depth === 0) return score(pairs);
    const next = {};
    Object.keys(pairs).forEach(key => {
        const p = key.split('');
        const ins = trans.find(x => x[0] === key)[1];
        inckey(next, `${p[0]}${ins}`, pairs[key]);
        inckey(next, `${ins}${p[1]}`, pairs[key]);
    });
    return tick(next, depth - 1);
}

const pairs = {};
for (let i = 0; i < start.length -1; i++) {
    inckey(pairs, `${start.split('')[i]}${start.split('')[i+1]}`)
}

const score1 = tick(pairs, 10);
const s1 = Object.keys(score1).map(x => score1[x]);
const p1 = Math.max(...s1) - Math.min(...s1);
console.log('Part 1 : ', p1);


const score2 = tick(pairs, 40);
const s2 = Object.keys(score2).map(x => score2[x]);
const p2 = Math.max(...s2) - Math.min(...s2);
console.log('Part 2 : ', p2);
