const aoc = require('./aoc');
    
const buffer = aoc.readfile('day18.txt');

const text = buffer.split(/\n/);


// 1 + 2 * 3 + 4 * 5 + 6 
// 2 * 3 + (4 * 5)
// 5 + (8 * 3 + 9 + 3 * 4 * 3)
// 5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
// ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2



const solve = (eq) => {

    console.log(eq);


    if (aoc.isNumber(eq)) {
        return parseInt(eq);
    }

    if (eq.indexOf(')') > -1) {

        const firstC = eq.indexOf(')');
        const prev = eq.substring(0, firstC);
        const matchO = prev.lastIndexOf('(');

        const inner = eq.substr(matchO + 1, firstC - 1);
        const closing = inner.indexOf(')');

        const before = eq.substring(0, matchO);
        const innereq = closing == -1 ? inner : inner.substring(0, closing);
        const after = eq.substring(firstC + 1);


        // 1 + 2 * 3 + 4 * 5 + 6
        return solve(before + solve(innereq) + after);
    }
    else {
        const part = eq.split(' ');

        if (eq.indexOf('+') > -1 && eq.indexOf('*') > -1) {

            const add = part.indexOf('+');
            if (add > -1) {
    
                part[add-1] = '(' + part[add-1];
                part[add+1] =  part[add+1] + ')';
                return solve(part.join(' '));
            }

        }

        if (part[1] == '+'){
            const m = parseInt(part[0]) + parseInt(part[2]);
            const n  = m.toString() + ' ' + part.slice(3).join(' ');
            return solve(n);
        }
        if (part[1] == '*') {
            const m = parseInt(part[0]) * parseInt(part[2]);
            const n  = m.toString() + ' ' + part.slice(3).join(' ');
            return solve(n);
        }

    }



    return parseInt(eq);
};

let ans = [];
for (eq of text) {
    let a = solve(eq);
    ans.push(a);
    console.log(a);
}

console.log("Part 1 : ", aoc.sum(ans));

    