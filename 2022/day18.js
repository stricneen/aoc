const aoc = require('./aoc');
const buffer = aoc.readfile('day18.txt');
const cubes = buffer.split(/\n/).map(x => x.split(',').map(x => parseInt(x)))
p2 = 0

const strCubes = cubes.map(([x, y, z]) => `${x},${y},${z}`)
// console.log(map)
const p1 = aoc.sum(cubes.map(cube => {

    open = 6
    if (strCubes.includes(`${cube[0] + 1},${cube[1]},${cube[2]}`)) open--
    if (strCubes.includes(`${cube[0] + 1},${cube[1]},${cube[2]}`)) open--
    if (strCubes.includes(`${cube[0]},${cube[1] + 1},${cube[2]}`)) open--
    if (strCubes.includes(`${cube[0]},${cube[1] - 1},${cube[2]}`)) open--
    if (strCubes.includes(`${cube[0]},${cube[1]},${cube[2] + 1}`)) open--
    if (strCubes.includes(`${cube[0]},${cube[1]},${cube[2] - 1}`)) open--


    return open

}));


console.log('Part 1 : ', p1); //
console.log('Part 2 : ', p2); //