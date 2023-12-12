const aoc = require('./aoc');
const buffer = aoc.readfile('day12.txt');
const textraw = buffer.split(/\n/);

const springs = textraw.map(x => {
    l = x.split(' ')
    return { springs: l[0], arrange: l[1].split(',').map(y => parseInt(y)) }
});

function* bin (num) {
    c = 0
    b = aoc.denBin(c)
    while(b.toString().length <= num) {
        yield b.toString().padStart(num,'0')
        b = aoc.denBin(++c)
    }
}

p1 =0
springs.forEach(s => {

    a = s.springs.split('.').filter(x => x.length > 0).join('.')
    console.log(a, s.arrange)

    unknowns = a.split('').filter(x => x === '?').length

    for(x of bin(unknowns)) 
    {
        rep = x.replaceAll(0, '.').replaceAll(1, '#')
        curr = `${a}`
        for (let i = 0; i < x.length; i++) {
            curr = curr.replace('?', rep[i])
            
        }
        
        // console.log(curr)


        spl = curr.split('.').filter(x => x.length>0).map(x => x.length)
        // console.log(spl, s.arrange)
        if (spl.length === s.arrange.length && aoc.eqArr(spl, s.arrange)) 
        {
            p1++
        }

    }
// console.log(unknowns)
    // ??? 
    // .. .#
    // console.log(p1)
// process.exit()
})




// ???.### 1,1,3 - 1 arrangement

// .??..??...?##. 1,1,3 - 4 arrangements
// ?#?#?#?#?#?#?#? 1,3,1,6 - 1 arrangement
// ????.#...#... 4,1,1 - 1 arrangement
// ????.######..#####. 1,6,5 - 4 arrangements
// ?###???????? 3,2,1 - 10 arrangements
// console.log(springs)


console.log('Part 1:', p1); // 
console.log('Part 2:', 0); // 
