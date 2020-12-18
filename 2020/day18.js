const aoc = require('./aoc');
const buffer = aoc.readfile('day18.txt');
const text = buffer.split(/\n/);

const solve = (eq, prefAdd) => {

    if (eq.indexOf(')') > -1) {

        const firstC = eq.indexOf(')');
        const prev = eq.substring(0, firstC);
        const matchO = prev.lastIndexOf('(');

        const inner = eq.substr(matchO + 1, firstC - 1);
        const closing = inner.indexOf(')');

        const before = eq.substring(0, matchO);
        const innereq = closing == -1 ? inner : inner.substring(0, closing);
        const after = eq.substring(firstC + 1);

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

        if (part[1] == '+'){
            const m = parseInt(part[0]) + parseInt(part[2]);
            const n  = m.toString() + ' ' + part.slice(3).join(' ');
            return solve(n, prefAdd);
        }
        if (part[1] == '*') {
            const m = parseInt(part[0]) * parseInt(part[2]);
            const n  = m.toString() + ' ' + part.slice(3).join(' ');
            return solve(n ,prefAdd);
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