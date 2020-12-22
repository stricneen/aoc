const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const text = buffer.split(/\n/);

const hands = text.reduce((a,e) => {
    if (e.length == 0) return a;
    if (e.startsWith('Player')) {
        a.push([]);
    } else {
        a[a.length-1].push(parseInt(e));
    }
    return a;
}, []);

const play = (hand1, hand2) => {

    if (hand1.length == 0) return hand2;
    if (hand2.length == 0) return hand1;

    const [h1, ...t1] = hand1;
    const [h2, ...t2] = hand2;


    if (h1 > h2) {
        t1.push(h1);
        t1.push(h2);
        return play(t1, t2);
    } else {
        t2.push(h2);
        t2.push(h1);
        return play(t1, t2);
    }

}

console.log(hands);

const winner = play(hands[0], hands[1]);
console.log(winner);

const score = winner.map((e,i) => e * (winner.length - i));
console.log("Part 1 : ", aoc.sum(score));