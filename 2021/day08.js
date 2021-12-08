const aoc = require('./aoc');
const buffer = aoc.readfile('day08.txt');
const text = buffer.split(/\n/).map(x => x);

const nums = text.map(x => {
  const t = x.split(' | ');
  return { 
    segments: t[0].split(' ').map(x => x.split('').sort().join('')), 
    display: t[1].split(' ').map(x => x.split('').sort().join(''))
  };
});

 const convert = (segs) => {
  const one = segs.find(x => x.length === 2);
  const seven = segs.find(x => x.length === 3);
  const four = segs.find(x => x.length === 4);
  const eight = segs.find(x => x.length === 7);
  const six = segs.filter(x => x.length === 6).filter(x => x.indexOf(one[0]) === -1 || x.indexOf(one[1]) === -1)[0]; //6
  const three = segs.filter(x => x.length === 5).filter(x => x.indexOf(one[0]) > -1 && x.indexOf(one[1]) > -1)[0]; //5
  const nine = segs.filter(x => x.length === 6).filter(x => x.indexOf(four[0]) > -1 && x.indexOf(four[1]) > -1 && x.indexOf(four[2]) > -1 && x.indexOf(four[3]) > -1 )[0]; // 6  
  const zero = segs.filter(x => x.length === 6).filter(x => x !==six && x!==nine )[0]; // 6
  const five = segs.filter(x => x.length === 5).filter(x => x !== three).filter(x => six.indexOf(x[0]) > -1 && six.indexOf(x[1]) > -1 && six.indexOf(x[2]) > -1 && six.indexOf(x[3]) > -1 && six.indexOf(x[4]) > -1)[0];
  const two = segs.filter(x => x.length === 5).filter(x => x !== five && x!==three )[0]; // 6
  return[zero, one,two,three,four,five,six,seven,eight,nine];
};

const p1 = nums.reduce((a,e) => {
  const t = e.display.map(x=>x.length);
  const x = t.filter(y=>[2,3,4,7].includes(y)).length;
  return a + x;
}, 0);
console.log('Part 1 : ', p1);

const decode = (code, num) => {
  const x = parseInt(num.map(x => code.indexOf(x)).join(''));
  return x;
}

const lines = nums.map(n => decode(convert(n.segments), n.display));
const p2 = aoc.sum(lines);

console.log('Part 2 : ', p2);
