const aoc = require('./aoc');
const buffer = aoc.readfile('day5.txt');
const textraw = buffer.split(/\n/);

let seeds = []
let maps = []
let locations  =[]
textraw.forEach(l => {
    if (l.startsWith('seeds:')) { seeds = l.split(': ')[1].split(' ').map(x => parseInt(x)) }

    else if (l === '') maps.push ({ ranges : []});

    else if (l.endsWith('map:')) {
        to = l.split(' ')[0].split('-')
        m = maps[maps.length-1]
        m.source = to[0]
        m.dest = to[2]   
    }

    else {
        // console.log(l)
        m = maps[maps.length-1]
        r = l.split(' ').map(x => parseInt(x))
        t = {}
        t.sourceStart = r[1]
        t.destStart = r[0]
        t.length = r[2]
        m.ranges.push(t)
    }
});

let p1a = Number.MAX_SAFE_INTEGER
let phaseNumber = 0
for (let s = 0; s < seeds.length / 2; s++) {
    let phaseName = 'seed'
    phaseNumber = seeds[s];

    while(true) {
        console.log(phaseName, phaseNumber)

    const phase = maps.find(x => x.source === phaseName);
    console.log(phase)
    if (!phase) {
        //done
        console.log(phaseNumber)
        console.log()
        if (phaseNumber < p1a) p1a = phaseNumber;
        locations.push(phaseNumber)
        break;
    }

    let found = false;
    for (let r = 0; r < phase.ranges.length; r++) {
        const p = phase.ranges[r];

        // const sources = range(p.sourceStart, p.sourceStart + p.length -1)
        // const dests = range(p.destStart, p.destStart + p.length -1)
        
        if (phaseNumber >= p.sourceStart && phaseNumber < p.sourceStart + p.length) {
            found = true
            dest = p.destStart + phaseNumber - p.sourceStart
        }

        // console.log(sources, dests)

        // const mappedSourceIndex = sources.findIndex(x => x === phaseNumber);
        // if (mappedSourceIndex > -1) {
        //     found = true;
        //     dest = dests[mappedSourceIndex];
        // }
    }
    if (!found) dest = phaseNumber;

    phaseNumber = dest
    phaseName = phase.dest
    
}
// // seed-to-soil map:
// 50 98 2
// 52 50 48
    
}

// console.log(seeds)
// console.log(maps[0])
// console.log(maps[0].ranges)

console.log(locations)
let p1 = 0, p2 = 0
console.log('Part 1: ', Math.min(...locations))
console.log('Part 2: ', p2);

