const aoc = require('./aoc');
const buffer = aoc.readfile('day13.txt');
const text = buffer.split(/\n/);

const dots = text.filter(x => x.indexOf(',') > -1).map(x => x.split(',')).map(x => [parseInt(x[0]), parseInt(x[1])]);
const folds = text.filter(x => x.indexOf('=') > -1).map(x => x.split('=')).map(x => [x[0], parseInt(x[1])]);

const fold = (paper, line) => {
  const foldAt = line[1];
  const horz = line[0].indexOf('y') > -1;
  const b = horz ? paper : paper.map(([a,b]) => [b,a]);
  const next = b.reduce((a, e) => {
      if (e[1] < foldAt) {
        a.push(e);
      } else {
        a.push([e[0], e[1] - (((e[1] - foldAt) * 2))])
      }
    return a;
  }, []);
  const a = horz ? next : next.map(([a,b]) => [b,a]);
  return aoc.dedupObj(a);
};

const p1 = fold(dots, folds[0]);
console.log('Part 1 : ', p1.length);

const p2 = folds.reduce((a,e) => fold(a, e), dots);

// PRINT ANSWER
// aoc.cls();
// for (const i of p2) {
//   aoc.p(i[0], i[1] + 4, '#')
// }
// aoc.p(10, 12, '');

console.log('Part 2 :  EPUELPBR');
