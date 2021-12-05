const aoc = require('./aoc');
const buffer = aoc.readfile('day05.txt');

const text = buffer.split(/\n/);

const pos = text.map(x => {
  const r = x.split(' -> ');
  return {
    x1: parseInt(r[0].split(',')[0]),
    y1: parseInt(r[0].split(',')[1]),
    x2: parseInt(r[1].split(',')[0]),
    y2: parseInt(r[1].split(',')[1])

  }

})

const axis = pos.filter((p) => p.x1 === p.x2 || p.y1 === p.y2);

// for (const aa of pos) {
//   console.log(aa)
// }

const map = {};

for (const p of axis) {
  // console.log(p);


  if (p.x1 === p.x2) {

    const [a, b] = ([p.y1, p.y2].sort(function (a, b) {  return a - b;  }));
//    console.log(a,b)
    for (let i = a; i <= b; i++) {
      const key = `${p.x1}_${i}`;
      if (map[key]) {
        map[key] = map[key] + 1;
      } else {
        map[key] = 1
      }
    }
  }


  // 7,7 -> 7,7
  //  console.log('x')
  else if (p.y1 === p.y2) {

    const x = [p.x1, p.x2].sort(function (a, b) {  return a - b;  });
    const [a, b] = ([p.x1, p.x2].sort(function (a, b) {  return a - b;  }));
    //console.log(x)
    for (let i = a; i <= b; i++) {
      const key = `${i}_${p.y1}`;
      if (map[key]) {
        map[key] = map[key] + 1;
      } else {
        map[key] = 1
      }
    }
  } else { // diag

    


  }

  //console.log()
}





const c = Object.keys(map).filter(x => map[x] > 1)

// 2: 6007
//console.log(map)
console.log(c.length)
// console.log(Object.keys(map).length)
//3428
 /// 3338 