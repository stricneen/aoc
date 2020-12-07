const { constants } = require('buffer');
const { allowedNodeEnvironmentFlags, rawListeners } = require('process');
const aoc = require('./aoc');
    
const buffer = aoc.readfile('day07.txt');

const text = buffer.split(/\n/);
// const input = text.map(x => parseInt(x));

const bags = text.map(x => {
    const outside = x.split('contain');
    const bag = outside[0].replace('bags ', '').trim();
    const r = {bag}
    const inside = outside[1].split(',').map(x => x.trim());
    const indside2 = inside.map(x => {
        const y = x.split('');
        return { n: parseInt(y[0]), bag: y.splice(1).join('').replace('.','').replace(' bags','').replace( 'bag','').trim()}
    })
    r['inside'] = indside2;
    return r;

});

//  console.log(bags);

 
const canContain = (l) => {

    // All bags that can contains b

    const can = bags.filter(b => {
        
        const canHold = b.inside.map(x => x.bag);

        const match = canHold.filter(value => l.includes(value));

        return (match.length > 0);
    })


    return can;
    
};

const shiny = (l, acc) => {

    const cc = canContain(l);
    if (cc.length == 0) return acc;


    var accn = acc.concat(cc);
    var n = shiny(cc.map(x=>x.bag), accn);
    return n;   
}

const r = shiny(['shiny gold'], []);

const names = r.map(x => x.bag);

console.log('-----');
console.log("Part 1 : ", [...new Set(names)].length);


// const b = canContain(['shiny gold']);


// outer: 'vibrant plum',
// inside: [
//   { n: 5, bag: 'faded blue bags' },
//   { n: 6, bag: 'dotted black bags.' }
// ]
// }