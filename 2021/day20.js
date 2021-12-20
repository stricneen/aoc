const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const text = buffer.split(/\n/);

const scanners = text.reduce((a,e) => {
    if (e.indexOf('---') > -1) a.push({ scanner: e, beacons: []});
    if (e.indexOf(',') > -1)  a[a.length-1].beacons.push(e.split(',').map(x => parseInt(x)));
    return a;
}, []);

const dist = (x,y) => {
    return Math.sqrt(Math.pow(x[0]-y[0],2) + Math.pow(x[1]-y[1],2) + Math.pow(x[2]-y[2],2))
}

function* rotate3d([x,y,z]) {
    yield [x, y, z];
    yield [x, z, -y];
    yield [x, -y, -z];
    yield [x, -z, y];
    yield [y, x, -z];
    yield [y, z, x];
    yield [y, -x, z];
    yield [y, -z, -x];
    yield [z, x, y];
    yield [z, y, -x];
    yield  [z, -x, -y];
    yield  [z, -y, x];
    yield  [-x, y, -z];
    yield  [-x, z, y];
    yield  [-x, -y, z];
    yield  [-x, -z, -y];
    yield  [-y, x, z];
    yield  [-y, z, -x];
    yield  [-y, -x, -z];
    yield  [-y, -z, x];
    yield  [-z, x, -y];
    yield  [-z, y, x];
    yield  [-z, -x, y];
    yield  [-z, -y, -x];
}

const pj = (m) => console.dir(m, { depth: null, colors: true },2);

const intersect = (a,b) => {
    return [...new Set(a.filter(value => b.includes(value)))];
}


const dists = scanners.map(scanner => {
    const dists = [];
    const set = []
    for (const x of scanner.beacons) {
        const a = [];
        for (const y of scanner.beacons) {
            a.push(dist(x,y));
            set.push(dist(x,y))
        }
        dists.push({pos: x, set: [...new Set(set)],dists: a.filter(x => x !== 0)})
    }
    return { ...scanner, beacons: dists };
});

console.log(dists)
// console.dir(scanners, { depth: null, colors: true });

const d1 = dists[0]
const d2 = dists[1]

// x = aoc.sort_ints(d1);
 pj(d1)

// for (const bob of rotate3d([1,2,3])) {
//     console.log(bob);
// }

