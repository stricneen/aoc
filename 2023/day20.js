const aoc = require('./aoc');
const buffer = aoc.readfile('day20.txt');
const raw = buffer.split(/\n/);

const net = new Map()

net.set('output', [(s, d, p) => console.log('output > ', p), []])
net.set('rx', [(s, d, p) => console.log('rx > ', p), []])

const flipFlop = () => {
    let state = 0;
    const pulse = (source, dest, pulse) => {
        let r
        if (pulse === 0) {
            r = state === 0 ? 1 : 0;
            state = r
        }
        return r
    }
    return pulse
}

const conjunction = (inps) => {

    const inputs = {}
    inps.forEach(x => inputs[x.replace('%', '').replace('&', '')] = 0)

    const pulse = (source, dest, pulse) => {
        c = inputs[source]
        inputs[source] = pulse
        r = 0
        Object.keys(inputs).forEach(k => {
            if (inputs[k] === 0) r = 1
        })
        return r
    }
    return pulse
}

incoming = {}
raw.forEach(l => {
    let [a, b] = l.split(' -> ')
    dests = b.split(', ')
    dests.forEach(d => {
        incoming[d] = [...incoming[d] || [], a]
    })
})

raw.forEach(l => {
    let [a, b] = l.split(' -> ')
    console.log('> ', a, b)
    dests = b.split(', ')

    if (a.startsWith('%')) {
        net.set(a.substring(1), [flipFlop(), dests])
    } else if (a.startsWith('&')) {
        net.set(a.substring(1), [conjunction(incoming[a.substring(1)]), dests])
    } else {
        net.set(a, dests)
    }

})



console.log(incoming)


console.log(net)

const button = () => {
    
    q = net.get('broadcaster').map(x => ['broadcaster', x, 0])
    high = 0
    low = 1

    console.log()

// tl 876979246
//    876979246

    while (q.length) {
    
        console.log(q[0])
    
        let [source, dest, pulse] = q.shift()

        high += pulse === 1 ? 1 : 0
        low += pulse === 0 ? 1 : 0

        let [comp, connections] = net.get(dest)
        output = comp(source, dest, pulse)
    
        // console.log(output,source, dest, pulse)
    
        if (output !== undefined) {
            connections.forEach(c => {
                q.push([dest, c, output])
            })
        }
    }
    return [low,high]
}

l=0
h=0
for (let i = 0; i < 1000; i++) {
    [dl, dh] = button()
    l += dl
    h += dh
}


console.log(l,h, l * h)

p1 = p2 = 0
console.log()
console.log('Part 1:', p1); // 287054
console.log('Part 2:', p2); // 
