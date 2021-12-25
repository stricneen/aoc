const aoc = require('./aoc');
const buffer = aoc.readfile('day25.txt');
const text = buffer.split(/\n/).map(x => x.split(''));

const dump = x => {
    for (const l of x) {
        console.log(l.join(''))
    }
    console.log('')
}

const step = (bed, c) => {
    const height = bed.length;
    const width = bed[0].length;
    const next = Array(height).fill(null).map(y => Array(width).fill(null).map(x => '.'));
    let moved = false;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cucumber = bed[y][x];
            const nx = x+1 >= width  ? 0 : (x + 1)
            const moveto = bed[y][nx];
            if (cucumber === '>') {
                if (moveto === '.') {                    
                    next[y][nx] = '>'
                    moved = true;
                } else {
                    next[y][x] = '>'
                }
            }
        }
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cucumber = bed[y][x];
            const ny = y+1 >= height ? 0 : (y + 1)
            const movetobed = bed[ny][x];
            const movetonext = next[ny][x];
            if (cucumber === 'v') {
                if (movetonext === '.' && movetobed !== 'v') {
                    next[ny][x] = 'v'
                    moved = true;
                } else {
                    next[y][x] = 'v'
                }
            }
        }
    }

    // dump(next)

    if (!moved) {
        return c + 1;
    }
    return step(next, c + 1);
}
// dump(text)

const p1 = step(text, 0);
console.log('Part 1 : ', p1);