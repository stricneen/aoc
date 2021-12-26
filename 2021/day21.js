// Player 1 starting position: 1
// Player 2 starting position: 6
const p1 = () => {
    function* dicegen() {
        let roll = 0;
        while (true) {
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
        player1 = ((player1 + p1roll) % 10);
        player1Score += player1 + 1;
        if (player1Score > 999) break;

        let p2roll = dice.next().value + dice.next().value + dice.next().value;
        rolls += 3;
        player2 = ((player2 + p2roll) % 10);
        player2Score += player2 + 1;
        if (player2Score > 999) break;
    }
    return Math.min(player1Score, player2Score) * rolls;
}
console.log('Part 1 : ', p1());

const move = (player, diceOutcome) => {
    player.pos = ((player.pos - 1 + diceOutcome) % 10) + 1;
    player.score += player.pos;
}

const split = (p1, p2, p1Turn) => {
    if (p1.score >= 21) {
        return 1;
    } else if (p2.score >= 21) {
        return 0;
    }

    const currPlayer = p1Turn ? p1 : p2;
    let sum = 0;
    for (let dice = 3; dice <= 9; dice++) {
        const oldPos = currPlayer.pos;
        const oldScore = currPlayer.score;
        move(currPlayer, dice);
        const multiplier = mult(dice);
        sum += multiplier * split(p1, p2, !p1Turn);
        currPlayer.pos = oldPos;
        currPlayer.score = oldScore;
    }
    return sum;
}

const mult = (num) => {
    switch (num) {
        case 3: return 1;
        case 4: return 3;
        case 5: return 6;
        case 6: return 7;
        case 7: return 6;
        case 8: return 3;
        case 9: return 1;
    }
}

const p2 = split({ pos: 1, score: 0 }, { pos: 6, score: 0 }, true);
console.log('Part 2 : ', p2);