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
console.log("Part 1 : ", [...new Set(names)].length);


const addBags = (l, acc) => {

    // if (l.length==0) return acc;
    // find bags in l
    const b = bags.filter(x => l.includes(x.bag));
    const c = b.map(x => x.inside);
    const merged = [].concat.apply([], c).filter(x => x.bag != 'o other');

    if (merged.length == 0) return 0;

    console.log("merged" ,merged);

    const layer = merged.map(x => x.n + (x.n * addBags(x.bag, 0)));



    console.log("Layer", layer);

    const total = aoc.sum(layer);

    console.log("Total", total);

    return acc + total;
    // const next = merged.map(x => x.bag);
    // console.log("next", next);

    // return total + addBags(next, 0);
}


// Gold bag 

const gold = bags.filter(x => x.bag == 'shiny gold');

console.log(addBags('shiny gold', 0));
