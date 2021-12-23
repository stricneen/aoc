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

const p1 = (ops) => {

    for (const op of ops) {
        aoc.pj(ops)
        
    }

}

console.log('Part 1 : (old)', p1_old(initialization(ops)));
console.log('Part 1 : (new)', p1(initialization(ops)));





















const bounds = ops.reduce((a, e) => {
    if (a.length === 0) {
        return e.coords;
    }
    return [
        [Math.min(e.coords[0][0], a[0][0]), Math.max(e.coords[0][1], a[0][1])],
        [Math.min(e.coords[1][0], a[1][0]), Math.max(e.coords[1][1], a[1][1])],
        [Math.min(e.coords[2][0], a[2][0]), Math.max(e.coords[2][1], a[2][1])],
    ];
}, []);

// console.log(bounds)



