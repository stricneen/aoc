const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
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

flow = (part, workflow = 'in') => {

    if (workflow === 'A') return 'A'
    if (workflow === 'R') return 'R'

    w = workflows.get(workflow);
    if (!w) throw 'no wf'

    for (let i = 0; i < w.length; i++) {
        const cond = w[i];

        if (cond === 'A') return 'A'
        if (cond === 'R') return 'R'

        if (!cond.includes(':')) return flow(part, cond)

        if (cond.includes(':')) {
            p = cond.split(':')
            if (p[0].includes('<')) {
                pp = p[0].split('<')
                if (part[pp[0]] < parseInt(pp[1])) {
                    return flow(part, p[1])
                } else { continue }
            }
            if (p[0].includes('>')) {
                pp = p[0].split('>')
                if (part[pp[0]] > parseInt(pp[1])) {
                    return flow(part, p[1])
                } else { continue }
            }
        }
    }
}

// c = []
p2 = 0
for (let i = 1; i <= 4000; i++) {
    console.log('i', i, p2)
    for (let j = 1; j <= 4000; j++) {
        console.log('j', j)
        for (let l = 1; l <= 4000; l++) {
            for (let m = 1; m <= 4000; m++) { 
                e = { x: i, m:j, a:l, s:m}
                if (flow(e) === 'A') {
p2 += 1
                }
            }
        }
    }
}
    // c.push(flow(e))
// }
// console.log(c.join(''))


p1 = elements.reduce((a, e) => {
    r = flow(e)
    if (r === 'A') {
        a += e.x + e.m + e.a + e.s
    }
    return a;
}, 0)


// p2 = 0
console.log()
console.log('Part 1:', p1); // 287054
console.log('Part 2:', p2); // 
