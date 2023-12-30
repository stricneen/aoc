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

p1 = elements.reduce((a, e) => {
    r = flow(e)
    if (r === 'A') {
        a += e.x + e.m + e.a + e.s
    }
    return a;
}, 0)


initState = { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] }
q = [['in', initState]]
p2 = 0
while (q.length) {

    let [wf, state] = q.shift();

    if (wf === 'R') continue

    if (wf === 'A') {
        p2a = 1
        for (key of Object.keys(state)) {
            p2a *= state[key][1] - state[key][0] + 1
        }
        p2 += p2a
        continue
    }

    // in{ s<1351:px , qqz }

    w = workflows.get(wf);
    if (!w) throw `no wf - ${w}`

    for (t of w) {
        if (t === 'R') break
        // console.log()
        // console.log(wf ,t, state)

        xmas = t[0]
        op = t[1]
        num = parseInt(t.substring(2, t.indexOf(':')))
        wf = t.substring(t.indexOf(':') + 1)

        if (t.indexOf(':') === -1) {
            q.push([t, state])
        } else {

            let [low, high] = state[xmas]
            nStateT = { ...state }
            nStateF = { ...state }

            if (op === '<') {
                nStateT[xmas] = [low, num - 1]
                nStateF[xmas] = [num, high]
                q.push([wf, nStateT])
                state = nStateF
            } else if (op === '>') {
                nStateT[xmas] = [num + 1, high]
                nStateF[xmas] = [low, num]
                q.push([wf, nStateT])
                state = nStateF
            }

            // console.log('>> nStateT', nStateT)
            // console.log('>> nStateF', nStateF)
            
        }
    }
    // console.log(q.lengthr)
}


console.log('Part 1:', p1); // 287054
console.log('Part 2:', p2); // 131619440296497
