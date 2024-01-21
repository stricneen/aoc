const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfile('day7.txt');
const textraw = buffer.split(/\n/);
const hands = textraw.map(x => ({ hand: x.split(' ')[0], bid: parseInt(x.split(' ')[1])}))

const strength = (hand) => {
    const cards = hand.split('').sort((a,b) => { return b.localeCompare(a)});
    const s = [1];
    for (let i = 0; i < cards.length -1; i++) {
        if (cards[i] === cards[i+1]) {
            s[s.length - 1] = s[s.length - 1] + 1
        }
        else {
            s.push(1)
        }
    }
    s.sort((a,b) => a-b);

    if (s.length ===1) return 7;
    if (s[0] === 1 & s[1] === 4) return 6;
    if (s[0] === 2 & s[1] === 3) return 5;
    if (s[0] === 1 & s[1] === 1 && s[2] === 3) return 4;
    if (s[0] === 1 & s[1] === 2 && s[2] === 2) return 3;
    if (s.length ===4 ) return 2;
    return 1;
}

const strengthJoker = (hand) => {
    const cards = '23456789TQKA'.split('');
    const scores = cards.map(c => hand.replaceAll('J', c)).map(strength);
    return Math.max(...scores)
}

const firstRule = (hand1, hand2, f) => {
    if (f(hand1) > f(hand2)) return 1;
    if (f(hand2) > f(hand1)) return -1;
    return 0;
}

const secondRule = (hand1, hand2, c) => {
    const cards = c.split('');
    const h1 = hand1.split('');
    const h2 = hand2.split('');
    for (let i = 0; i < h1.length; i++) {
        if (cards.indexOf(h1[i]) > cards.indexOf(h2[i])) return 1;
        if (cards.indexOf(h2[i]) > cards.indexOf(h1[i])) return -1;
    }
    return 0;
}

const sorter = (a,b,f,o) => {
    const s = firstRule(a,b,f);
    if (s !== 0) return s;
    return secondRule(a,b,o)
}

const p1a = hands.sort((a,b) => { return sorter(a.hand, b.hand, strength, '23456789TJQKA') })
    .reduce((a,e,i)=> a + ((i+1) * e.bid), 0);

const p2a = hands.sort((a,b) => { return sorter(a.hand, b.hand, strengthJoker, 'J23456789TQKA')})
    .reduce((a,e,i)=> a + ((i+1) * e.bid), 0);


assert(p1a === 250058342)
assert(p2a === 250506580)

console.log('Part 1:', p1a) // 250058342
console.log('Part 2:', p2a) // 250506580