
const aoc = require('./aoc');
const buffer = aoc.readfile('day23.txt');
const maze = buffer.split(/\n/);


js = (obj) => JSON.stringify(obj)


console.log(maze)

start = [0, maze[0].indexOf('.')]
end = [maze.length - 1, maze[maze.length - 1].indexOf('.')]

// console.log(start, end)
juncs = [start, end]

for (let dx = 0; dx < maze.length; dx++) {
    for (let dy = 0; dy < maze[0].length; dy++) {

        if (maze[dx][dy] === '#') continue

        n = Object.keys(aoc.dirs)
            .map(k => [k, dx + aoc.dirs[k][0], dy + aoc.dirs[k][1]])
            .filter(([d, x, y]) => x >= 0 && y >= 0 && x < maze.length && y < maze[0].length)
            .map(([d, x, y]) => [d, x, y, maze[x][y]])
            .filter(([d, x, y, p]) => p !== '#')


        if (n.length > 2) {
            juncs.push([dx, dy])
            // console.log(n)
        }
    }
}

console.log(juncs, juncs.length)

x = {
    '0,1': {
        '22,21': 4
    }
}

dists = {}
for ([x, y] of juncs) {

    key = js([x, y])
    dists[key] = {}
    q = [[[x, y], 0]]

    seen = [key]

    while (q.length) {

        [[x, y], v] = q.shift()

        n = Object.keys(aoc.dirs)
            .map(k => [k, x + aoc.dirs[k][0], y + aoc.dirs[k][1]])
            .filter(([d, x, y]) => x >= 0 && y >= 0 && x < maze.length && y < maze[0].length)
            .map(([d, x, y]) => [d, x, y, maze[x][y]])
            .filter(([d, x, y, p]) => p !== '#') //p === '.' || aoc.eqArr([d, p], ['D', 'v']) || aoc.eqArr([d, p], ['U', '^']) || aoc.eqArr([d, p], ['L', '<']) || aoc.eqArr([d, p], ['R', '>']))
        //    .filter(([d, x, y, p]) => p === '.' || aoc.eqArr([d, p], ['D', 'v']) || aoc.eqArr([d, p], ['U', '^']) || aoc.eqArr([d, p], ['L', '<']) || aoc.eqArr([d, p], ['R', '>']))

        // console.log(n)

        n.forEach(([_, nx, ny, __]) => {

            k = js([nx, ny])

            if (!seen.includes(k)) {


                // is it a junc ?
                j = juncs.find((p) => aoc.eqArr(p, [nx, ny]))
                if (j) {
                    // console.log(j)
                    dists[key] = { ...dists[key], [js(j)]: v + 1 }
                } else {
                    q.push([[nx, ny], v + 1])

                }
                seen.push(k)

            }
        })
    }

}
console.log(dists)

// q = [[js(start), 0, []]]
// //2661
// p1 = 0

// while (q.length) {


//     [node, distance, seen] = q.shift()
//     if (seen.includes(node)) continue
//     // console.log([node, distance,seen])
//     routes = dists[node]
//     // console.log('>', routes)

//     Object.keys(routes).forEach(k => {



//         q.push([k, distance + routes[k], [...seen, node]])
//         p1 = Math.max(p1, distance)
//     })

//     // console.log(q.length)
// }

seen = new Set()
dfs = (pt) => {

    if (pt === js(end)) return 0

    m = Number.MIN_SAFE_INTEGER

    seen.add(pt)
    // console.log(dists[pt])
    Object.keys(dists[pt]).forEach(k => {
        if (!seen.has(k)) {
            m = Math.max(m, dfs(k) + dists[pt][k])
        }
    })
    seen.delete(pt)
    return m
}





p1 = dfs(js(start))
p2 = 0
console.log()
console.log('Part 1:', p1); // 
console.log('Part 2:', p2); // 
