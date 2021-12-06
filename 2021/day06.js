const aoc = require('./aoc');
const buffer = aoc.readfile('day06.txt');
const text = buffer.split(',');
const nums = text.map(x => parseInt(x))

const days = 256;

// 26984457539

const newl = () => {
return  {
  '0': 0,
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0,
  '5': 0,
  '6': 0,
  '7': 0,
  '8': 0,
}
}

const levels = newl();

nums.forEach(x => {
  levels[x.toString()] = levels[x.toString()] + 1;
});



const tick = (levels) => {
  const next = newl();
  next['0'] = levels['1'];
  next['1'] = levels['2'];
  next['2'] = levels['3'];
  next['3'] = levels['4'];
  next['4'] = levels['5'];
  next['5'] = levels['6'];
  next['6'] = levels['7'];
  next['7'] = levels['8'];

  next['6'] = next['6'] + levels['0'];
  next['8'] = next['8'] + levels['0'];
  
  return next;
};

let d = levels
for(i=0;i<days;i++) {
   d = tick(d);
}

let c = 0;
Object.keys(d).forEach(x => c = c + d[x])

console.log(d);
console.log(c);
console.assert(c === 1757714216975)