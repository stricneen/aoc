const aoc = require('./aoc');
const [buffer, test] = aoc.readfilePro(23);
const data = buffer.split(/\n/)

let elves = data.map((l, i) => {
    const row = []
    for (let j = 0; j < l.length; j++) {
        if (l[j] === '#') {
            row.push([j, i])
        }
    }
    return row
}).flat()

const dirs = [
    [[-1, -1], [0, -1], [1, -1]],
    [[-1, 1], [0, 1], [1, 1]],
    [[-1, -1], [-1, 0], [-1, 1]],
    [[1, -1], [1, 0], [1, 1]],
];

const round = (elves, round) => {

    const elvesStr = elves.map(e => e.toString())
    const proposals = elves.map(([x, y]) => {

        // Should move
        let shouldMove = false;
        for (const dir of dirs) {
            for ([dx, dy] of dir) {
                if (elvesStr.includes(([x + dx, y + dy]).toString())) {
                    shouldMove = true;
                }
            }
        }
        if (!shouldMove) { return [[x, y], undefined, undefined]; } // nothing adjacent

        // Proposals
        for (let i = 0; i < 4; i++) {
            let canMove = true;
            const moves = dirs[(round + i) % 4];
            for (const [dx, dy] of moves) {
                canMove = canMove && !elvesStr.includes(([x + dx, y + dy]).toString())
            }
            if (canMove) {
                return [[x, y], moves[1], [x + moves[1][0], y + moves[1][1]]];
            }
        }
        return [[x, y], undefined, undefined];
    });

    // console.log(proposals)

    const nelves = []
    for (const proposal of proposals) {
        if (proposal[1] === undefined) {
            nelves.push(proposal[0])
        } else {
            const others = proposals.filter(p => p[1] !== undefined && p[2][0] === proposal[2][0] && p[2][1] === proposal[2][1]);
            if (others.length > 1) {
                nelves.push(proposal[0])
            } else {
                nelves.push(proposal[2])
            }
        }
    }


    // can they move
    // console.log(nelves)
    return nelves

}

const print = (elves) => {
    const [xmin, xmax, ymin, ymax] = elves.reduce((a, [x, y]) => {
        if (!a.length) return [x, x, y, y];
        return [
            Math.min(a[0], x),
            Math.max(a[1], x),
            Math.min(a[2], y),
            Math.max(a[3], y)
        ]
    }, []);

    let l = ''
    for (let y = ymin; y <= ymax; y++) {
        for (let x = xmin; x <= xmax; x++) {
            l += elves.some(e => e[0] === x && e[1] === y) ? '#' : '.'
        }
        l += '\n'
    }
    console.log(l)
    console.log()
}

const emptySpaces = (elves) => {
    let empty = 0;
    const [xmin, xmax, ymin, ymax] = elves.reduce((a, [x, y]) => {
        if (!a.length) return [x, x, y, y];
        return [
            Math.min(a[0], x),
            Math.max(a[1], x),
            Math.min(a[2], y),
            Math.max(a[3], y)
        ]
    }, []);

    for (let y = ymin; y <= ymax; y++) {
        for (let x = xmin; x <= xmax; x++) {
            if (!elves.some(e => e[0] === x && e[1] === y)) empty++
        }
    }
return empty;
}

// print(elves)


for (let roundNum = 0; roundNum < 1000; roundNum++) {
    nelves = round(elves, roundNum);

    if (roundNum === 9) {
        console.log('Part 1:', emptySpaces(nelves))
    }

    if (nelves.toString() === elves.toString()) {
        console.log('Part 2:', roundNum + 1);
        break;
    }

    elves = nelves
}
