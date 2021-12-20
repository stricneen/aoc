const aoc = require('./aoc');
const buffer = aoc.readfile('day20.txt');
const text = buffer.split(/\n/);
const algo = text.shift();
text.shift();
const image = text.map(x => x.split(''));

//console.log(text)/

const loc = (x, y, img) => {
    if (x >= 0 && y >= 0 && x < img.length && y < img[0].length){
        return img[x][y];
    }
    return '.';
}

const pa = (a) => {
    for (const l of a) {
        console.log(l.join(''));
    }
}

const addBorder = (image) => {
    const next = [];
    next.push('.'.repeat(image[0].length + 2).split(''));
    for (const line of image) {
        next.push(`.${line.join('')}.`.split(''))
    }
    next.push('.'.repeat(image[0].length + 2).split(''));
    return next;
}

const lit = (n) => n.reduce((a, e) => {
    return a + e.filter(x => x === '#').length;
}, 0)

const val = (x, y, img) => {

    const out = [];
    out.push(loc(x - 1, y - 1, img));
    out.push(loc(x - 1, y, img));
    out.push(loc(x - 1, y + 1, img));
    out.push(loc(x, y - 1, img));
    out.push(loc(x, y, img));
    out.push(loc(x, y + 1, img));
    out.push(loc(x + 1, y - 1, img));
    out.push(loc(x + 1, y, img));
    out.push(loc(x + 1, y + 1, img));

    const o = out.reduce((a, e) => {
        if (e === '.') a = a + '0';
        if (e === '#') a = a + '1';
        return a;
    }, '');
    const pos = parseInt(o, 2);
    // console.log('out', out)

    // console.log('o', o)
    // console.log('pos', pos)
    return pos;

}

const flip = (x) => {
    return x.map(y=>y.map(z => z === '#' ? '.' : '#'))

}


const enhance = (image, algo, c) => {
    if (c === 0) return image;
    // console.log(c)

    const border = addBorder(image);
    const next = [];

// pa(border)

    for (let x = 0; x < border.length; x++) {

        let l = ''
        for (let y = 0; y < border[0].length; y++) {
            const algoPos = val(x, y, border);
            const nn = algo[algoPos];
            l = l + nn;

        }
        next.push(l.split(''))
    }
    // console.log(next)
   // pa(next);
  //  console.log('')
    pa(next);

    console.log(lit(next))

    

    return enhance(flip(next), algo, c - 1);
}


// console.log(image);
console.log(lit(image))
const n = enhance(image, algo.split(''), 2);

// pa(n);




console.log(lit(n));


 /// 5097 - 17987

//  mine  theirs
//  5047  5047
//  5028  5028
//  5186  5097

