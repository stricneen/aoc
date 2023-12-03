const aoc = require('./aoc');
const buffer = aoc.readfile('day3.txt');
const textraw = buffer.split(/\n/);
const text = ['.'.repeat(textraw[0].length), ...textraw.map(x => `.${x}.`), '.'.repeat(textraw[0].length)];

let p1a = 0;
const gears = {};
for (let i = 0; i < text.length; i++) {

    const a = text[i - 1];
    const l = text[i];
    const b = text[i + 1];

    const numsOnLine = aoc.extractStrictNums(l);
    if (numsOnLine.length === 0) continue;

    let pos = 0;
    for (let j = 0; j < numsOnLine.length; j++) {
        const num = numsOnLine[j];

        const numLen = num.toString().length;

        p = l.indexOf(num, pos);


        const aa = a.substring(Math.max(p - 1, 0), Math.max(p - 1, 0) + numLen + 2);
        const ll = l.substring(Math.max(p - 1, 0), Math.max(p - 1, 0) + numLen + 2);
        const bb = b.substring(Math.max(p - 1, 0), Math.max(p - 1, 0) + numLen + 2);
        const all = [...`${aa}${ll[0]}${ll[ll.length - 1]}${bb}`].filter(c => c !== '.' && !aoc.isNumber(parseInt(c)))

        // console.log(aa);console.log(ll);console.log(bb, all.length>0);console.log();

        if (all.length > 0) p1a += num;

        // p2
        if (all.includes('*')) {
            if (aa.includes('*')) {
                const key = `${i - 1}-${p + aa.indexOf('*')}`;
                if (gears[key]) { gears[key].push(num) } else { gears[key] = [num] }
            }
            if (ll.includes('*')) {
                const key = `${i}-${p + ll.indexOf('*')}`;
                if (gears[key]) { gears[key].push(num) } else { gears[key] = [num] }
            }
            if (bb.includes('*')) {
                const key = `${i + 1}-${p + bb.indexOf('*')}`;
                if (gears[key]) { gears[key].push(num) } else { gears[key] = [num] }
            }
        }


        pos = p + numLen;
    }
}

let p2a = 0;
Object.keys(gears).forEach(k => {
    if (gears[k].length === 2) {
        p2a += gears[k][0] * gears[k][1];
    }
})

console.log('Part 1: ', p1a); //532331
console.log('Part 2: ', p2a); //82301120
