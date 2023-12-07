const { match } = require('assert');
const aoc = require('../aoc');
const buffer = aoc.readfile('day4.txt');
const textraw = buffer.split(/\n/);


const cards = new Map();
textraw.forEach(l => {
    const c = l.split(': ');
    // console.log(l)
    const win = c[1].split(' | ')[0].split(' ').map(x => parseInt(x)).filter(x => !isNaN(x));
    const nums = c[1].split(' | ')[1].split(' ').map(x => parseInt(x)).filter(x => !isNaN(x));;
    cards.set(c[0].split(' ')[c[0].split(' ').length -1], [win, nums])
})

const matches = (card) => {
    return card[1].reduce((a,e) => {
        return a + (card[0].includes(e) ? 1 : 0);
    }, 0);
}

const winners = (card) => {
    s = 0
    for (let i = 0; i < matches(card); i++) {
         s = s==0 ? 1 : s*2
    }
    return s;
}


const p1 = aoc.sum([...cards.values()].map(winners));

const cardcount = [...cards.keys()].reduce((a,e) => {
    a[e] = 1;
    return a;
}, {})

for (let i = 0; i < Object.keys(cardcount).length; i++) {
    const current = Object.keys(cardcount)[i];
    const icurrent = parseInt(current);
    const m = matches(cards.get(current))

    for (let i = icurrent + 1; i <= icurrent + m; i++){
        cardcount[i.toString()] = cardcount[i.toString()] + cardcount[icurrent.toString()]
    }
}

const p2 = Object.keys(cardcount).reduce((a,e) => {
    return a + cardcount[e]
},0)

console.log('Part 1: ', p1);
console.log('Part 2: ', p2);

