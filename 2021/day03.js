const aoc = require('./aoc');
const buffer = aoc.readfile('day03.txt');

const text = buffer.split(/\n/);

// Lets never speak of this again...


const pivot = (array) => {
  return array.reduce((a,e) => {
      e.split('').forEach((x,i) =>  a[i] += x)
      return a
    }, [...new Array(array[0].length)].map(x => []));
}

const first = (array) => {

  return array.map(y => {
    const z = y.split('').filter(x => x === '0').length
    const o = y.split('').filter(x => x === '1').length
    return (z>o) ? '0' : '1'
  })
}

const func = (array) => first(pivot(array));

const t = func(text);

var digit = parseInt(t.join(''), 2);
var digit2 = parseInt(t.map(x=> x === '0'? '1': '0').join(''),2)

console.log('Part 1 : ' , digit2* digit)
console.assert(digit*digit2 === 3923414)

//const b= x.map(x => x.split('').splice(9).join(''));


let ox = [...text];
let bx = [...t];
for(var i=0; i<100; i++) {
  const z1 = bx[i].split('').filter(x => x === '0').length
  const o1 = bx[i].split('').filter(x => x === '1').length
  const oxc = o1 >= z1 ? '1' : '0';
  ox = ox.filter(x => x.split('')[i] === oxc);
  if (ox.length === 1) break;
  bx = func(ox)
}


let cx = [...t]
let co = [...text];
for(var i=0; i<100; i++) {
  const z1 = cx[i].split('').filter(x => x === '0').length
  const o1 = cx[i].split('').filter(x => x === '1').length
  const coc = z1 <= o1 ? '0' : '1';
  co = co.filter(x => x.split('')[i] === coc);
  if (co.length === 1) break;
  cx = func(co)
}


const p2 = parseInt(ox[0], 2) * parseInt(co[0], 2);
console.log('Part 2 : ', p2)

console.assert(p2 === 5852595)
