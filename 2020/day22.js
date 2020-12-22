const aoc = require('./aoc');
const buffer = aoc.readfile('day22.txt');
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

const score = (hand) => aoc.sum(hand.map((e,i) => e * (hand.length - i)));

const playVariant1 = (hand1, hand2) => {
    if (hand1.length == 0) return hand2;
    if (hand2.length == 0) return hand1;
    const [h1, ...t1] = hand1;
    const [h2, ...t2] = hand2;
    if (h1 > h2) {
        t1.push(h1, h2);
        return playVariant1(t1, t2);
    } else {
        t2.push(h2, h1);
        return playVariant1(t1, t2);
    }
}

const winner = playVariant1(hands[0], hands[1]);
console.log("Part 1 : ", score(winner));


const handhash = (h1, h2) => (score(h1) * 1000000) + score(h2);

// const previousHands = [];
const playVariant2 = (hand1, hand2, prev) => {
    if (hand1.length == 0) return {hand1, hand2};
    if (hand2.length == 0) return {hand1, hand2};

    const hash = handhash(hand1, hand2);
    if (prev.includes(hash)) {
        return {hand1, hand2};
    }
    prev.push(hash);


    const [h1, ...t1] = hand1;
    const [h2, ...t2] = hand2;

    if (h1 <= t1.length && h2 <= t2.length) {
        // Recursive combat

        const nhand1 = t1.slice(0, h1);
        const nhand2 = t2.slice(0, h2);

        const rec = playVariant2(nhand1, nhand2, []);

        if (rec.hand1.length == 0) {
            t2.push(h2, h1);
            return playVariant2(t1, t2, prev);
        } else {
            t1.push(h1, h2);
            return playVariant2(t1, t2, prev);
        }

    }


    if (h1 > h2) {
        t1.push(h1, h2);
        return playVariant2(t1, t2, prev);
    } else {
        t2.push(h2, h1);
        return playVariant2(t1, t2, prev);
    }
}

const winner2 = playVariant2(hands[0], hands[1], []);
// console.log(winner2);
console.log("Part 2 : ", score(winner2.hand1));