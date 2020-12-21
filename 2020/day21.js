const aoc = require('./aoc');
const buffer = aoc.readfile('day21.txt');
const text = buffer.split(/\n/);

const ingredients = text.map(e => {
    const l = e.split(' (')[0].split(' ');
    const a = aoc.between(e,'(',')').split(' ').filter(x => x != 'contains').map(x => x.replace(',', ''));
    return { ingredients: l, aller: a }
});

const allIngredients = ingredients.reduce((a,e) => {
    e.ingredients.forEach(i => {
        if (!a.includes(i)) a.push(i);
    });
    return a;
}, []);

const spread = ingredients.reduce((a,e) => {
    e.ingredients.forEach(i => {
        if (a.has(i)) {
            a.set(i, [... new Set(a.get(i).concat(e.aller))]);
        } else {
            a.set(i, e.aller);
        }
    });
    return a;
}, new Map());

const intersect = (a,b) =>  a.filter(e => b.includes(e));

const poss = ingredients.reduce((a,e) => {
    e.aller.forEach(al => {
        if (a.has(al)) {
            a.set(al, intersect(a.get(al), e.ingredients));
        } else {
            a.set(al, e.ingredients);
        }
    });
    return a;
}, new Map());


let t = [];
poss.forEach((v) => {
    t = t.concat(v);
});
const possibleAllergens = [...new Set(t)];

// console.log(possibleAllergens);
// console.log(ingredients);
// console.log(poss);
    
const allergenFree = allIngredients.reduce((a,e) => {
    if (!possibleAllergens.includes(e)) a.push(e);
    return a;
}, []);
// console.log(allergenFree);

const p1 = allergenFree.map(a => {
    let c = 0;
    ingredients.forEach((v) => {

        if (v.ingredients.includes(a)) c++;

    });
    return c;
});

console.log("Part 1 : ", aoc.sum(p1));