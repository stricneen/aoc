const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const text = buffer.split(/\n/);
const ops = text.map(m => {
    const on = m.split(' ');
    let r = {on: on[0] === 'on', coords: []};
    const coords = on[1].split(',');
    for (const i of coords) {
        const c = i.substring(2,i.length).split('..');
        r.coords.push([Math.min(parseInt(c[0]),parseInt(c[1])), Math.max(parseInt(c[0]),parseInt(c[1]))])
    }


    return r;
});

const pj = (m) => console.dir(m, { depth: null, colors: true }, 2);

// on x=-54112..-39298,y=-85059..-49293,z=-27449..7877
// on x=967..23432,y=45373..81175,z=27513..53682

//   { on: true, coords: [ [ -41, 9 ], [ -7, 43 ], [ -33, 15 ] ] }

const init = ops.reduce((a,e) => {

//        coords: [ [ -54112, -39298 ], [ -85059, -49293 ], [ -27449, 7877 ] ]
 //       coords: [ [ 967, 23432 ], [ 45373, 81175 ], [ 27513, 53682 ] ]
    

}, [])


const map = new Map();
for (const inst of ops) {
    console.log(inst)
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
    console.log(map.size)
}

pj(ops);

console.log(map.size);
// off x=-21553..-6096,y=52051..71487,z=-60241..-44696
// on x=2119..38578,y=-55284..-16851,z=-81488..-48856