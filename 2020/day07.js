const aoc = require('./aoc');
const buffer = aoc.readfile('day07.txt');

const text = buffer.split(/\n/);

const shinyGold = 'shiny gold';

// Parse
const bags = text.map(x => {
    const outside = x.split('contain');
    const bag = outside[0].replace('bags ', '').trim();
    const r = {bag}
    const inside = outside[1].split(',').map(x => x.trim());
    const indside2 = inside.map(x => {
        const y = x.split(''); 
        return { n: parseInt(y[0]), bag: y.splice(1).join('').replace('.','').replace(' bags','').replace( 'bag','').trim()}
    })
    r['contains'] = indside2.reduce((a,e) => isNaN(e.n) ? a : [e, ...a] ,[]);
    return r;
});

const canContain = (l) => {
    return bags.filter(b => {
        const canHold = b.contains.map(x => x.bag);
        const match = canHold.filter(value => l.includes(value));
        return (match.length > 0);
    });
}

const shiny = (l, acc) => {
    const cc = canContain(l);
    if (cc.length == 0) return acc;
    var accn = acc.concat(cc);
    var n = shiny(cc.map(x=>x.bag), accn);
    return n;   
}

const r = shiny([shinyGold], []);
const names = r.map(x => x.bag);
console.log("Part 1 : ", [...new Set(names)].length);

const addBags = (l) => {
    const b = bags.filter(x => l.includes(x.bag));
    const c = b.map(x => x.contains);
    const merged = [].concat.apply([], c);
    if (merged.length == 0) return 0;

    const layer = merged.map(x => x.n + (x.n * addBags(x.bag)));
    const total = aoc.sum(layer);
    return total;
}

console.log("Part 2 : ", addBags(shinyGold, 0));
