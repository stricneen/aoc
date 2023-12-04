const aoc = require('./aoc');
const buffer = aoc.readfile('day4.txt');
const textraw = buffer.split(/\n/);
let p1 = 0, p2 = 0;
const cards = new Map();
textraw.forEach(l => {
    const c = l.split(': ');
    // console.log(l)
    const win = c[1].split(' | ')[0].split(' ').map(x => parseInt(x)).filter(x => !isNaN(x));
    const nums = c[1].split(' | ')[1].split(' ').map(x => parseInt(x)).filter(x => !isNaN(x));;
    cards.set(c[0].split(' ')[c[0].split(' ').length -1], [win, nums])
})

// Array.from(cards.keys()).forEach(x => console.log(x))

// process.exit()
// console.log(cards);

const winners = (card) => {
    win = card[0]
    nums = card[1]

    // console.log(win, nums)
    w = 0;

    nums.forEach(n => {
        if (win.includes(n)) {
            w += 1;
        }
    });
    // console.log(w)

    s = 0
    for (let i = 0; i < w; i++) {
         s = s==0 ? 1 : s*2

    }
    return s;
}

const matches = (card) => {
    // console.log(card)
    win = card[0]
    nums = card[1]

    // console.log(win, nums)
    w = 0;

    nums.forEach(n => {
        if (win.includes(n)) {
            w += 1;
        }
    });
    return w;
    // console.log(w)

}

p1 = [...cards.values()].map(v => {
    return winners(v)
})


cc = [...cards.keys()].reduce((a,e)=>{
    c = cards.get(e);
    cc = {}
    cc[e] =1
    a.push(cc)
    return a
}, []);

p2 = 0;
xxxx = 0
crds = cc;

while (crds.length > 0) {

    // console.log(c,crds)
    // if (crds.length === 0) return c;

    xxxx +=1 ;
    const o = crds.shift()
    // console.log(o)
    const num = parseInt(Object.keys(o)[0])
    if (isNaN(num)) {
        // console.log(Object.keys(o)[0])
        // process.exit()
    }

    // console.log(`*${Object.keys(o)[0]}*`)
    const card = cards.get(Object.keys(o)[0]);
    const m = matches(card)
    // console.log(num, m)

    if (m > 0) {
        // get cards number
        for (let i = 1; i <= m; i++) {

            xxx = {}
            xxx[`${num + i}`] = 1

            // console.log(xxx)
            crds.push(xxx)

        }

    }

    // return p2c(crds, c+1)



}







// p2 = p2c(cc, 0)

console.log(xxxx)

// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11




console.log('Part 1: ', aoc.sum(p1));
console.log('Part 2: ', xxxx);