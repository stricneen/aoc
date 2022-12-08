const aoc = require('./aoc');
const buffer = aoc.readfile('day08.txt');
const text = buffer.split(/\n/);
const nums = text.map(x => x.toString().split(''))

const trees = nums.map(x => x.map(y => parseInt(y)))

console.log(trees);

// process.exit()
  // 1539
  // 2286
s = 0;
max =0 

const f = (t, a) => {
    s = 0

    p = a.findIndex(x => t <= x)
    if (p === -1) {s= a.length} else {s = p+1}
    // for (let i = 0; i < a.length; i++) {
    //     if (t <= a[i]) return s
    //     s++
        
    // }
console.log(s)
    return s
}

for (let x = 0; x < trees.length; x++) {
    const element = trees[x];
    
    for (let y = 0; y < element.length; y++) {
        curr = []
        console.log()
        const t = element[y];
   
        
        if (x === 0 || y === 0 || x === trees.length -1 || y === element.length - 1)  {s+=1; continue;}
        
        // console.log(t,x,y)

        // check up
        c = []
        for (let up = y-1; up >=0 ; up--) {
            c.push(trees[x][up])
        }
        curr.push( f(t,c))
        console.log('up',t,c)
        console.log(curr)
        // console.log(Math.max(...c))
        //if (t > Math.max(...c)) { s+=1; continue}



// console.log('no')
        // check down
        c = []
        for (let up = y+1; up <=trees.length-1 ; up++) {
            c.push(trees[x][up])
        }
        console.log('down',t,c)
        
        curr.push( f(t,c))


     
        // if (t > Math.max(...c)) { s+=1; continue}


        // check left
        c = []
        for (let up = x-1; up >=0 ; up--) {
            c.push(trees[up][y])
        }
        console.log('left', t,c)
        curr.push( f(t,c))


        // if (t > Math.max(...c)) { s+=1; continue}

        // check right
        c = []
        for (let up = x+1; up <= element.length-1 ; up++) {
            c.push(trees[up][y])
        }
        console.log('right',t,c)
        // if (t > Math.max(...c)) { s+=1; continue}
        curr.push( f(t,c))


        // console.log('hidden')
        console.log('curr',curr)
        if (aoc.product(curr) > max) max= aoc.product(curr)
    }


}

// 30373
// 25512
// 65332
// 33549
// 35390

// console.log(s)
console.log(max)
















p1 = p2 = 0
console.log("Part 1 : ", (p1)) // 1715
console.log("Part 2 : ", (p2)) // 374400
