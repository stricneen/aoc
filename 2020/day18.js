const aoc = require('./aoc');
const buffer = aoc.readfile('day18.txt');
const text = buffer.split(/\n/);

const solve = (eq, prefAdd) => {

    if (eq.indexOf(')') > -1) { // Are there brackets?

        const firstClosing = eq.indexOf(')');
        const matchingOpener = eq.substring(0, firstClosing).lastIndexOf('(');

        const inner = eq.substr(matchingOpener + 1, firstClosing - 1);
        const closing = inner.indexOf(')');

        const before = eq.substring(0, matchingOpener);
        const innereq = closing == -1 ? inner : inner.substring(0, closing);
        const after = eq.substring(firstClosing + 1);

        return solve(before + solve(innereq, prefAdd) + after, prefAdd);
    }
    else {

        const part = eq.split(' ');

        if (prefAdd) {
            if (eq.indexOf('+') > -1 && eq.indexOf('*') > -1) {
                const add = part.indexOf('+');
                if (add > -1) {
                    part[add-1] = '(' + part[add-1];
                    part[add+1] =  part[add+1] + ')';
                    return solve(part.join(' '), prefAdd);
                }
            }
        }

        if (part[1] == '+' || part[1] == '*') {
            const res = part[1] == '+' 
                ? parseInt(part[0]) + parseInt(part[2])
                : parseInt(part[0]) * parseInt(part[2]);

            const n  = res.toString() + ' ' + part.slice(3).join(' ');
            return solve(n, prefAdd);
        }

    }
    return parseInt(eq);
};

let p1 = text.map(x => solve(x, false));
let p2 = text.map(x => solve(x, true));

console.log("Part 1 : ", aoc.sum(p1));
console.log("Part 2 : ", aoc.sum(p2));

require('assert').strictEqual(aoc.sum(p1), 12956356593940);
require('assert').strictEqual(aoc.sum(p2), 94240043727614);