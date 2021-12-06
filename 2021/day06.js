const aoc = require('./aoc');
const buffer = aoc.readfile('day06.txt');
const text = buffer.split(',');
const nums = text.map(x => parseInt(x))

const days = 256;
const levels = [0,0,0,0,0,0,0,0,0];
nums.forEach(n => levels[n] = levels[n] + 1);

const tick = (fish) => {
  const babies = fish.shift();
  fish[6] = fish[6] + babies;
  fish[8] = babies;
  return fish;
};

let d = [...levels];
for(i=0;i<80;i++) {
   d = tick(d);
}

console.log('Part 1 : ', aoc.sum(d));

d = [...levels];
for(i=0;i<256;i++) {
   d = tick(d);
}

console.log('Part 2 : ', aoc.sum(d));

