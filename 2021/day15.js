const aoc = require('./aoc');
const buffer = aoc.readfile('day15.txt');
const text = buffer.split(/\n/);
const points = text.map(x => x.split('')).map(y => y.map(z => parseInt(z)));

const path = (points) => {
    const map = points.map(x => x.map(y => 100000));
    map[0][0] = 0;
    const len = points[0].length;
    for (let i = 1; i < len; i++) {
        map[0][i] = map[0][i - 1] + points[0][i];
        map[i][0] = map[i - 1][0] + points[i][0];
    }
    for (let x = 1; x < len; x++) {
        for (let y = 1; y < len; y++) {
            const pos = points[x][y];
            let above = (x > 0 ? map[x - 1][y] : 100000) + pos;
            let left = (y > 0 ? map[x][y - 1] : 100000) + pos;
            const best = Math.min(above, left);
            map[x][y] = best;
        }
    }
    return map;
}

const x = (map, points, change) => {

    const len = map[0].length;
    for (let x = 0; x < len; x++) {
        for (let y = 0; y < len; y++) {

            if (x > 0) {
                const above = map[x-1][y];
                if (map[x][y] + points[x-1][y] < above) 
                {
                    change = true;
                    map[x-1][y] = map[x][y] + points[x-1][y];
                }
            }
            if (y > 0) {
                const above = map[x][y-1];
                if (map[x][y] + points[x][y-1] < above) 
                {
                    change = true;
                    map[x][y-1] = map[x][y] + points[x][y-1];
                }
            }


            if (x < len-1) {
                const above = map[x+1][y];
                if (map[x][y] + points[x+1][y] < above) 
                {
                    change = true;
                    map[x+1][y] = map[x][y] + points[x+1][y];
                }
            }
            if (y < len-1) {
                const above = map[x][y+1];
                if (map[x][y] + points[x][y+1] < above) 
                {
                    change = true;
                    map[x][y+1] = map[x][y] + points[x][y+1];
                }
            }


        }
    }
    if (change) {
        return x(map,points,false);
    }
    return map;
}

console.log('Part 1 : ', path(points)[points.length-1][points.length-1]);

const expand = (points) => {
    const sqr = points.length;
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < sqr; y++) {
            const copy = points[(x * sqr) + y];
            points.push(copy.map(x => x + 1 > 9 ? 1 : (x + 1)))
        }
    }
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < points.length; y++) {
            const copy = points[y].slice(-sqr);
            const ca = copy.map(x => x + 1 > 9 ? 1 : (x + 1));
            points[y] = [...points[y], ...ca];
        }
    }
    return points;
};

const firstpass = path(expand(points));
const f = x(firstpass, points, false);
const p2 = f[f.length-1][f.length-1]

console.log('Part 2 : ', p2);
