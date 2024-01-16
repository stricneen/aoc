const aoc = require('./aoc');
const buffer = aoc.readfile('day25.txt');
const textraw = buffer.split(/\n/);

connections = []
n = new Set()
comps = textraw.forEach(x => {
    t = x.split(': ')
    r = t[1].split(' ')
    for (let i = 0; i < r.length; i++) {
        n.add(t[0])
        n.add(r[i])
        connections.push([t[0], r[i]])
    }
})
nodes = [...n]

const bfs = (source, dest) => {
    q = [[source]]
    while (q.length) {
        route = q.shift();

        current = route[route.length - 1]

        conns1 = connections.filter(([x, y]) => x === current).map(([x, y]) => y)
        conns2 = connections.filter(([x, y]) => y === current).map(([x, y]) => x)
        conns = conns1.concat(conns2);
        newConns = conns.filter(x => !route.includes(x))

        for (let i = 0; i < newConns.length; i++) {
            const nxt = newConns[i]
            if (nxt === dest) return [...route, nxt]
            q.push([...route, nxt])
        }
    }
}

const bfsa = (source, dest) => {
    q = [[source]]
    while (q.length) {
        route = q.shift();

        current = route[route.length - 1]

        conns1 = connections.filter(([x, y]) => x === current).map(([x, y]) => y)
        conns2 = connections.filter(([x, y]) => y === current).map(([x, y]) => x)
        conns = conns1.concat(conns2);
        newConns = conns.filter(x => !route.includes(x))

        for (let i = 0; i < newConns.length; i++) {
            const nxt = newConns[i]
            if (nxt === dest) return [...route, nxt]
            q.push([...route, nxt])
        }
    }
}

// console.log('>>>>', bfs('bvb', 'hfx'))
// console.log('>>>>', bfs('lsr', 'xhk'))
// console.log(bfs('hfx','bvb'))

console.log('nodes',nodes)
console.log('connections',connections)


keys =  Object.fromEntries(
        connections.map((x) => {
            x.sort(function(a,b){
                return a.localeCompare(b);
            })
            return  [`${x[0]}-${x[1]}`, 0]
        }
        
       )
      )
    console.log(keys)
// const a = Object.fromEntries(
//     nodes.map(year => [year, 0])
//   )
// console.log(obj)


// a = {}
// for (let i = 0; i < nodes.length; i++) {
//     for (let j = i + 1; j < nodes.length; j++) {

//         p =  bfs(nodes[i], nodes[j])

//         for (let k = 0; k < p.length -1; k++) {
//            key = JSON.stringify([p[k],p[k+1]].sort((a,b) => a-b))
//             console.log(key)
//         }

//         // console.log('>>>>', bfs(nodes[i], nodes[j]))
//     }
// }

// hfx/pzl,
// bvb/cmg,     and the wire between 
// nvd/jqt     , you will divide the components into two separate, disconnected groups:

p1 = 0
p2 = 0
console.log()
console.log('Part 1:', p1); // 
console.log('Part 2:', p2); // 
