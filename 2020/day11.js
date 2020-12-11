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

const surrounding1 = (grid, coord) => {

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

// Infinate path generator
const path =  function* (start, vector) {
    let current = start;
    while(true) {
        current = {x: current.x + vector.x, y: current.y + vector.y };
        yield current;
    }
};

const surrounding2 = (grid, coord) => {
    // What can coord see ?
    // What can up see ?
    const vectors = [ {x:-1, y:-1}, {x:-1, y:0},{x:-1, y:1},
                    {x:0, y:-1},               {x:0, y:1},
                    {x:1, y:-1}, {x:1, y:0},{x:1, y:1} ];
    
    return vectors.reduce((a,e) => {
        
        for (let c of path(coord, e)) {

            const scan = vat(grid, c);
            
            // console.log(scan);
            if (scan === undefined) return a;
            if (scan == '#') {
                a.push('#');
                return a;
            }
            if (scan == 'L') {
                a.push('L');
                return a;
            } 
        }
    }, []);              
                
};

const run = (surroundFunc, friends) => {
    var i = 0;
    let loop = grid;
    while (true) {
        let next = '';
        for (let c of allCoords(width, height)) {

            const curr = vat(loop, c);
            const s = surroundFunc(loop, c);
            if (curr == '.') {
                next += '.';
            } else if (curr == 'L' && s.filter(x => x == '#').length == 0) {
                next += '#';
            } else if (curr == '#' && s.filter(x => x == '#').length >= friends) {
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

console.log("Part 1 : ", run(surrounding1, 4));
console.log("Part 2 : ", run(surrounding2, 5));
