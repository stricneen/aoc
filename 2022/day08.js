const aoc = require('./aoc');
const buffer = aoc.readfile('day08.txt');
const text = buffer.split(/\n/);
const nums = text.map(x => x.toString().split(''))

const trees = nums.map(x => x.map(y => parseInt(y)))

let p1 = 0
let p2 = 0 

for (let x = 0; x < trees.length; x++) {
    const element = trees[x];
    for (let y = 0; y < element.length; y++) {

        // ignore the edges
        if (x === 0 || y === 0 || x === trees.length -1 || y === element.length - 1)  {p1+=1; continue;}

        const tree = element[y];
           
        up = aoc.ia_up(x,y,trees).slice(1);
        down = aoc.ia_down(x,y,trees).slice(1);
        left = aoc.ia_left(x,y,trees).slice(1);
        right = aoc.ia_right(x,y,trees).slice(1);
        
        const vis = [up, down, left, right]
            .map(d => tree > Math.max(...d));
        if (vis.some(x => x)) p1 += 1;

        const scenic = [up, down, left, right]
            .map(d => {
                bigger = d.findIndex(t => t >= tree)
                return bigger === -1 ? d.length : bigger + 1 
            })
        p2 = Math.max(p2, aoc.product(scenic))
    }
}

console.log("Part 1 : ", (p1)) // 1715
console.log("Part 2 : ", (p2)) // 374400
