const aoc = require('./aoc');
const buffer = aoc.readfile('day09.txt');
const text = buffer.split(/\n/);
const map = [];
text.forEach(l => {
  map.push(l.split('').map(x => parseInt(x)));
});

let p1 = 0;

const surround = ([x,y]) => {
  const up1 = (map[y+1] || {})[x] ;
  const down1 = (map[y-1]|| {})[x] ;
  const left1 = (map[y]|| {})[x-1] ;
  const right1 = (map[y]|| {})[x+1] ;

  const up = up1 === undefined ? 100 : up1;
  const down = down1 === undefined ? 100 : down1;
  const left = left1 === undefined ? 100 : left1;
  const right = right1 === undefined ? 100 : right1;

  return [up,down,left,right];
}

const scan = (loc, scanned) => {

  if (scanned.includes(loc.toString())) return [];
  if (loc[0] < 0 || loc[1] < 0) return [];
  
  scanned.push(loc.toString());
  const [u,d,l,r] = surround(loc);


//  console.log(loc, scanned);
  
//  console.log('d',u,d,l,r)
  if (d < 9) { scanned.concat(scan([loc[0], loc[1]-1], scanned))   }
  if (u < 9) { scanned.concat(scan([loc[0], loc[1]+1], scanned))   }
  if (l < 9) { scanned.concat(scan([loc[0] -1 ,loc[1]], scanned))   }
  if (r < 9) { scanned.concat(scan([loc[0]+ 1, loc[1]], scanned))   }

  


  return scanned;

  }

  






const low = [];
for (let x = 0; x < map[0].length; x++) {
  for (let y = 0; y < map.length; y++) {
  

    const curr = map[y][x];
    const [up,down,left,right] = surround([x,y])

    if (curr < up && curr < down && curr < left && curr < right) {      
      p1 = p1 + curr + 1;
      low.push([x,y])
    }


  }
}

const a = aoc.sort_ints(low.map(x => scan(x,[]).length));
const p2 = a[a.length -1 ] * a[a.length -2 ] * a[a.length -3 ];

console.log('Part 1 : ', p1);
console.log('Part 2 : ', p2);

console.assert(p2 === 786048);
