const { prependListener } = require('process');
const aoc = require('./aoc');

const input = '476138259';
const test = '389125467';
const cups = input.split('').map(x => parseInt(x));

const arrayToLL = (array) => {
    return array.map((e,i) => {
      
        const next = i == array.length - 1 ? 0 : i + 1;
        return { val:e, next};
    });
}

const play = (cups, rounds) => {
    let ptr = 0;

    for (let round = 0; round < rounds; round++) {
        
        const n0 = cups[ptr];
        const n1 = cups[n0.next];
        const n2 = cups[n1.next];
        const n3 = cups[n2.next];
        const cnext = n0.next;
        
        cups[ptr].next = n3.next;
        
        let dest = n0.val - 1;
        const removed = [n1.val, n2.val, n3.val];
        while(true) {
            if (dest < 1) dest = cups.length;
            if (!removed.includes(dest)) {
                break;
            }
            dest--;
        }

        const dIndex = dest < 10 ? cups.findIndex(x => x.val == dest) : dest - 1;
        n3.next = cups[dIndex].next;
        cups[dIndex].next = cnext;
        ptr = n0.next;
    }

    return cups;
}


const dll1 = arrayToLL(cups);
const play1 = play(dll1, 100);

let index = play1.find(x => x.val == 1).next;
let p1 = '';
for (let i = 0; i < 8; i++) {
    p1 += play1[index].val;
    index = play1[index].next;
}

console.log('Part 1 : ', parseInt(p1));

const cups2 = cups.concat(Array.from({length: 1000000 - 9}, (_, i) => i + 10));
const dll2 = arrayToLL(cups2);

const p2 = play(dll2, 10000000);

let index2 = p2.find(x => x.val == 1);

let p2a = p2[index2.next];
let p2b = p2[p2a.next];
console.log('Part 2 : ', p2a.val * p2b.val);

