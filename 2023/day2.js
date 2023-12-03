const aoc = require('./aoc');
const buffer = aoc.readfile('day2.txt');
const text = buffer.split(/\n/);

const games = text.reduce((a,l) => {
     const g = l.split(': ');
     const turns = g[1].split('; ');
     const turn  = turns.map(t => t.split(', '))
        .reduce((a,e) => {
            const t = [];
            const x = e.map(ee => ee.split(' '));
            x.forEach(y => {
                t.push([y[1], parseInt(y[0])])
            });
            a.push(t)
            return a;
        }, []);
     
    a[aoc.extractNums(g[0])] = turn;
    return a;
}, {});

// console.log(games['1'])
let p1 = 0;
let p2 = 0;
Object.keys(games).forEach(game => {
    //12 red cubes, 13 green cubes, and 14 blue cubes
    let valid = true;
    games[game].forEach(g => {
        g.forEach(t => {
            if (t[0] === 'blue' && t[1] > 14) { valid = false; }
            if (t[0] === 'green' && t[1] > 13) { valid = false; }
            if (t[0] === 'red' && t[1] > 12) { valid = false; }
        })
    })
    if (valid) p1 += parseInt(game);

    let red = 0,green = 0,blue = 0;
    games[game].forEach(g => {
        g.forEach(t => {
            if (t[0] === 'blue' && t[1] > blue) { blue = t[1] }
            if (t[0] === 'green' && t[1] > green) { green = t[1] }
            if (t[0] === 'red' && t[1] > red) { red = t[1] }
        })
    })
    p2 += (red * green * blue)
});

console.log('Part 1: ', p1);
console.log('Part 2: ', p2);
