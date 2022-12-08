const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const text = buffer.split(/\n/);
const nums = text.map(x => x.toString().split(''))

const trees = nums.map(x => x.map(y => parseInt(y)))

console.log(trees);

// process.exit()
  // 1539
  // 2286
s = 0;

for (let x = 0; x < trees.length; x++) {
    const element = trees[x];
    
    for (let y = 0; y < element.length; y++) {
        const t = element[y];
   
        
        if (x === 0 || y === 0 || x === trees.length -1 || y === element.length - 1)  {s+=1; continue;}
        
        // console.log(t,x,y)

        // check up
        c = []
        for (let up = y-1; up >=0 ; up--) {
            c.push(trees[x][up])
        }
        // console.log('up',t,c)
        // console.log(Math.max(...c))
        if (t > Math.max(...c)) { s+=1; continue}



// console.log('no')
        // check down
        c = []
        for (let up = y+1; up <=trees.length-1 ; up++) {
            c.push(trees[x][up])
        }
        // console.log('down',t,c)
        if (t > Math.max(...c)) { s+=1; continue}



        // check left
        c = []
        for (let up = x-1; up >=0 ; up--) {
            c.push(trees[up][y])
        }
        // console.log('left', t,c)
        if (t > Math.max(...c)) { s+=1; continue}

        // check right
        c = []
        for (let up = x+1; up <= element.length-1 ; up++) {
            c.push(trees[up][y])
        }
        // console.log('right',t,c)
        if (t > Math.max(...c)) { s+=1; continue}

        // console.log('hidden')
    }

}

// 30373
// 25512
// 65332
// 33549
// 35390

console.log(s)

















p1 = p2 = 0
console.log("Part 1 : ", (p1)) //
console.log("Part 2 : ", (p2)) //
