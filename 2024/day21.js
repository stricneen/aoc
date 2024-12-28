const { assert } = require('console');
const aoc = require('./aoc');
const buffer = aoc.readfilePro(21);
const text = buffer.split(/\n/);

const numPad = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    [' ', '0', 'A'],
];

const dPad = [
    [' ', '^', 'A'],
    ['<', 'v', '>'],
];

const best = new Map();

const totalComplexity = (robots) =>
    text.map((code) => plen(findNestedPath(code, robots)) * Number(code.slice(0, 3))).reduce((a, b) => a + b, 0);

const findNestedPath = (code, depth) =>
    depth ? findMinPath(dPad, findNestedPath(code, depth - 1)) : findMinPath(numPad, new Map([[code, 1]]));

const findMinPath = (pad, current) => {
    const [, blankY] = findKey(pad, ' ');
    const path = new Map();
    [...current.entries()].forEach(([step, count]) =>
        step
            .split('')
            .map((key, i, keys) => [keys[(i - 1 + keys.length) % keys.length], key])
            .map(([start, end]) => controlStep(pad, start, end, blankY))
            .forEach((step) => path.set(step, (path.get(step) ?? 0) + count)),
    );
    return path;
};

// Determines the lowest-complexity control sequence that will move to the next key and press it.
const controlStep = (pad, start, end, blankY) => {
    const [xI, yI] = findKey(pad, start);
    const [xO, yO] = findKey(pad, end);
    const stepX = xI < xO ? '>'.repeat(xO - xI) : '<'.repeat(xI - xO);
    const stepY = yI < yO ? 'v'.repeat(yO - yI) : '^'.repeat(yI - yO);

    return (
        !stepX || !stepY ? `${stepX}${stepY}A`
            : xI === 0 && yO === blankY ? `${stepX}${stepY}A`
                : yI === blankY && xO === 0 ? `${stepY}${stepX}A`
                    : betterStep(`${stepX}${stepY}A`, `${stepY}${stepX}A`)
    );
};

// A memoized selector to choose the lowest-complexity step when there's not an obvious choice.
const betterStep = (a, b) => {
    const choice = `${a},${b}`;
    if (best.has(choice)) return best.get(choice);

    // Arbitrarily set choice to the first option to avoid a recursive loop
    best.set(choice, a);
    let [pathA, pathB] = [a, b].map(step => new Map([[step, 1]]));
    let lengthA, lengthB;
    do {
        [pathA, pathB] = [pathA, pathB].map(p => findMinPath(dPad, p));
    } while ((lengthA = plen(pathA)) === (lengthB = plen(pathB)));

    best.set(choice, lengthA < lengthB ? a : b);
    return best.get(choice);
};

const findKey = (pad, char) => {
    const y = pad.findIndex(row => row.includes(char));
    return [pad[y].indexOf(char), y];
};

const plen = (path) =>
    [...path.entries()].map(([step, count]) => step.length * count).reduce((a, b) => a + b, 0);


const p1 = totalComplexity(2);
const p2 = totalComplexity(25);

assert(p1 === 278568, 'p1')
assert(p2 === 341460772681012, 'p2')
console.log("Part 1 : ", p1);
console.log("Part 2 : ", p2);