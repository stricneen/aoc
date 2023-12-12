const aoc = require('./aoc');
const buffer = aoc.readfile('day12.txt');
const textraw = buffer.split(/\n/);

 springs = textraw.map(x => {
    l = x.split(' ')
    return { springs: l[0], arrange: l[1].split(',').map(y => parseInt(y)) }
});

springs = [springs[1]]

function* bin(num) {
    c = 0
    b = aoc.denBin(c)
    while (b.toString().length <= num) {
        yield b.toString().padStart(num, '0')
        b = aoc.denBin(++c)
    }
}

p1 = 0
p1a = []
// springs.forEach(s => {
//     n =[]

//     // s = {springs: `${ss.springs}?${ss.springs}?${ss.springs}?${ss.springs}?${ss.springs}`, arrange:n}
//     // for (let i = 0; i < 5; i++) {
//     //    n = n.concat(ss.arrange)
//     // }

//     a = s.springs.split('.').filter(x => x.length > 0).join('.')

//     console.log(a, s.arrange)

//     unknowns = a.split('').filter(x => x === '?').length

//     for(x of bin(unknowns)) 
//     {
//         rep = x.replaceAll(0, '.').replaceAll(1, '#')
//         curr = `${a}`
//         for (let i = 0; i < x.length; i++) {
//             curr = curr.replace('?', rep[i])

//         }

//         // console.log(curr)


//         spl = curr.split('.').filter(x => x.length>0).map(x => x.length)
//         // console.log(spl, s.arrange)
//         if (spl.length === s.arrange.length && aoc.eqArr(spl, s.arrange)) 
//         {
//             p1++
//         }

//     }
// // console.log(unknowns)
//     // ??? 
//     // .. .#
//     console.log(p1)
// // process.exit()
// })




// ???.### 1,1,3 - 1 arrangement

// .??..??...?##. 1,1,3 - 4 arrangements
// ?#?#?#?#?#?#?#? 1,3,1,6 - 1 arrangement
// ????.#...#... 4,1,1 - 1 arrangement
// ????.######..#####. 1,6,5 - 4 arrangements
// ?###???????? 3,2,1 - 10 arrangements
// console.log(springs)

springs.forEach(ss => {

    n = []
    for (let i = 0; i < 5; i++) {
        n = n.concat(ss.arrange)
     }
     s = {springs: `${ss.springs}?${ss.springs}?${ss.springs}?${ss.springs}?${ss.springs}`, arrange:n}

    console.log(s)

    if (s.springs[0] === '.') {
        opts = [[0, '.']]
    }
    if (s.springs[0] === '?') {
        opts = [[0, '.'], [0, '#']]
    }
    if (s.springs[0] === '#') {
        opts = [[0, '#']]
    }
    // console.log(opts)
    // char = 0


    for (let i = 1; i < s.springs.length; i++) {
        sp = s.springs.substring(i, i + 1)
        // console.log('>', sp)

        nopts = opts.reduce((a, e) => {
            // console.log(sp)

            if (sp === '.') a.push([e[0] + 1, `${e[1]}.`])
            if (sp === '#') a.push([e[0] + 1, `${e[1]}#`])
            if (sp === '?') {
                a.push([e[0] + 1, `${e[1]}#`])
                a.push([e[0] + 1, `${e[1]}.`])
            }


            return a;
        }, [])

        console.log(nopts); console.log()

        // remove impossible
        nopts = nopts.filter(([n, c]) => {
            ccc = c.substring(0, c.lastIndexOf('.'))
            cc = ccc.split('.').filter(x => x.length > 0).map(x => x.length)

            
            c4 = c.split('.').filter(x => x.length > 0).map(x => x.length)
            // console.log(c4)
            for (let i = 0; i < c4.length; i++) {
                if (c4[i] >  s.arrange[i]) return false;
            }
            
            if (cc.length === 0) return true;
            for (let i = 0; i < cc.length; i++) {
                if (cc[i] !==  s.arrange[i]) return false;
            }



            return true;
        })
        console.log(nopts); console.log()
        opts = nopts
    }

    opts = opts.filter(([n, c]) => {
        cc = c.split('.').filter(x => x.length > 0).map(x => x.length)

        // console.log(cc, s.arrange, aoc.eqArr(cc, s.arrange))
       
        return aoc.eqArr(cc, s.arrange)
    })
    p1 += opts.length

    p1a.push(opts.length)


    // console.log(); console.log()
    // process.exit()
})

console.log(p1a)

console.log('Part 1:', p1); // 6852
console.log('Part 2:', 0); // 
