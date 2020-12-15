const test = '0,3,6';
const text = '0,13,1,8,6,15';

const input = text.split(',').map(x => parseInt(x));


// 0 : 1
// 3 : 2
// 6

const game = (to) => {

    const prev = new Array(to);

    let prevRounds = input.slice(0, input.length-1);
    prevRounds.forEach((e,i) => prev[e] = i+1);
    
    let current = input[input.length - 1];
    let i = input.length;

    while(i < to) {
        const c = prev[current];
        prev[current] = i;
        current = c != undefined ? i - c : 0;
        i++;  
    }
    return current;
}

console.log("Part 1 : ", game(2020));
console.log("Part 2 : ", game(30000000));
