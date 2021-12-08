const aoc = require('./aoc');
const buffer = aoc.readfile('day09.txt');
const text = buffer.split(/\n/).map(x => x);

const nums = text.map(x => {
  const t = x.split(' | ');
  return { a: t[0].split(' '), b: t[1].split(' ')};
});


const p1 = nums.reduce((a,e) => {
  const t = e.b.map(x=>x.length);
  const x = t.filter(y=>[2,3,4,7].includes(y)).length;
  return a + x;
}, 0);
const p2 = 0;

console.log('Part 1 : ', p1);
console.log('Part 2 : ', p2);
