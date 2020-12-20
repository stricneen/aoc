const aoc = require('./aoc');
const instraw = aoc.readfile('day19.txt').split(/\n/);
const data = aoc.readfile('day19a.txt').split(/\n/);

const rules = instraw.reduce((a,e) => {
    const s1 = e.split(': ');
    if (s1[1].includes('"')) {
        return a.set(parseInt(s1[0]), s1[1].split('"').join('') );
    }
    const groups = s1[1].split(' | ').map(x => x.split(' ').map(y => parseInt(y)));
    return  a.set(parseInt(s1[0]), groups);
}, new Map());

const max = data.reduce((a,d) => d.length > a ? d.length : a, 0);

const expand = (rules) => {
   
    const full = new Map();
    const exp = (rl) => {

        if (rl.length == 0) return full;

        const n =[];
        for(irule of rl) {

            if (irule.rem.length == 0) {
                full.set(irule.red, 0);
            } else {
                const [h, ...t] = irule.rem;
                const expand = rules.get(h);
                if (expand == 'a' || expand == 'b'){
                    n.push({ red: irule.red + expand, rem: t });
                } else {
                    for(nx of expand) {
                        n.push({ red: irule.red, rem: nx.concat(t) });
                    }
                }
            }
        }
        return exp(n.filter(x => data.some(d => d.startsWith(x.red))));
    };

    const root = rules.get(0);
    const x = root.map(r => ({ red: '', rem: r }));
    return (exp(x));
};

console.time('Time   ');

const expanded1 = expand(rules);
const p1 = data.reduce((a,d) => expanded1.has(d) ? a + 1 : a, 0);
console.log("Part 1 : ", p1);


rules.set(8, [ [42], [42,8]]);
rules.set(11, [[42, 31], [42, 11 ,31]]);

const expanded2 = expand(rules);
const p2 = data.reduce((a,d) => expanded2.has(d) ? a + 1 : a, 0);
console.log("Part 2 : ", p2);

console.timeEnd('Time   ');

    