const aoc = require('./aoc');
const buffer = aoc.readfile('day05.txt');
const text = buffer.split(/\n/);

const pos = text.map(x => {
  const r = x.split(' -> ');
  return {
    x1: parseInt(r[0].split(',')[0]),
    y1: parseInt(r[0].split(',')[1]),
    x2: parseInt(r[1].split(',')[0]),
    y2: parseInt(r[1].split(',')[1])
  }
})

const trace = (coors) => {
  const map = {};
  for (const p of coors) {
    const keys = [];
    const xd = (p.x1 === p.x2) ? 0 : (p.x1 > p.x2) ? -1 : 1;
    const yd = (p.y1 === p.y2) ? 0 : (p.y1 > p.y2) ? -1 : 1;

    let x = p.x1;
    let y = p.y1;

    keys.push(`${x}_${y}`);
    while (x !== p.x2 || y !== p.y2) {
      x = x + xd;
      y = y + yd;
      keys.push(`${x}_${y}`);
    }

    for (const key of keys) {
      map[key] = (map[key] || 0) + 1
    }
  }
  
  return map;
}

const map1 = trace(pos.filter((p) => p.x1 === p.x2 || p.y1 === p.y2));
console.log('Part 1 : ', Object.keys(map1).filter(x => map1[x] > 1).length)

const map2 = trace(pos);
console.log('Part 2 : ', Object.keys(map2).filter(x => map2[x] > 1).length)
