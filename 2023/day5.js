const aoc = require('./aoc');
const buffer = aoc.readfile('day5.txt');
const textraw = buffer.split(/\n/);

let seeds = []
let maps = []

textraw.forEach(l => {
    if (l.startsWith('seeds:')) { seeds = l.split(': ')[1].split(' ').map(x => parseInt(x)) }

    else if (l === '') maps.push({ ranges: [] });

    else if (l.endsWith('map:')) {
        to = l.split(' ')[0].split('-')
        m = maps[maps.length - 1]
        m.source = to[0]
        m.dest = to[2]
    }

    else {
        // console.log(l)
        m = maps[maps.length - 1]
        r = l.split(' ').map(x => parseInt(x))
        t = {}
        t.sourceStart = r[1]
        t.destStart = r[0]
        t.length = r[2]
        m.ranges.push(t)
    }
});
// 31161857
// 31168506


function* seedScanGen(seeds) {
    for (let i = 0; i < seeds.length / 2; i++) {
        const start = seeds[i * 2]
        const range = seeds[(i * 2) + 1]
        const step = Math.trunc(Math.sqrt(range));

        for (let j = 0; j < range; j+=step) {
            yield start + j;
        }
    }
}

function* seedReduceGen(seed) {

    // 31161857 ***
    // 31168506
    
    let s = seed
    while(s > seed / 4) {
        yield s;
        s--;
    }
}


function* single(seed) {
    yield seed
}

let phaseNumber = 0
const calc = (seeds) => {
    let final = { seed: 0, min :Number.MAX_SAFE_INTEGER }
    for (const seed of seeds) {

        let phaseName = 'seed'
        phaseNumber = seed;

        while (true) {
            const phase = maps.find(x => x.source === phaseName);
            if (!phase) {
                if (phaseNumber < final.min) {
                    final.min = phaseNumber;
                    final.seed = seed;
                }
                break;
            }

            let found = false;
            for (let r = 0; r < phase.ranges.length; r++) {
                const p = phase.ranges[r];
                if (phaseNumber >= p.sourceStart && phaseNumber < p.sourceStart + p.length) {
                    found = true
                    dest = p.destStart + phaseNumber - p.sourceStart
                }
            }
            if (!found) dest = phaseNumber;

            phaseNumber = dest
            phaseName = phase.dest
        }
    }
    return final
}

p1 = calc(seeds);
console.log('Part 1:', p1.min)

localmin = calc(seedScanGen(seeds))
// console.log(localmin)

s = localmin.seed
// p2 = calc(seedReduceGen(localmin.seed))
// console.log('Part 2: ', p2)
lm = localmin.min

while(true) {
    x = calc(single(s))
    // console.log(x)
    if (x.min > lm) {
        break;
    }
    s--
    lm = x.min
}

console.log('Part 2:', lm)
