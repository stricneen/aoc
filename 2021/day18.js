const aoc = require('./aoc');
const buffer = aoc.readfile('day18.txt');
const text = buffer.split(/\n/);

const numsplit = (s) => {
    const r = [];
    const l = s.split('').map(x => isNaN(parseInt(x)) ? x : parseInt(x));
    // console.log(l)
    const x = l.reduce((a, e) => {
        if (a.length === 0) {
            a.push(e);
            return a;
        }

        if (Number.isInteger(e)) {

            if (Number.isInteger(a[a.length - 1])) {
                a[a.length - 1] = a[a.length - 1] * 10 + e
            } else {
                a.push(e)
            }

        } else {
            a.push(e);
        }
        return a;

    }, []);
    // console.log(x)
    return x;
}


const explode = (t) => {

    const str = JSON.stringify(t);
    const chars = str.split('');
    let depth = 0;
    for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        // console.log(c)
        if (c === '[') depth++
        if (c === ']') depth--
        //        [[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]];
        if (depth === 5) {

            // console.log(chars);
            // console.log(i)

            const r = chars.slice(i + 1).join('');
            const rr = r.substring(0, r.indexOf(']'));
     
            const p1 = parseInt(rr.split(',')[0]);
            const p2 = parseInt(rr.split(',')[1]);
            
            // const b = str.substring(0, str.indexOf(rr));
            // const a = str.substring(str.indexOf(rr) + rr.length);
            
            // console.log(p1,p2);
            //   console.log(b);
            //  console.log(a)


             const b = str.substring(0, i +1);
             const a = str.substring(i + rr.length + 1);
 

            //  console.log(bb);
            //  console.log(aa)

            const x = numsplit(b.substring(0, b.length - 1))
            const y = numsplit(a.substring(1))


            const rfx = x.reverse();
            const ff = rfx.findIndex(z => Number.isInteger(z));
            if (ff) {
                rfx[ff] = rfx[ff] + p1;
            }

            const fy = y.findIndex(z => Number.isInteger(z));
            if (fy) {
                y[fy] = y[fy] + p2;
            }

            const c = rfx.reverse().join('') + '0' + y.join('')

            // console.log(c)
            return JSON.parse(c)
            break;
        }
    }
    return t;
}

const split = (f) => {

    const x = numsplit(f);
    const atom = (n) => [Math.floor(n / 2), Math.ceil(n / 2)];

    const i = x.findIndex(y => y >= 10);
    x[i] = JSON.stringify(atom(x[i]));

    return x.join('');

}

const magitude = (f) => {
    const o = JSON.parse(f);
    const sum = ([x, y]) => {
        if (Number.isInteger(x) && Number.isInteger(y)) { return (3 * x) + (2 * y) }
        return sum([Number.isInteger(x) ? x : sum(x), Number.isInteger(y) ? y : sum(y)]);

    };
    return sum(o);
}

const reduce = (f) => {

    const e = explode(f);
    if (JSON.stringify(e) !== JSON.stringify(f)) {
       console.log('exploded', JSON.stringify(e))
        return reduce(e);
    }

    // console.log('-try split----', JSON.stringify(f));
    const s = split(JSON.stringify(f));
    // console.log('---------',s)
    if (s !== JSON.stringify(f)) {
        console.log('split   ', s)
        return reduce(JSON.parse(s));
    }
    return JSON.stringify(f);
}

const add = (f1, f2) => {
    const sum = [JSON.parse(f1), JSON.parse(f2)];
    console.log(JSON.stringify(sum))
    return reduce(sum);
}

console.assert(explode('[[[[[9,8],1],2],3],4]') === '[[[[0,9],2],3],4]')
console.assert(explode('[7,[6,[5,[4,[3,2]]]]]') === '[7,[6,[5,[7,0]]]]')
console.assert(explode('[[6,[5,[4,[3,2]]]],1]') === '[[6,[5,[7,0]]],3]')
console.assert(explode('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]') === '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]')
console.assert(explode('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]') === '[[3,[2,[8,0]]],[9,[5,[7,0]]]]')

// console.assert(explode('[[[[8,7],[7,7]],[[8,6],[7,0]]],[[[[7,7],0],12],[8,7]]]') === '[[3,[2,[8,0]]],[9,[5,[7,0]]]]')

// [[[[8,7],[7,7]],[[8,6],[7,0]]],[[[[7,7],0],12],[8,7]]]

//console.assert(add('[[[[4,3],4],4],[7,[[8,4],9]]]', '[1,1]') === '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]')

console.assert(magitude('[[1,2],[[3,4],5]]') === 143);
console.assert(magitude('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]') === 1384);
console.assert(magitude('[[[[1,1],[2,2]],[3,3]],[4,4]]') === 445);
console.assert(magitude('[[[[3,0],[5,3]],[4,4]],[5,5]]') === 791);
console.assert(magitude('[[[[5,0],[7,4]],[5,5]],[6,6]]') === 1137);
console.assert(magitude('[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]') === 3488);

console.assert(split('[[11,0],[10,0]]') === '[[[5,6],0],[10,0]]')
console.assert(split('[[[[4,0],[5,4]],[[7,7],[6,0]]],[[[11,0],[11,5]],[[5,0],[10,0]]]]') === '[[[[4,0],[5,4]],[[7,7],[6,0]]],[[[[5,6],0],[11,5]],[[5,0],[10,0]]]]')

//  console.assert((add('[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]', '[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]')) === '[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]');
// console.assert((add('[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]', '[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]')) === '[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]');


//console.assert((add('[[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]', '[[[[4,2],2],6],[8,7]]')) === '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]');

// console.assert((add('[[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]', '[[[[4,2],2],6],[8,7]]')) === '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]');

// console.log('[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]')
// [[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]






// + [2,9]
// = [[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]

const p1 = 0;
const p2 = 0;

let s = add(text[0], text[1]);
console.log(s)
for (let i = 2; i < text.length ; i++) {
    s = add(s, text[i])
    console.log(s)

}
console.log(JSON.stringify(s))
console.log(magitude(s))

// console.log('Part 1 : ', p1)
// console.log('Part 2 : ', p2);

