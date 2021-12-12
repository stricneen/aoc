const aoc = require('./aoc');
const buffer = aoc.readfile('day11.txt');
const text = buffer.split(/\n/);
const octos = text.map(x => x.split('')).map(y => y.map(z => parseInt(z)));

const inc = (arr, x, y) => {
  if (x >= 0 && x < arr.length && y >= 0 && y < arr[x].length) 
    arr[x][y] = arr[x][y] + 1;
}

const flash = (flashed, newflash, c) => {
  const toflash = [];
  for (let x = 0; x < flashed.length; x++) {
    for (let y = 0; y < flashed[x].length; y++) {
      if (flashed[x][y] > 9) {
        flashed[x][y] = -10000;
        toflash.push(`${x}_${y}`);
        newflash = true;
      }
    }
  }

  for (let x = 0; x < flashed.length; x++) {
    for (let y = 0; y < flashed[x].length; y++) {
      if (toflash.includes(`${x}_${y}`)) {
        inc(flashed, x-1, y-1);
        inc(flashed, x,   y-1);
        inc(flashed, x+1, y-1);
        inc(flashed, x-1, y);
        inc(flashed, x,   y);
        inc(flashed, x+1, y);
        inc(flashed, x-1, y+1);
        inc(flashed, x,   y+1);
        inc(flashed, x+1, y+1);
      }
    }
  }

  if (newflash) return flash(flashed, false);
  return flashed;
}

const tick = (octos, count, flashes) => {
  if (count === 100) console.log('Part 1 : ', flashes)
  if (octos.every(x=> x.every(x => x === 0))) return count;

  const inc = octos.map(x => x.map(y => y + 1));
  const flashed = flash(inc, false, 3);

  for (let x = 0; x < flashed.length; x++) {
    for (let y = 0; y < flashed[x].length; y++) {
      if (flashed[x][y] < 0) {
        flashed[x][y] = 0;
        flashes += 1;
      }
    }
  }
  return tick(flashed, count + 1, flashes);
};

const p2 = tick(octos, 0, 0);
console.log('Part 2 : ', p2);