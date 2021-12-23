const aoc = require('./aoc');

// #############
// #...........#
// ###C#B#A#D###
//   #B#C#D#A#
//   #########

  const p1 = [{
    a: ['B', 'C'],
    b: ['C', 'B'],
    c: ['D', 'A'],
    d: ['A', 'D'],
    corr: Array(11).fill(null),
    energy: 0
}];

const moves = [0, 1, 3, 5, 7, 9, 10];

const test = [{
    a: ['A', 'B'],
    b: ['D', 'C'],
    c: ['C', 'B'],
    d: ['A', 'D'],
    corr: Array(11).fill(null),
    energy: 0,
    route: []
}]

const isDone = state =>
    state.a[0] === 'A' &&
    state.a[1] === 'A' &&
    state.b[0] === 'B' &&
    state.b[1] === 'B' &&
    state.c[0] === 'C' &&
    state.c[1] === 'C' &&
    state.d[0] === 'D' &&
    state.d[1] === 'D';

let min = Number.MAX_VALUE;

const isclearPath = (corr, s, e) => {
    return corr.slice(Math.min(s, e), Math.max(s, e)).every(x => x === null)
}

const energy = { 'A': 1, 'B': 10, 'C': 100, 'D': 1000 }

const u = [['A', 2], ['B', 4], ['C', 6], ['D', 8]];


const tick = (states, c) => {
    if (c === 0) { return states }
    if (states.length === 0) return { states}
    console.log(states.length);
    const next = [];

    for (let cx = 0; cx < states.length; cx++) {
        const state = states[cx];

        if (state.energy > min) continue;
        if (isDone(state)) {
            console.log('done - ', state.energy)
            if (state.energy < min) min = state.energy;
            continue;
        }


        // Move out of first room
        for (const [home, out] of u) {
            if ((state[home.toLowerCase()][1] !== home || state[home.toLowerCase()][0] !== home) && state[home.toLowerCase()][1] !== '') {
                for (const move of moves) {
                    if (isclearPath(state.corr, out, move)) {
                        const c = [...state.corr];
                        c[move] = state[home.toLowerCase()][1];
                        next.push({
                            ...state,
                            [home.toLowerCase()]: [state[home.toLowerCase()][0], ''],
                            energy: state.energy + (energy[home] * (Math.abs(out - move)+1)),
                            corr: c,
                        })
                    }
                }
            }
        }

        //Move out of second room
        for (const [home, out] of u) {
            if ((state[home.toLowerCase()][0] !== home)
                && state[home.toLowerCase()][0] !== ''
                && state[home.toLowerCase()][1] === '') {
                for (const move of moves) {
                    if (isclearPath(state.corr, out, move)) {
                        const c = [...state.corr];
                        c[move] = state[home.toLowerCase()][0];
                        next.push({
                            ...state,
                            [home.toLowerCase()]: ['', ''],
                            energy: state.energy + (energy[home] * (Math.abs(out - move) + 2)),
                            corr: c,
                            // parent: JSON.stringify(state)
                        })
                    }
                }
            }
        }


          // move into first room
           // [['A', 2], ['B', 4], ['C', 6], ['D', 8]];
        for (const [home, out] of u) {
            if ((state[home.toLowerCase()][0] === home)
                && state[home.toLowerCase()][1] === '') {
                for (let i = 0; i < state.corr.length; i++) {
                    const move = state.corr[i];
                    if (move === home) {
                        const tempcorr = [...state.corr];
                        tempcorr[i] = null;

                        if (isclearPath(tempcorr, out, i)) {
                   
                            next.push({
                                ...state,
                                [home.toLowerCase()]: [home, home],
                                energy: state.energy + (energy[home] * (Math.abs(out - i)+1 )),
                                corr: tempcorr,
                                // parent: JSON.stringify(state)
                            })

                        }
                    }
                }
            }
        }

        // move into second room
        for (const [home, out] of u) {
            if (state[home.toLowerCase()][0] === ''
                && state[home.toLowerCase()][1] === '') {
                for (let i = 0; i < state.corr.length; i++) {
                    const move = state.corr[i];
                    if (move === home) {
                        const tempcorr = [...state.corr];
                        tempcorr[i] = null;
                        if (isclearPath(tempcorr, out, i)) {
                            next.push({
                                ...state,
                                [home.toLowerCase()]: [home, ''],
                                energy: state.energy + (energy[home] * (Math.abs(out - i) + 2)),
                                corr: tempcorr,
                            })
                        }
                    }
                }
            }
        }
    }


    const str = next.map(x => JSON.stringify(x));
    const obj = [...new Set(str)].map(x => JSON.parse(x));

    console.log(str.length, obj.length);

    return tick(obj, c - 1)
}

tick(test, 20)
// console.log(tick(start, 5));
console.log('Part 1 : ', min);