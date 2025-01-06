const aoc = require('./aoc');
const [buffer, test] = aoc.readfilePro(19);
// const buffer = aoc.readfile('day19.txt');
const blueprints = buffer.split(/\n/).map(aoc.extractNums)
    .map(x => ({
        id: x[0],
        ore: [x[1], 0, 0], //{ ore: x[1] }, 
        clay: [x[2], 0, 0,], //{ ore: x[2] }, 
        obsidian: [x[3], x[4], 0], //{ ore: x[3], clay: x[4] }, 
        geode: [x[5], 0, x[6]], // { ore: x[5], obsidian: x[6] },
        max: [Math.max(x[1], x[2], x[3], x[5]), x[4], x[6]]
    }))


const memo = new Map();
// tm = 0

// ore, clay, obsidian, geode
const dfs = (bp, remaining,
    [ore, clay, obsidian, geode],
    [orebots, claybots, obsidianbots, geodebots], hisory) => {

    if (remaining === 0) {
        return geode;
    }

    const key = `${remaining} m ${ore},${clay},${obsidian},${geode}  r ${orebots},${claybots},${obsidianbots},${geodebots}`;

    if (memo.has(key)) { return memo.get(key); }
    // console.log(key);t


    // collect
    const [nore, nclay, nobsidian, ngeode] = [
        Math.min(ore + orebots, bp.max[0] * remaining),
        Math.min(clay + claybots, bp.max[1] * remaining),
        Math.min(obsidian + obsidianbots, bp.max[2] * remaining),
        geode + geodebots
    ];

    let max = 0;

    // build nothing
    max = Math.max(max, dfs(bp, remaining - 1,
        [nore, nclay, nobsidian, ngeode],
        [orebots, claybots, obsidianbots, geodebots], [...hisory, 'n', key, [nore, nclay, nobsidian, ngeode]]));

    if (ore >= bp.geode[0] && obsidian >= bp.geode[2]) {
        max = Math.max(max, dfs(bp, remaining - 1,
            [nore - bp.geode[0], nclay, nobsidian - bp.geode[2], ngeode],
            [orebots, claybots, obsidianbots, geodebots + 1], [...hisory, 'geode', key, [nore - bp.geode[0], nclay, nobsidian - bp.geode[2], ngeode]]));
    
        } else {

        if (orebots < bp.max[0] && ore >= bp.ore[0]) {
            max = Math.max(max, dfs(bp, remaining - 1,
                [nore - bp.ore[0], nclay, nobsidian, ngeode],
                [orebots + 1, claybots, obsidianbots, geodebots], [...hisory, 'ore', key, [nore - bp.ore[0], nclay, nobsidian, ngeode]]));
        }

        if (claybots < bp.max[1] && ore >= bp.clay[0]) {
            max = Math.max(max, dfs(bp, remaining - 1,
                [nore - bp.clay[0], nclay, nobsidian, ngeode],
                [orebots, claybots + 1, obsidianbots, geodebots], [...hisory, 'clay', key, [nore - bp.clay[0], nclay, nobsidian, ngeode]]));
        }

        if (obsidianbots < bp.max[2] && ore >= bp.obsidian[0] && clay >= bp.obsidian[1]) {
            max = Math.max(max, dfs(bp, remaining - 1,
                [nore - bp.obsidian[0], nclay - bp.obsidian[1], nobsidian, ngeode],
                [orebots, claybots, obsidianbots + 1, geodebots], [...hisory, 'obsd', key, [nore - bp.obsidian[0], nclay - bp.obsidian[1], nobsidian, ngeode]]));
        }

    }

    memo.set(key, max);

    // if (tm < max) {
    //     console.log(tm)
    //     tm = max
    // }

    return max;
}

const runBlueprint = (blueprint, time) => {
    memo.clear();
    return dfs(blueprint, time, [0, 0, 0, 0], [1, 0, 0, 0], []);
}


let p1 = 0;
for (const blueprint of blueprints) {
    // console.log('blueprint', blueprint);
    const geodes = runBlueprint(blueprint, 24);
    // console.log('result', blueprint.id, ' : ', geodes);
    p1 += geodes * blueprint.id;
}
console.log('Part 1 : ', p1); // 1703
// process.exit(0);

let p2 = 1
for (let i = 0; i < 3; i++) {
    const blueprint = blueprints[i];
    // console.log('blueprint', blueprint);
    const geodes = runBlueprint(blueprint, 32);
    // console.log('result : ', geodes);
    p2 *= geodes;

}
console.log('Part 2 : ', p2); // 5301
