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

// const spread = ingredients.reduce((a,e) => {
//     e.ingredients.forEach(i => {
//         if (a.has(i)) {
//             a.set(i, [... new Set(a.get(i).concat(e.aller))]);
//         } else {
//             a.set(i, e.aller);
//         }
//     });
//     return a;
// }, new Map());

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


// console.log(ingredients);

const allergens = ingredients.map(i => {
    const a = i.ingredients.filter(x => !allergenFree.includes(x));
    return { ingredients: a, aller: i.aller };
});

// console.log(allergenFree);


// console.log(allergens);


const map = new Map();
allergens.forEach(e => {

    e.aller.forEach(a => {
        if (map.has(a)) {
            map.set(a, intersect(map.get(a), e.ingredients));
        } else {
            map.set(a, e.ingredients);
        }

    })


});


for(let i=0;i<5;i++)
    map.forEach((v,k) => {
        if (v.length == 1) {
            map.forEach((v1, k1) => {
                if (v1.length > 1) {
                    const index = v1.indexOf(v[0]);
                    if (index > -1) {
                        //const t = map.get(k1).splice(index, 1);
                        map.get(k1).splice(index, 1);
                    }
                }
            });
        }
    });

// console.log(map);


const r = [];
map.forEach((v,k) =>  {
    r.push(k);
});

const p2 = r.sort().map(x => map.get(x)[0]).join(',');

console.log("Part 2 : ", p2);