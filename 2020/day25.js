
const loop = (subject, to) => {
    let x = 1;
    let c = 0;
    while(x != to) {
        x *= subject;
        x %= 20201227;
        c++;
    }
    return c;
};


const key = (subject, loop) => {
    let x = 1;
    let c = 0;
    while(c < loop) {
        x *= subject;
        x %= 20201227;
        c++;
    }
    return x;
};

const card = 15530095;
const door = 17773298;

const subject = 7;

let cardLoop = loop(subject, card);
let doorLoop = loop(subject, door);

console.log('Card loop : ', cardLoop);
console.log('Part 1 : ', key(door, cardLoop));

console.log('Door loop : ', doorLoop);
console.log('Part 1 : ', key(card, doorLoop));


