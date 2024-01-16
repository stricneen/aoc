const aoc = require('./aoc');
const buffer = aoc.readfile('day20.txt');
const raw = buffer.split(/\n/);
const net = new Map()

net.set('output', [(s, d, p) => console.log('output > ', p), []])
// net.set('rx', [(s, d, p) => console.log('rx > ', p), []])
net.set('rx', [(s, d, p) => {}, []])


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
    // console.log('> ', a, b)
    dests = b.split(', ')

    if (a.startsWith('%')) {
        net.set(a.substring(1), [flipFlop(), dests])
    } else if (a.startsWith('&')) {
        net.set(a.substring(1), [conjunction(incoming[a.substring(1)]), dests])
    } else {
        net.set(a, dests)
    }

})

// console.log(incoming)
// console.log(net)

feed = Array.from(net.entries()).find(([n,[_,x]]) => aoc.eqArr(x, ['rx']))[0]
cycles_names = Array.from(net.entries()).filter(([n,[_,x]]) => aoc.eqArr(x, [feed])).map(([x,_]) => x)
cycles = Object.fromEntries(cycles_names.map(x => [x,0]))
seen = {...cycles}
// console.log(feed)
// console.log(cycles)

presses = 0

const button = () => {
    
    q = net.get('broadcaster').map(x => ['broadcaster', x, 0])
    high = 0
    low = 1

    presses += 1
    while (q.length) {
    
        let [source, dest, pulse] = q.shift()

        if (dest === feed) {

            if (cycles_names.includes(source) && pulse === 1) {
                
                // cycles_names = cycles_names.filter(z => z !== dest)
                if (cycles[source] === 0) {
                    cycles[source] = presses
                }
                seen[source] += 1

            }
        }
            
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

    // console.log(seen)
    if (Array.from(Object.values(seen)).every(x=> x>3)) {
        return [-1,-1]
    }
    // if (cycles_names.length === 0) {
    //     return [-1,-1]
    // }

    return [low,high]
}

l=0
h=0
for (let i = 0; i < 1000; i++) {
    [dl, dh] = button()
    l += dl
    h += dh
}

// // console.log(l,h, l * h)
// console.log('Part 1:', l * h); // 980457412




while (true) {
    [dl, dh] = button()
    if (dl === -1 && dh === -1) {
        // console.log(dl,dh)
        // console.log(cycles)
        break
    }
}


console.log('Part 1:', l * h); // 980457412
console.log('Part 2:', aoc.lcm([...Object.values(cycles)])); // 232774988886497
