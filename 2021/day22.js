const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const text = buffer.split(/\n/);
const ops = text.map(m => {
    const on = m.split(' ');
    let r = { on: on[0] === 'on', coords: [] };
    const coords = on[1].split(',');
    for (const i of coords) {
        const c = i.substring(2, i.length).split('..');
        r.coords.push([Math.min(parseInt(c[0]), parseInt(c[1])), Math.max(parseInt(c[0]), parseInt(c[1]))])
    }
    return r;
});

const initialization = ops =>
    ops.reduce((a, e) => {
        a.push({
            on: e.on, coords: [
                [Math.max(-50, e.coords[0][0]), Math.min(50, e.coords[0][1])],
                [Math.max(-50, e.coords[1][0]), Math.min(50, e.coords[1][1])],
                [Math.max(-50, e.coords[2][0]), Math.min(50, e.coords[2][1])]
            ]
        })
        return a;
    }, []);

const p1_old = (ops) => {
    const map = new Map();
    for (const inst of ops) {
        for (let x = inst.coords[0][0]; x <= inst.coords[0][1]; x++) {
            for (let y = inst.coords[1][0]; y <= inst.coords[1][1]; y++) {
                for (let z = inst.coords[2][0]; z <= inst.coords[2][1]; z++) {
                    const key = `${x}_${y}_${z}`
                    if (inst.on) {
                        map.set(key, true);
                    } else {
                        map.delete(key);
                    }
                }
            }
        }
    }
    return map.size;
}

const bounds = ops => ops.reduce((a, e) => {
    if (a.length === 0) {
        return e.coords;
    }
    return [
        [Math.min(e.coords[0][0], a[0][0]), Math.max(e.coords[0][1], a[0][1])],
        [Math.min(e.coords[1][0], a[1][0]), Math.max(e.coords[1][1], a[1][1])],
        [Math.min(e.coords[2][0], a[2][0]), Math.max(e.coords[2][1], a[2][1])],
    ];
}, []);

// {
//     on: true,
//     coords: [ [ -52752, 22273 ], [ -49450, 9096 ], [ 54442, 119054 ] ]
//   }

const flip = ()

const slice = ops => {
    const vals = ops.reduce((a,e) => {
        const area = Math.abs(e.coords[0][0] - e.coords[0][1]) * Math.abs(e.coords[1][0] - e.coords[1][1])
        return a + area;
    }, 0);
    return vals;
}

const p1 = (ops) => {
    const b = bounds(ops);
    let sum = 0;
    for (let z = b[2][0]; z <= b[2][1]; z++) {
       const layer = ops.filter(x => x.coords[2][0] <= z && x.coords[2][1] >= z) ;
       sum += slice(layer);
    }
    return sum;
}

const ans = p1(ops);
console.log('Part 1 : (new)', ans);
console.assert(ans === 2758514936282235)























