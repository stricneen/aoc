const aoc = require('./aoc');
const buffer = aoc.readfile('day02.txt');

const text = buffer.split(/\n/);
const moves = text.map(x => {
  const r = x.split(' ');
  return { cmd: r[0], dist: parseInt(r[1]) }
})

const [h, d] = moves.reduce(([horz, depth], e) => {
  if (e.cmd === 'down') return [horz, depth + e.dist];
  if (e.cmd === 'up') return [horz, depth - e.dist];
  if (e.cmd === 'forward') return [horz + e.dist, depth];
}, [0,0]);

console.log("Part 1 : ", h * d);
console.assert(h * d === 1488669)



const [horz, depth,] = moves.reduce(([horz, depth, aim], e) => {
  if (e.cmd === 'down') return [horz, depth, aim + e.dist];
  if (e.cmd === 'up') return [horz, depth, aim - e.dist];
  if (e.cmd === 'forward') return [horz + e.dist, depth + (aim * e.dist), aim];
}, [0, 0, 0]);

console.log("Part 2 : ", horz * depth);
