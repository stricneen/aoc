const aoc = require('./aoc');
const buffer = aoc.readfile('day10.txt');
const text = buffer.split(/\n/);

const scores = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
const openers = '([{<';
const pairs = ['{}', '[]', '<>', '()'];

const calcPoints = (line, stack) => {
  if (line.length === 0) return [0, stack];
  const arr = line.split('');
  const first = arr.shift();

  if (openers.indexOf(first) > -1) {
    stack.unshift(first);
    return calcPoints(arr.join(''), stack);
  } else {

    const c = stack.shift();
    if (pairs.includes(`${c}${first}`)) return calcPoints(arr.join(''), stack);
    return [scores[first], stack];
  }
}

const points = text.map(x => calcPoints(x, []));
const p1 = aoc.sum(points.map((x => x[0])));
console.log('Part 1 : ', p1);

const incomplete = points.filter(x => x[0] === 0).map(x => x[1]);
const p = incomplete.map(x => x.reduce((a,e) => (a * 5) + openers.indexOf(e) + 1, 0));
const s = aoc.sort_ints(p);
console.log('Part 2 : ', s[Math.floor(s.length/2)])