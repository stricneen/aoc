const aoc = require('./aoc');
const buffer = aoc.readfile('day20.txt');
const text = buffer.split(/\n/);
const algo = text.shift();
text.shift();
const image = text.map(x => x.split(''));

// Player 1 starting position: 1
// Player 2 starting position: 6

function* dicegen() {
    let roll = 0;
    while(true) {
        roll++;
        if (roll === 101) roll = 1;
        yield roll;
    }
}

const dice = dicegen()

let player1 = 10;
let player2 = 5;
let player1Score = 0;
let player2Score = 0;
let rolls = 0;

while (true) {

    let p1roll = dice.next().value + dice.next().value + dice.next().value;
    rolls += 3;
//    console.log(p1roll)
    player1 =( (player1 + p1roll) % 10) ;
    player1Score += player1 +1;
    if (player1Score > 999) break;
    console.log(p1roll, player1Score)

    let p2roll = dice.next().value + dice.next().value + dice.next().value;
    rolls += 3;
    player2 = ((player2 + p2roll) % 10 );
    player2Score += player2 + 1;
    if (player2Score > 999) break;
    console.log(p2roll,player2Score)
}

console.log('winner', Math.max(player1Score, player2Score));
console.log('loser', Math.min(player1Score, player2Score));

console.log('rolls', rolls);

console.log(Math.min(player1Score, player2Score) * rolls)



