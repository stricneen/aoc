const aoc = require('./aoc');
const buffer = aoc.readfile('day11.txt');
const text = buffer.split(/\n/);

const x = text.map(x => x.split(''));
const octos = x.map(y => y.map(z => parseInt(z)));



const flash = (flashed, newflash, c) => {
  //c=c-1; 
  //if (c=== 0) return flashed
 // console.log('bf', flashed)

  const toflash = []
  for (let x = 0; x < flashed.length; x++) {
    for (let y = 0; y < flashed[x].length; y++) {
      if (flashed[x][y] > 9) {
        flashed[x][y] = -10000;
        toflash.push(`${x}_${y}`);
        newflash = true;
      }
    }
  }
// console.log(toflash)

  for (let x = 0; x < flashed.length; x++) {
    for (let y = 0; y < flashed[x].length; y++) {
      if (toflash.includes(`${x}_${y}`)) {


        //flashed[x][y] === 11;

        if (x > 0 && y > 0) { flashed[x - 1][y - 1] = flashed[x - 1][y - 1] + 1; }
        if (y > 0) { flashed[x][y - 1] = flashed[x][y - 1] + 1; }
        if (x < flashed.length - 1 && y > 0) { flashed[x + 1][y - 1] = flashed[x + 1][y - 1] + 1; }

        if (x > 0) { flashed[x - 1][y] = flashed[x - 1][y] + 1; }
        flashed[x][y] = flashed[x][y] + 1;
        if (x < flashed.length - 1) { flashed[x + 1][y] = flashed[x + 1][y] + 1; }

        if (x > 0 && y < flashed[x].length - 1) { flashed[x - 1][y + 1] = flashed[x - 1][y + 1] + 1; }
        if (y < flashed[x].length - 1) { flashed[x][y + 1] = flashed[x][y + 1] + 1; }
        if (x < flashed.length - 1 && y < flashed[x].length - 1) { flashed[x + 1][y + 1] = flashed[x + 1][y + 1] + 1; }

      }
    }
  }

//  console.log('after', flashed)
  // console.log(newflash);

  if (newflash) return flash(flashed, false);
  return flashed;

  // [
  //   7, 6, 10, 5, 3, 6, 5,  4, 4, 5
  //   4, 9, 6, 7, 10, 7, 6, 9, 3,  3
  // ],

  // [
  //   7, 7, 11, 7, 4, 7, 5,  4, 4, 5
  //   4, 10, 7, 9, 11,  8,  6, 9, 3,  3
  // ],
}


const tick = (octos, count, flashes) => {
  console.log(count, flashes)
  // console.log(octos)
  if (count=== 0) return flashes;
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


  //console.log('-------------------------')
  return tick(flashed, count - 1, flashes);
};


//console.log(octos);

const p1 = tick(octos, 100, 0);

//let p1 = 0;
console.log('Part 1 : ', p1);

let p2 = 0;
console.log('Part 2 : ', p2)