const aoc = require('./aoc');
const buffer = aoc.readfile('day20.txt');
const text = buffer.split(/\n/);
const algo = text.shift();
text.shift();
const image = text.map(x => x.split(''));

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
    console.log('')
}

const addFrame = (image, char='.') => {
    const next = [];
    next.push(char.repeat(image[0].length + 2).split(''));
    for (const line of image) {
        next.push(`${char}${line.join('')}${char}`.split(''))
    }
    next.push(char.repeat(image[0].length + 2).split(''));
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


const enhance = (image, algo, c) => {
    if (c === 48) console.log('Part 1 : ', lit(image));
    if (c === 0) console.log('Part 2 : ', lit(image));
    if (c === 0) return image;

    const next = [];

    for (let x = 1; x < image.length-1; x++) {
        let l = ''
        for (let y = 1; y < image[0].length-1; y++) {
            const algoPos = val(x, y, image);
            const nn = algo[algoPos];
            l = l + nn;
        }
        next.push(l.split(''))
    }
    return enhance(next, algo, c - 1);
}

let x = image;
for (let i = 0; i < 110; i++) {
    x = addFrame(x, '.');
}

const n = enhance(x, algo.split(''), 50);
 