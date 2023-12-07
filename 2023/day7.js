const aoc = require('./aoc');
const buffer = aoc.readfile('day7.txt');
const textraw = buffer.split(/\n/);


// 251003962 h

const hands = textraw.map(x => ({ hand: x.split(' ')[0], bid: parseInt(x.split(' ')[1])}))

// 7 Five of a kind, where all five cards have the same label: AAAAA
// 6 Four of a kind, where four cards have the same label and one card has a different label: AA8AA
// 5 Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
// 4 Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
// 3 Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
// 2 One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
// 1 High card, where all cards' labels are distinct: 23456

const strength = (hand) => {

    const cards = hand.split('').sort((a,b) => { return b.localeCompare(a)});
    // console.log(cards);

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

    // console.log(s)
    if (s.length === 1) return 7;
    if (s[0] === 1 & s[1] === 4) return 6;
    if (s[0] === 2 & s[1] === 3) return 5;
    if (s[0] === 1 & s[1] === 1 && s[2] === 3) return 4;
    if (s[0] === 1 & s[1] === 2 && s[2] === 2) return 3;
    if (s.length ===4 ) return 2;
    return 1;
}

const firstRule = (hand1, hand2) => {
    console.log(hand1, strength(hand1), hand2, strength(hand2))
    if (strength(hand1) > strength(hand2)) return 1;
    if (strength(hand2) > strength(hand1)) return -1;
    return 0;
}

const secondRule = (hand1, hand2) => {
    const cards = '23456789TJQKA'.split('');
    const h1 = hand1.split('');
    const h2 = hand2.split('');

    for (let i = 0; i < h1.length; i++) {
        if (cards.indexOf(h1[i]) > cards.indexOf(h2[i])) return 1;
        if (cards.indexOf(h2[i]) > cards.indexOf(h1[i])) return -1;
    }
    return 0;
}

const sorter = (a,b) => {
    const s = firstRule(a,b);
    console.log(a,b,s)
    if (s !== 0) return s;
    // console.log('never')
    return secondRule(a,b)

}


// console.log(hands.map(h => ({...h, str: strength(h.hand)})))



const order = hands.map(h => ({...h, strength: strength(h.hand)}))
order.sort((a,b) => { return sorter(a.hand, b.hand)})
console.log(order)

const p1a = order.reduce((a,e,i)=> {

    return a + ((i+1) * e.bid);
    
}, 0);


// const ords = hands.map(h => h.hand);
// ords.sort(sorter)
// console.log(ords.map(x => strength(x)))



// console.log(hands,cards)
// console.log(order)








console.log('Part 1:', p1a)
console.log('Part 1:', 0)