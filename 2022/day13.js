const aoc = require('./aoc');
const buffer = aoc.readfile('day13.txt');
const data = buffer.split(/\n\n/)
    .map(x => x.split(/\n/).map( y => JSON.parse(y)));


// console .log(data)§

const compare = (left, right) => {
    if (typeof left === 'number' && typeof right === 'number') {
      if (left < right) return 1;
      if (left > right) return -1;
      return 0;
    }
    if (Array.isArray(left) && Array.isArray(right)) {
      for (let i = 0; i < left.length; i++) {
        if (!right[i]) return -1;
        const result = compare(left[i], right[i]);
        if (result) return result;
      }
      if (left.length < right.length) return 1;
      else return 0;
    }
    if (typeof left === 'number') return compare([left], right);
    if (typeof right === 'number') return compare(left, [right]);
  };
  

const index = []
for (let i = 0; i < data.length; i++) {
    c = compare(data[i][0], data[i][1] ,0)
    console.log('----------->',c)
    if (c === 1) {
        index.push(i+1)
    }
}

// console.log(index)
console.log('Part 1 : ', aoc.sum(index)); // 5623
// console.log('Part 2', p2());   // 20570

 // [1,2,4,6]