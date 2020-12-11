const aoc = require('./aoc');
const buffer = aoc.readfile('day11.txt');
const text = buffer.split(/\n/);

const grid = text.reduce((a,e) => {
    a.push(e);
    return a;
}, []);

const width = grid[0].length;
const height = grid.length;

// console.log(grid);


const allCoords = function* (x,y) {
    for(var dy = 0; dy < y; dy++)
        for(var dx = 0; dx <  x; dx++)
            yield {x: dx, y: dy};
  };

const stringToGrid = (s,w,h) => {
    return aoc.range(0, h).reduce((a,e) => {
        a.push(s.substr(e * w, w));
        return a;
    },[]);
};

const gridToString = (g) => g.reduce((a,c) => a + c,'');

const vat = (grid, coord) => {
     return grid[coord.y]?.[coord.x];
}

const surrounding = (grid, coord) => {

    const s = [
        grid[coord.y - 1]?.[coord.x -1],
        grid[coord.y]?.[coord.x -1],
        grid[coord.y + 1]?.[coord.x -1],
    
        grid[coord.y - 1]?.[coord.x],
        grid[coord.y + 1]?.[coord.x],

        grid[coord.y - 1]?.[coord.x +1],
        grid[coord.y]?.[coord.x +1],
        grid[coord.y + 1]?.[coord.x +1],
    ].filter(x => !!x);

    return s;
};

const part1 = () => {
    var i = 0;
    let loop = grid;
    while (true) {
        let next = '';
        for (let c of allCoords(width, height)) {

            const curr = vat(loop, c);
            const s = surrounding(loop, c);
            if (curr == '.') {
                next += '.';
            } else if (curr == 'L' && s.filter(x => x == '#').length == 0) {
                next += '#';
            } else if (curr == '#' && s.filter(x => x == '#').length >= 4) {
                next += 'L';
            } else {
                next += curr;
            }
        }

        if (gridToString(loop) == next) {
            return next.split('').filter(x => x == '#').length;
        }
        
        loop = stringToGrid(next, width, height);
    }
};

console.log("Part 1 : ", part1());