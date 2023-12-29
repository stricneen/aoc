const aoc = require('../aoc');
const buffer = aoc.readfile('day18.txt');
const textraw = buffer.split(/\n/);

const shoeLace = (a) => {
    x = 0
    y = 0
    for (let i = 0; i < a.length - 1; i++) {
        x += a[i][0] * a[i + 1][1]
        y += a[i][1] * a[i + 1][0]
    }
    return Math.abs(x - y) * 0.5
}

const p1 = () => {
    const v = [[0, 0]]
    b = 0
    textraw.forEach(l => {
        t = l.split(' ')
        d = parseInt(t[1])
        b += d
        let [x, y] = v[v.length - 1]
        let [dx, dy] = aoc.dirs[t[0]]
        v.push([x + dx * d, y + dy * d])
    })
    A = shoeLace(v)
    i = A - (b / 2) + 1
    return i + b
}


const p2 = () => {
    const v = [[0, 0]]
    b = 0
    textraw.forEach(l => {
        t = l.split(' ')
        d = parseInt(t[2].substring(2,7),16)
        b += d
        let [x, y] = v[v.length - 1]
        let [dx, dy] = aoc.dirs[Object.keys(aoc.dirs)[t[2].substring(7,8)]]
        v.push([x + dx * d, y + dy * d])
    })
    A = shoeLace(v)
    i = A - (b / 2) + 1
    return i + b
}


// console.log(shoeLace([[1,6],[-4,3],[-5,-3],[3,-1],[1,6]])) // 43.5
// console.log(shoeLace([[3,4],[1,1],[4,1],[3,4]])) // 4.5
// console.log(shoeLace([[-2,4],[-2,1],[3,-3],[4,4],[-2,4]])) // 28.5
// console.log(A, b, i)

console.log('Part 1:', p1()); // 48652
console.log('Part 2:', p2()); // 45757884535661
