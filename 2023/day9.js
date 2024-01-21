const aoc = require('./aoc');
const buffer = aoc.readfile('day9.txt');
const textraw = buffer.split(/\n/);

const histories = textraw.map(x => x.split(' ').map(y => parseInt(y)))

const diffs = (history, c = []) => {

    if (c.length === 0) c.push(history)

    const n = (l) => l.reduce((a, e, i) => {
        if (i > 0) a.push(e - l[i - 1])
        return a;
    }, []);

    const next = n(history);
    c.push(next);

    if (next.every(x => x === 0)) return c;
    return diffs(next, c)
}

const predictLast = (h) => h.reduce((a,e) => a + e[e.length-1], 0);

const predictFirst = (h) => h.reverse().reduce((a,e) => e[0] - a , 0);

const d = histories.map(x => diffs(x));

const p1 = d.map(predictLast);
const p2 = d.map(predictFirst);

console.log('Part 1:', aoc.sum(p1)); // 
console.log('Part 2:', aoc.sum(p2)); // 
