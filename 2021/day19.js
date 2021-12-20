const aoc = require('./aoc');
const buffer = aoc.readfile('day19.txt');
const text = buffer.split(/\n/);

const scanners = text.reduce((a, e) => {
    if (e.indexOf('---') > -1) a.push({ scanner: e, beacons: [] });
    if (e.indexOf(',') > -1) a[a.length - 1].beacons.push(e.split(',').map(x => parseInt(x)));
    return a;
}, []);

const dist = (x, y) => {
    return Math.sqrt(Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2))
}

function* rotate3d([x, y, z]) {
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
    yield [z, -x, -y];
    yield [z, -y, x];
    yield [-x, y, -z];
    yield [-x, z, y];
    yield [-x, -y, z];
    yield [-x, -z, -y];
    yield [-y, x, z];
    yield [-y, z, -x];
    yield [-y, -x, -z];
    yield [-y, -z, x];
    yield [-z, x, -y];
    yield [-z, y, x];
    yield [-z, -x, y];
    yield [-z, -y, -x];
}

const pj = (m) => console.dir(m, { depth: null, colors: true }, 2);

const intersect = (a, b) => {
    return [...new Set(a.filter(value => b.includes(value)))];
}

var mode = function mode(arr) {
    return arr.reduce(function(current, item) {
        var val = current.numMapping[item] = (current.numMapping[item] || 0) + 1;
        if (val > current.greatestFreq) {
            current.greatestFreq = val;
            current.mode = item;
        }
        return current;
    }, {mode: null, greatestFreq: -Infinity, numMapping: {}}).mode;
};

const mode3 = (l) =>
    l.reduce(
        (a, b, i, arr) =>
            (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
        null)

const arrayEquals =(a, b) => {
return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

          function mode2(array) {
            let map = array.map((a) => array.filter((b) => a === b).length);
        
            return array[map.indexOf(Math.max.apply(null, map))];
        }
        

const dists = scanners.map(scanner => {
    const dists = [];
    const set = []
    for (const x of scanner.beacons) {
        for (const y of scanner.beacons) {
            set.push(dist(x, y))
        }
        dists.push({ pos: x, set: [...new Set(set)] })
    }
    const sets = [...new Set(dists.map(x => set).flat())];
    return { ...scanner, sets };
});

const beaconPositions = [[0,0,0]];
const merge = (root, match) => {

    const c = []
    for (const y of match.beacons) {
         for (const x of root.beacons) {
            for (const z of rotate3d([y[0], y[1], y[2]])) {
                //  console.log([x[0],x[1],x[2]],'-',[y[0],y[1],y[2]]);
                c.push({ r: [x[0], x[1], x[2]], y: [y[0], y[1], y[2]], rot: [z[0], z[1], z[2]], dist: dist([x[0], x[1], x[2]], [z[0], z[1], z[2]]) })
            }
        }
    }
    console.log('a')

    console.log(c.map(x => x.dist).length);
    const m = mode(c.map(x => x.dist));
    console.log('b')

    const f = c.filter(x => x.dist === m);

    console.log('c')
    //console.log(f);
    const offset = [f[0].r[0] - f[0].rot[0], f[0].r[1] - f[0].rot[1], f[0].r[2] - f[0].rot[2]]

    console.log('offset' , offset);

    beaconPositions.push(offset);
    // const transform = [
    //     f[0].y[0] === f[0].rot[0] ? 1 : -1,
    //     f[0].y[1] === f[0].rot[1] ? 1 : -1,
    //     f[0].y[2] === f[0].rot[2] ? 1 : -1
    // ];

    let ct = 0;
    for(const t of rotate3d([f[0].y[0], f[0].y[1],f[0]. y[2]])) {
        if (t[0] === f[0].rot[0] && t[1] === f[0].rot[1] && t[2] === f[0].rot[2] ){
            break;
        }
        ct++;
    }

    console.log(ct)

    const rotated = match.beacons.map(t => {
        let ctx=0;
        let bob;
        for(const r of rotate3d(t)) {
            if (ct === ctx) bob = [r[0] + offset[0], r[1] + offset[1], r[2] + offset[2]];
            ctx++
        }
        return bob;
    });


    for (const rot of rotated) {
        if (!root.beacons.some(r => arrayEquals(r,rot))){
            root.beacons.push(rot);
        }
    }

    const dists = [];
    const set = []
    for (const x of root.beacons) {
        for (const y of root.beacons) {
            set.push(dist(x, y))
        }
        dists.push({ pos: x, set: [...new Set(set)] })
    }
    const sets = [...new Set(dists.map(x => set).flat())];

    return {
        scanner: root.scanner,
        beacons: root.beacons,
        sets
    }
}

const calc = (root, remainder) => {

    if (remainder.length === 0) return root;
    const common = remainder.map(x =>
        ({ ...x, common: intersect(x.sets, root.sets).length })
    );
    common.sort((a, b) => { return b.common - a.common });
    const match = common.shift();
    console.log(`Best match ${match.scanner} with ${match.common}`);
    // connect zero and match

    const newRoot = merge(root, match);
    // pj(match);
    console.log(newRoot.beacons.length);

   // return newRoot;
    return calc(newRoot, remainder.filter(x => x.scanner !== match.scanner));
}

const zero = dists[0];
const remainder = dists.filter(x => x.scanner !== zero.scanner);

const root = (calc(zero, remainder));
console.log(root.beacons.length)


console.log(beaconPositions);

const man = []
for (let x = 0; x < beaconPositions.length; x++) {

    for (let y = x; y < beaconPositions.length; y++){

        const a = beaconPositions[x];
        const b = beaconPositions[y];
        const d = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])
        man.push(d);
    }
}

console.log(Math.max(...man));


