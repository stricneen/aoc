const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const text = buffer.split(/\n/);

const scores = {
  ')': 3, ']': 57, '}': 1197, '>': 25137
}

const openers = '{[<(';
const closers = ')}]>';

const calcPoints = (line, stack) => {
//xconsole.log()
 // console.log(line, stack)
  if (line.length === 0) return 0;
  const arr = line.split('');
  const first = arr.shift();

  if (openers.indexOf(first) > -1) {
    stack.unshift(first);
    return calcPoints(arr.join(''), stack);
  } else {

    const c = stack.shift();
    if (first === ')' && c === '('){
      return calcPoints(arr.join(''), stack);
    }
    if (first === '}' && c === '{'){
      return calcPoints(arr.join(''), stack);
    }
    if (first === ']' && c === '['){
      return calcPoints(arr.join(''), stack);
    }
    if (first === '>' && c === '<'){
      return calcPoints(arr.join(''), stack);
    }
    return scores[first]
  }
}

const points = text.map(x => calcPoints(x, []));
const p1 = aoc.sum(points);
console.log('Part 1 : ', p1);

const incomplete = text.filter(x => calcPoints(x, []) === 0);

console.log(incomplete)

console.log('Part 2 : ', 0);