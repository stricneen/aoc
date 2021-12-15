const aoc = require('./aoc');
const buffer = aoc.readfile('day15.txt');
const text = buffer.split(/\n/);
const points = text.map(x => x.split('')).map(y => y.map(z => parseInt(z)));

const initMap = (points) => {
    const map = points.map(x => x.map(y => 100000));
    map[0][0] = 0;
    const len = points[0].length;
    for (let i = 1; i < len; i++) {
        map[0][i] = map[0][i - 1] + points[0][i];
        map[i][0] = map[i - 1][0] + points[i][0];
    }
    return map;
}

const shorten = (map, points, change) => {
    const len = map[0].length;
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[0].length; y++) {
            if (x > 0 && map[x][y] + points[x - 1][y] < map[x - 1][y]) {
                change = true;
                map[x - 1][y] = map[x][y] + points[x - 1][y];
            }
            if (y > 0 && map[x][y] + points[x][y - 1] < map[x][y - 1]) {
                change = true;
                map[x][y - 1] = map[x][y] + points[x][y - 1];
            }
            if (x < len - 1 && map[x][y] + points[x + 1][y] < map[x + 1][y]) {
                change = true;
                map[x + 1][y] = map[x][y] + points[x + 1][y];
            }
            if (y < len - 1 && map[x][y] + points[x][y + 1] < map[x][y + 1]) {
                change = true;
                map[x][y + 1] = map[x][y] + points[x][y + 1];
            }
        }
    }
    if (change) {
        return shorten(map, points, false);
    }
    return map[len - 1][len - 1];
}

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

const p1 = shorten(initMap(points), points, false);
console.log('Part 1 : ', p1);

const expanded = expand(points);
const p2 = shorten(initMap(expanded), expand(expanded), false);
console.log('Part 2 : ', p2);
