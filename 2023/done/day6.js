const aoc = require('../aoc');

const time = [46, 82, 84, 79]
const distance = [347, 1522, 1406, 1471]

time.push(parseInt(time.reduce((a,e) => a += e, '')))
distance.push(parseInt(distance.reduce((a,e) => a += e, '')))

const raceDistances = (t,dist) => {
    const d = []
    for (let button = 0; button <= t; button++) {
        const moveTime = t - button;
        d.push([button * moveTime, dist])
    }
    return d;
}

p1 = []

for (let i = 0; i < time.length; i++) {
    const distances =  raceDistances(time[i], distance[i])
    const win = distances.filter(([x,y]) => x >y)
    p1.push( win.length)
}

console.log('Part 1: ', aoc.product(p1.slice(0,p1.length-1)));
console.log('Part 2: ', p1[p1.length-1]);