const aoc = require('./aoc');
const buffer = aoc.readfile('day16.txt');
const text = buffer.split(/\n/)[0];



// The probe's x position increases by its x velocity.
// The probe's y position increases by its y velocity.
// Due to drag, the probe's x velocity changes by 1 toward the value 0; that is, it decreases by 1 if it is greater than 0, increases by 1 if it is less than 0, or does not change if it is already 0.
// Due to gravity, the probe's y velocity decreases by 1.

const tick = ([x, y], [vx,vy], c, maxy) => {
    if (c === 0) return [NaN, NaN, NaN, NaN, NaN];


//   console.log(x,y)
    const nx = x + vx;
    const ny = y+vy
    let nvx = vx > 1 ? vx - 1 : vx + 1;
    if (vx === 0) nvx = 0;
   const  nvy = vy - 1;

    if (ny > maxy) maxy = ny;

    if (intarget(nx, ny)) {
        return [nx, ny, nvx, nvy, maxy];
    }

    return tick([nx, ny], [nvx, nvy] ,c-1, maxy);
}

///1225 

const intarget = (x,y)=> {

return x >= 20 && x<= 30 && y >= -10 && y <=-5;
 
   return x >= 287 && x <= 309 && y >=-76 && y <=-48;
}

// 264
// 1139


// x = 10
// y = -10 + -10

// 0,10 would fire the probe straight up

// 7,2
// 6,3
// 9,0

const yy =[]
let my = 0;
let hit =0;
const limit = 100;
for (let x = 0; x <= limit; x++) { 
    for (let y = -limit; y <= limit; y++){

        const [nx, ny, nvx, nyx, maxy] = tick([0,0],[x,y], 50, 0);
        if (!Number.isNaN(nx)) {
          console.log(x,y)
           hit ++;
            if (maxy > my) {
                my = maxy;
               // console.log('-------', maxy);
            }
           //console.log([nx, ny, nvx, nyx]);
yy.push(maxy)
        }
// 45 2859
    }
}

console.log('Part 1 : ',Math.max(...yy))
console.log('Part 2 : ', hit);

// 1139
// 


