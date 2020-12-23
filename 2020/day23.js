const aoc = require('./aoc');
const buffer = aoc.readfile('day23.txt');
const text = buffer.split(/\n/);

 const input = '476138259';
//const input = '389125467';
const cups = input.split('').map(x => parseInt(x));

const play = (cups, rounds) => {
    let current = cups[0];
    let max = Math.max(...cups);
    for (let m = 0; m < rounds; m++) {

        console.log('current',current);
        console.log(cups);

        const remove = cups.splice(1,3);
        console.log('remove' ,remove);
        let dest = current - 1;
        while(!cups.includes(dest)) {
            dest--;
            if (dest < 1) {
                dest = max;
            }
        }

        console.log('dest',dest);
        cups.splice(cups.indexOf(dest) + 1, 0, ...remove);

        console.log('after', cups);
        cups =  cups.slice(1).concat(cups[0]);
        current = cups[0];
        console.log();

    }
    return [...cups.slice(cups.indexOf(1)+1), ...cups.slice(0,cups.indexOf(1))];
}

const end = play(cups, 100);




console.log(end.join(''));
    