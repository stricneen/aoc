const { sign } = require('crypto');
const aoc = require('./aoc');
const buffer = aoc.readfile('day18.txt');
const text = buffer.split(/\n/);

//  [[[[[9,8],1],2],3],4] 
 
//  [[[[0,9],2],3],4]

//  [[6,[5,[4,[3,2]]]],1] 

const explode = (f, d=0, o=[]) => {
    // any four nested
    console.log(`${d} : `,f);



    if (d === 4) {
        console.log('ex', f);

        return (f,d-1,f);
    }
    if (!f.some(x => Array.isArray(x))) {
        return [0,0]
    }
    let r ;
    if (Array.isArray(f[0])) {
        r =  explode(f[0] , d +1, o);
    }
    if (Array.isArray(f[1]) ) {
        r =  explode(f[1] , d +1, o);
    }

    console.log(`${d} : `,r, f);
    if (d === 3) {
        if (Array.isArray(f[0])){

            f[0] = 'ex';
            d=0
        }
          if (Array.isArray(f[1])){

              f[1] = 'ex';
              d=0
          }
    }
    if (Number.isInteger(f[0])) {
        f[0] += r[0];
        r[0] = 0;
    }
    if (Number.isInteger(f[f.length-1])) {
        f[f.length-1] += r[1];
        r[1] = 0;
    }

    if (d ==- 0) {
        console.log('final', JSON.stringify(f))
        let nasty = JSON.stringify(f);


        const nasty2 = nasty.replace('"ex"', '0');

        return JSON.parse(nasty2)
    }

    return r;  // expect [[[[0,9],2],3],4]
}

const split = (f) => {
  console.log(f);

    

    let r ;
    if (Array.isArray(f[0])) {
        r =  split(f[0])
    } else {
        if (f[0] > 9){
            console.log(f[0]);

            f[0] = [Math.floor(f[0]/2), Math.ceil(f[0]/2)]
            //f[0] = 'this'
            return f
        }
    }
    if (Array.isArray(f[1])) {
        r =  split(f[1])
    } else {
        if (f[1] > 9){
            console.log(f[1]);
            f[1] =  [Math.floor(f[1]/2), Math.ceil(f[1]/2)]
            return f;
        }

    }


    // if (d == 0) {
    //     console.log('final', f)
    //     const nasty = JSON.stringify(f);
    //     const nasty2 = nasty.replace('"ex"', '0');
    //     return JSON.parse(nasty2)
    // }

    return f;  // expect [[[[0,9],2],3],4]

}

//const r = explode(  [[3,[2,[8,0]]],[9,[5,[7,0]]]]  )
//console.log('result', JSON.stringify(r))
//    [[[[[9,8],1],2],3],4]    [[[[0,9],2],3],4] 
//    [7,[6,[5,[4,[3,2]]]]]     [7,[6,[5,[7,0]]]] 
//   [[6,[5,[4,[3,2]]]],1]       [[6,[5,[7,0]]],3]
//   [[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]      [[3,[2,[8,0]]],[9,[5,[7,0]]]].

console.log(JSON.stringify((split( [[[[0,7],4],[[7,8],[0,13]]],[1,1]] ))))

const reduce = (f) => {

    const e = explode(f);
    if (JSON.stringify(e) !== JSON.stringify(f)) {
        console.log('');
        console.log('exploded', JSON.stringify(e))
        console.log('');
        return reduce(e);
    }

   console.log('-try split----', JSON.stringify(f));
   const b = JSON.stringify(f);
    const s = split(f);
    console.log('-----', b);
    console.log('-----', JSON.stringify(f));
    
    if (b !== JSON.stringify(f)) {
        console.log('');
        console.log('split', JSON.stringify(s))
        console.log('');

        return reduce(s);
    }

    return f;

}

const add = (f1, f2) => {
    const sum = [f1,f2];

    return reduce([f1,f2]);

    return sum;
}

const x = add([[[[4,3],4],4],[7,[[8,4],9]]], [1,1])
console.log('x', JSON.stringify(x));

const p1 = 0;
const p2 = 0;

console.log('Part 1 : ', p1)
console.log('Part 2 : ', p2);
