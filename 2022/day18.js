const aoc = require('./aoc');
const buffer = aoc.readfile('day18.txt');
const cubes = buffer.split(/\n/).map(x => x.split(',').map(x => parseInt(x)))
p2 = 0

const coordToString = ([x, y, z]) => `${x},${y},${z}`

const strCubes = cubes.map(coordToString)

const opensides = (cubes) => {
    const strs = cubes.map(coordToString);
    return aoc.sum(cubes.map(cube => {
        open = 6
        if (strs.includes(`${cube[0] + 1},${cube[1]},${cube[2]}`)) open--
        if (strs.includes(`${cube[0] + 1},${cube[1]},${cube[2]}`)) open--
        if (strs.includes(`${cube[0]},${cube[1] + 1},${cube[2]}`)) open--
        if (strs.includes(`${cube[0]},${cube[1] - 1},${cube[2]}`)) open--
        if (strs.includes(`${cube[0]},${cube[1]},${cube[2] + 1}`)) open--
        if (strs.includes(`${cube[0]},${cube[1]},${cube[2] - 1}`)) open--
        return open
    }));
}



p1 = opensides(cubes);

const bounds = cubes.reduce((a, [x, y, z]) =>
    [
        Math.min(x, a[0]), Math.max(x, a[1]),
        Math.min(y, a[2]), Math.max(y, a[3]),
        Math.min(z, a[4]), Math.max(z, a[5]),
    ], [Infinity, 0, Infinity, 0, Infinity, 0]);

const out = []
const outside = (check) => {
    next = []
    for (const [x, y, z] of check) {
        const toCheck = [
            [x + 1, y, z], [x - 1, y, z],
            [x, y + 1, z], [x, y - 1, z],
            [x, y, z + 1], [x, y, z - 1],
        ]

        for (const [x, y, z] of toCheck) {
            if (!strCubes.includes(coordToString( [x, y, z]))) { // not lava
                if (!out.includes(coordToString( [x, y, z]))) { // not checked                    
                    if (x >= bounds[0] && x <= bounds[1] && y >= bounds[2] && y <= bounds[3] && z >= bounds[4] && z <= bounds[5]) {
                        out.push(coordToString([x, y, z]))
                        next.push([x, y, z])
                    }
                }
            }
        }
    }
    if (next.length > 0)  outside(next)
}
outside([[1,1,1]])

const internalAir = []
for (let x = bounds[0] + 1; x < bounds[1]; x++) {
    for (let y = bounds[2] + 1; y < bounds[3]; y++) {
        for (let z = bounds[4] + 1 ; z < bounds[5]; z++) {
            if (!strCubes.includes(coordToString( [x, y, z])) && !out.includes(coordToString( [x, y, z])))
            {
                internalAir.push([x,y,z])
            }
        }
    }
}

const inside = opensides(internalAir)

console.log('Part 1 : ', p1); // 4332
console.log('Part 2 : ', p1 - inside); //