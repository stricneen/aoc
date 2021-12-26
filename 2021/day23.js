const aoc = require('./aoc');

const p1 = [{
    A: ['B', 'C'],
    B: ['C', 'B'],
    C: ['D', 'A'],
    D: ['A', 'D'],
    corr: [null, null, null, null, null, null, null, null, null, null, null],
    energy: 0
}];


const p2 = [{
    A: ['B', 'D', 'D', 'C'],
    B: ['C', 'B', 'C', 'B'],
    C: ['D', 'A', 'B', 'A'],
    D: ['A', 'C', 'A', 'D'],
    corr: [null, null, null, null, null, null, null, null, null, null, null],
    energy: 0
}];


// #############
// #...........#
// ###B#C#B#D###
//   #D#C#B#A#
//   #D#B#A#C#
//   #A#D#C#A#
//   #########

const test2 = [{
    A: ['A', 'D', 'D', 'B'],
    B: ['D', 'B', 'C', 'C'],
    C: ['C', 'A', 'B', 'B'],
    D: ['A', 'C', 'A', 'D'],
    corr: [
        null, null, null,
        null, null, null,
        null, null, null,
        null, null
    ],
    energy: 0
}]

const test2x = [{
        A: [ 'A', 'A', '', '' ],
        B: [ 'B', 'B', 'B', 'B' ],
        C: [ 'C', 'C', 'C', '' ],
        D: [ 'A', '', '', '' ],
        corr: [
          'D',  'D',  null,
          null, null, 'A',
          null, 'C',  null,
          'D',  'D'
        ],
        energy: 23267
      }]


const test1 = [{
    A: ['A', 'B'],
    B: ['D', 'C'],
    C: ['C', 'B'],
    D: ['A', 'D'],
    corr: Array(11).fill(null),
    energy: 0
}]

const isDone = state =>
    state.A.every(x => x === 'A') &&
    state.B.every(x => x === 'B') &&
    state.C.every(x => x === 'C') &&
    state.D.every(x => x === 'D');

let min = Number.MAX_VALUE;

const isClearPath = (corr, s, e) => {
    return corr.slice(Math.min(s, e), Math.max(s, e)).every(x => x === null)
}

const tick = (states, c) => {
    if (c === 0) { return states }
    if (states.length === 0) return min;
    // console.log(states.length);
    //  console.log(states)
    const next = [];

    for (let cx = 0; cx < states.length; cx++) {
        const state = states[cx];

        if (state.energy > min) continue;
        if (isDone(state) && state.energy < min) {
            // console.log('done - ', state.energy)
            // aoc.pj(state)
            if (state.energy < min) min = state.energy;
            continue;
        }

        const canMoveOut = (state, home) => {
            const house = state[home];
            if (house.every(x => x === home)) return [null, 0]
            const full = house.filter(x => x !== '');
            const rem = [...state[home]];
            rem[full.length - 1] = '';
            if (full.some(x => x !== home)) {
                return [
                    full[full.length - 1],
                    rem,
                    house.filter(x => x === '').length + 1
                ];
            }
            return [null, 0];
        }

        const moves = [0, 1, 3, 5, 7, 9, 10];
        const energy = { 'A': 1, 'B': 10, 'C': 100, 'D': 1000 }
        const u = [['A', 2], ['B', 4], ['C', 6], ['D', 8]];

        // Move out of room
        for (const [home, out] of u) {
            const [tomove, rem, count] = canMoveOut(state, home);
            if (tomove !== null) {
                for (const move of moves) {

                    if (state.corr[move] === null && isClearPath(state.corr, out, move)) {
                        const c = [...state.corr];
                        c[move] = tomove;
                        next.push({
                            ...state,
                            [home]: rem,
                            energy: state.energy + (energy[tomove] * (Math.abs(out - move) + count)),
                            corr: c
                        })
                    }
                }
            }
        }

        // move into first room
        // [['A', 2], ['B', 4], ['C', 6], ['D', 8]];
        for (const [home, out] of u) {
            const house = state[home];

            const occ = house.filter(x => x !== '');
            const empty = house.filter(x => x === '');

            const entered = [...state[home]];
            entered[occ.length] = home;

            if (occ.every(x => x === home)) {

                for (let i = 0; i < state.corr.length; i++) {
                    const move = state.corr[i];
                    if (move === home) {

                        const tempcorr = [...state.corr];
                        tempcorr[i] = null;

                        if (isClearPath(tempcorr, out, i)) {

                            const moving = home;
                            next.push({
                                ...state,
                                [home]: entered,
                                energy: state.energy + (energy[moving] * (Math.abs(out - i) + empty.length)),
                                corr: tempcorr,
                            })

                        }
                    }
                }
            }
        }
  }

    const map = new Map();
    for (const n of next) {
        const key = JSON.stringify([n.A, n.B, n.C, n.D, n.corr]);
        if (map.has(key)) {
            map.set(key, Math.min(n.energy, map.get(key)));
        } else {
            map.set(key, n.energy);
        }
    }
    const n = [];
    map.forEach((v, k) => {
        const x = JSON.parse(k);
        n.push({
            A: x[0], B: x[1], C: x[2], D: x[3],
            corr: x[4], energy: v
        })
    })

    return tick(n, c - 1);

}

console.log('Part 1 : ', tick(p1));
min = Number.MAX_VALUE
console.log('Part 2 : ', tick(p2));
