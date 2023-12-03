const aoc = require('./aoc');
const buffer = aoc.readfile('day3.txt');
const textraw = buffer.split(/\n/);
const text = ['.'.repeat(textraw[0].length), ...textraw.map(x => `.${x}.`),'.'.repeat(textraw[0].length)];
// const nums = text.map(x=> [x,aoc.extractNums(x),[... new Set(aoc.extractNums(x))]]);
// const x = nums.map(x => [x[1].length, x[2].length]).filter(x => x[0]!=x[1])
// nums.map(x => [])

//  536147 h
//  532286
//  531225 l
//  530358 l

let p1 = 0;
for (let i = 0; i < text.length; i++) {
    
    const a = text[i-1];
    const l = text[i];
    const b = text[i+1];
    
    const numsOnLine = aoc.extractStrictNums(l);
    if (numsOnLine.length===0) continue;
    // console.log(a,l,b)

   
    console.log(numsOnLine)

    let pos = 0;
    for (let j = 0; j < numsOnLine.length; j++) {
        const num = numsOnLine[j];

        const numLen = num.toString().length;

        p = l.indexOf(num, pos);
        pos = p+numLen;
        
        const aa = a.substring(Math.max(p-1,0),Math.max(p-1,0)+numLen+2);
        const ll = l.substring(Math.max(p-1,0),Math.max(p-1,0)+numLen+2);
        const bb = b.substring(Math.max(p-1,0),Math.max(p-1,0)+numLen+2);
        
        const all = [...`${aa}${ll[0]}${ll[ll.length-1]}${bb}`].filter(c => c !=='.' && !aoc.isNumber(parseInt(c)))
        
    //  if (!all.length>0) console.log(aa,ll,bb,all.length>0)
     //console.log(aa,ll,bb,all.length>0)

     console.log(aa);console.log(ll);console.log(bb, all.length>0);console.log()

     if (all.length>0) p1 += num;

    }
}

console.log(p1)


// console.log(text)