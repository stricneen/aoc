const aoc = require('./aoc');

// #############
// #...........#
// ###C#B#A#D###
//   #B#C#D#A#
//   #########

              1
// #01 3 5 7 90#
// #...........#
// ###B#C#B#D###
//   #A#D#C#A#
//   #########

//  const moves = {
//      aout: [
//          [0,[0,1,2]],
//          [1,[1,2]],
//          [3,[2,3]],
//          [5,[2,3,4,5]],
//          [7,[2,3,4,5,6,7]],
//          [9,[2,3,4,5,6,7,8,9]],
//          [10,[2,3,4,5,6,7,8,9,10]],
//      ]
//  }

const moves = [0,1,3,5,7,9,10];

  const start = [{
    a: ['A','B'],
    b: ['D','C'],
    c: ['C','B'],
    d: ['A','D'],
    corr: Array(11).fill(null),
    energy: 0
  }]

  aoc.pj(start)

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

 const isclearPath = (corr, s ,e) => {
     return corr.slice(Math.min(s,e),Math.max(s,e)).every(x => x === null)
 }

 const energy = {'A':1,'B':10,'C':100,'D':1000}

  const tick = (states, c) => {
    if (c===0) {return states}
    const next = [];
    // calc all next states

    for (const state of states) {
        if (state.energy > min) continue;
        if (isDone(state)) {
             if (state.energy < min) min = state.energy;
            continue;
        }

        // a: ['A','B'],
        // b: ['D','C'],
        // c: ['C','B'],
        // d: ['A','D'],
        // corr: Array(11).fill(null),


        // const out = 2; // door
        // const home = 'A';

        const u = [['A',2],['B',4],['C',6],['D',8]];
    for (const [home,out] of u)     

        if ((state[home.toLowerCase()][1] !== home || state[home.toLowerCase()][0])
        && state[home.toLowerCase()][1] !== '') {
           
            for (const move of moves) {
                if (isclearPath(state.corr,out,move)) {
                    const c = [...state.corr];
                    c[move] = state[home.toLowerCase()][1];
                    next.push({
                        ...state,
                        [home.toLowerCase()]: [state[home.toLowerCase()][0], ''],
                        energy: state.energy + (energy[state[home.toLowerCase()][1]] * Math.abs(out-move)),
                        corr: c
                    })
                }
            }
        }
    }



    // remove any over min

    // any done? check againt min & discard

aoc.pj(next)
console.log('')
    return tick(next,c-1)
  }

  tick(start,1);
  console.log('Part 1 : ', min);