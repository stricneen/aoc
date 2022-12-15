const aoc = require('./aoc');
const buffer = aoc.readfile('day13.txt');
const data = buffer.split(/\n\n/)
    .map(x => x.split(/\n/).map( y => JSON.parse(y)));


// console .log(data)§

const compare = (left, right) => {
    if (Number.isInteger(left) && Number.isInteger(right)) {
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
    if (Number.isInteger(left)) return compare([left], right);
    if (Number.isInteger(right)) return compare(left, [right]);
  };
  

const index = []
const packeta = [[2]]
const packetb = [[6]]
const list = [packeta, packetb]
for (let i = 0; i < data.length; i++) {
    list.push(data[i][0])
    list.push(data[i][1])
    c = compare(data[i][0], data[i][1] ,0)
    if (c === 1) {
        index.push(i+1)
    }
}


list.sort(compare).reverse()

const apos = list.findIndex(x => x === packeta) + 1
const bpos = list.findIndex(x => x === packetb) + 1

console.log('Part 1 : ', aoc.sum(index)); // 5623
console.log('Part 2 : ', apos * bpos);    // 20570

