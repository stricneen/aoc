const aoc = require('./aoc');
const buffer = aoc.readfile('day19.txt');
const textraw = buffer.split(/\n/);

const workflows = new Map()
const elements = []
textraw.forEach(e => {
    if (e.startsWith('{')) {
        elements.push(JSON.parse(e.replaceAll('=', ':').replaceAll('{', '{"').replaceAll(':', '":').replaceAll(',', ',"')))
    }
    else {
        key = e.substring(0, e.indexOf('{'))
        vals = e.substring(e.indexOf('{') + 1, e.indexOf('}')).split(',')
        workflows.set(key, vals)
    }
});

// console.log(elements)

flow = (part, workflow) => {

    if (workflow === 'A') return 'A'
    if (workflow === 'R') return 'R'

    w = workflows.get(workflow);
    // console.log(part, workflow, w)
    // console.log(w)
    if (!w) throw 'no wf'


    for (let i = 0; i < w.length; i++) {
        const cond = w[i];

        if (cond === 'A') return 'A'
        if (cond === 'R') return 'R'

        if (!cond.includes(':')) return flow(part, cond)

        if (cond.includes(':')) {
            p = cond.split(':')
            // console.log(p[1])
            if (p[0].includes('<')) {
                pp = p[0].split('<')
                // console.log(part[pp[0]] ,  parseInt(pp[1]) )
                if (part[pp[0]] < parseInt(pp[1])) {
                    return flow(part, p[1])
                } else {
                    continue
                }
            }
            if (p[0].includes('>')) {
                pp = p[0].split('>')
                if (part[pp[0]] > parseInt(pp[1])) { return flow(part, p[1]) 
                } else { continue }
            }


           

        }

    }


}

p = elements.reduce((a, e) => {

    r = flow(e, 'in')
    console.log(r)
    if (r === 'A') {
        a += e.x + e.m + e.a + e.s
    }

    return a;
}, 0)

// s{s>3448:A,lnx}
// qkq{x<1416:A,crn}
// crn{x>2662:A,R}
// in{s<1351:px,qqz}
// qqz{s>2770:qs,m<1801:hdj,R}
// gd{a>3333:R,R}
// hdj{m>838:A,pv}

// aoc.printGrid(textraw)
p1 = 0
p2 = 0
console.log()
console.log('Part 1:', p); // 
console.log('Part 2:', p2); // 
