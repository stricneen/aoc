const aoc = require('./aoc');
const buffer = aoc.readfile('day12.txt');
const m = buffer.split(/\n/).map(x => x.split(''));
const map = m.map(x => x.map(y => y.charCodeAt(0)))

S = 83
E = 69
console.log(map)
start = []
end = []
paths = []
dists = []

for (let x = 0; x < map.length; x++) {
    dists.push([])
    for (let y = 0; y < map[0].length; y++) {
        const pos = map[x][y];
        dists[x].push(Infinity)
        if (pos === 83) {
            start = [x, y]
            map[x][y] = 97
        }
        if (pos === 69) {
            end = [x, y]
            map[x][y] = 122
        }
    }
}

const surround = ([x, y]) => {
    const up = (map[x - 1] || {})[y] === undefined ? Infinity : (map[x - 1] || {})[y];
    const down = (map[x + 1] || {})[y] === undefined ? Infinity : (map[x + 1] || {})[y];
    const left = (map[x] || {})[y - 1] === undefined ? Infinity : (map[x] || {})[y - 1];
    const right = (map[x] || {})[y + 1] === undefined ? Infinity : (map[x] || {})[y + 1];
    return [up, down, left, right];
}

pos = [[...end]]
dists[end[0]][end[1]] = 0




count = 0
// process.exit()
const p2 = () => {
    while (true) {
        np = []
        for (const [x, y] of pos) {
            const dist = dists[x][y]
            const curr = map[x][y]

            if (curr === 97) {
                return dist
            }

            const s = surround([x, y]);

            if (x > 0 && (curr - s[0] <= 1) && dists[x - 1][y] > dist + 1) {
                dists[x - 1][y] = dist + 1
                np.push([x - 1, y])
            }
            if (x < (dists.length - 1) && (curr - s[1] <= 1) && dists[x + 1][y] > dist + 1) {
                dists[x + 1][y] = dist + 1
                np.push([x + 1, y])
            }
            if ((curr - s[2] <= 1) && dists[x][y - 1] > dist + 1) {
                dists[x][y - 1] = dist + 1
                np.push([x, y - 1])
            }
            if ((curr - s[3] <= 1) && dists[x][y + 1] > dist + 1) {
                dists[x][y + 1] = dist + 1
                np.push([x, y + 1])
            }
        }
        pos = np
        count++
        if (pos.length === 0) break;
    }

}

p2()

console.log(start, end)
console.log('Part 2', p2());

//420
//414