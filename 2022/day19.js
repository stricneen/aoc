const aoc = require('./aoc');
const buffer = aoc.readfile('day19.txt');
const data = buffer.split(/\n/).map(aoc.extractNums)
    .map(x => ({ blueprint: x[0], ore: { ore: x[1] }, clay: { ore: x[2] }, obsidian: { ore: x[3], clay: x[4] }, geode: { ore: x[5], obsidian: x[6] } }))

const clone = (json) => JSON.parse(JSON.stringify(json));

// console.log(data)

// ore  -       cost x ore
// clay  -      cost x ore
// obsidian -   cost x ore && y clay
// geode -      cost x ore && y obsidian

// Blueprint 1:
//   Each ore robot costs 4 ore.
//   Each clay robot costs 2 ore.
//   Each obsidian robot costs 3 ore and 14 clay.
//   Each geode robot costs 2 ore and 7 obsidian.

// Blueprint 2:
//   Each ore robot costs 2 ore.
//   Each clay robot costs 3 ore.
//   Each obsidian robot costs 3 ore and 8 clay.
//   Each geode robot costs 3 ore and 12 obsidian.
const test1 = { blueprint: 1, ore: { ore: 4 }, clay: { ore: 2 }, obsidian: { ore: 3, clay: 14 }, geode: { ore: 2, obsidian: 7 } }
const test2 = { blueprint: 2, ore: { ore: 2 }, clay: { ore: 3 }, obsidian: { ore: 3, clay: 8 }, geode: { ore: 3, obsidian: 12 } }

const maxResource = (bp) => ({
    ore: Math.max(bp.ore.ore, bp.clay.ore, bp.obsidian.ore, bp.geode.ore),
    clay: bp.obsidian.clay,
    obsidian: bp.geode.obsidian
});



const initState = [{
    resources: { ore: 0, clay: 0, obsidian: 0, geode: 0 },
    robots: { ore: 1, clay: 0, obsidian: 0, geode: 0 },
    production: { ore: 0, clay: 0, obsidian: 0, geode: 0 },
}]

tt = [
    {
        resources: { ore: 2, clay: 1, obsidian: 0, geode: 0 },
        robots: { ore: 1, clay: 1, obsidian: 0, geode: 0 },
        production: { ore: 0, clay: 0, obsidian: 0, geode: 0 }
    },
    {
        resources: { ore: 2, clay: 0, obsidian: 0, geode: 0 },
        robots: { ore: 1, clay: 1, obsidian: 0, geode: 0 },
        production: { ore: 0, clay: 0, obsidian: 0, geode: 0 }
    },
    {
        resources: { ore: 4, clay: 0, obsidian: 0, geode: 0 },
        robots: { ore: 1, clay: 0, obsidian: 0, geode: 0 },
        production: { ore: 0, clay: 0, obsidian: 0, geode: 0 }
    }
]

// const narrow = (space) => {

//     for (let i = 0; i < space.length; i++) {
//         const element = space[i];

//         const others = space.filter(x =>
//             x.robots.ore === element.robots.ore &&
//             x.robots.clay === element.robots.clay &&
//             x.robots.obsidian === element.robots.obsidian &&
//             x.robots.geode === element.robots.geode &&

//             (x.resources.ore !== element.resources.ore ||
//             x.resources.clay !== element.resources.clay ||
//             x.resources.obsidian !== element.resources.obsidian ||
//             x.resources.geode !== element.resources.geode)
//         )

//         if (others.some(x => x.resources.ore >= element.resources.ore &&
//             x.resources.clay >= element.resources.clay &&
//             x.resources.obsidian >= element.resources.obsidian &&
//             x.resources.geode >= element.resources.geode)) {

//             element.delete = true

//         }


//         // console.log(element, others)

//     }


// // console.log(space)

//     return space.filter(x => x.delete !== true)
// }

const narrow = (space) => {
    
}

const simulate = (bp, min = 1, state = clone(initState)) => {
    if (min === 25) { //25) {
        max = 0
        for (const s of state) {
            max = Math.max(max, s.resources.geode)
        }
        console.log(max * bp.blueprint)
        return max * bp.blueprint
    }

    // console.log(state.filter(x => x.resources.geode > 0))
    // console.log(maxResource(bp))
    console.log('Minute', min)

    next = []

    // Spend - can we buy a robot ?
    for (const n of state) {

        bought = false
        // geode
        if (n.resources.ore >= bp.geode.ore && n.resources.obsidian >= bp.geode.obsidian) {
            branch = clone(n)
            branch.production.geode = 1
            branch.resources.ore -= bp.geode.ore
            branch.resources.obsidian -= bp.geode.obsidian
            next.push(branch)
            bought = true
        }

        // obsidian
        if (n.resources.ore >= bp.obsidian.ore && n.resources.clay >= bp.obsidian.clay) {
            branch = clone(n)
            branch.production.obsidian = 1
            branch.resources.ore -= bp.obsidian.ore
            branch.resources.clay -= bp.obsidian.clay
            next.push(branch)
            bought = true
        }

        // clay
        if (n.resources.ore >= bp.clay.ore) {
            branch = clone(n)
            branch.production.clay = 1
            branch.resources.ore -= bp.clay.ore
            next.push(branch)
            bought = true
        }

        // buy an ore ?
        if (n.resources.ore >= bp.ore.ore) {
            branch = clone(n)
            branch.production.ore = 1
            branch.resources.ore -= bp.ore.ore
            next.push(branch)
            bought = true
        }

        next.push(n)

    }


    // Collect
    for (const n of next) {
        n.resources.ore += n.robots.ore;
        n.resources.clay += n.robots.clay;
        n.resources.obsidian += n.robots.obsidian;
        n.resources.geode += n.robots.geode;
    }

    // Add robots
    for (const n of next) {
        if (n.production.ore === 1) {
            n.robots.ore += 1
            n.production.ore = 0
        }
        if (n.production.clay === 1) {
            n.robots.clay += 1
            n.production.clay = 0
        }
        if (n.production.obsidian === 1) {
            n.robots.obsidian += 1
            n.production.obsidian = 0
        }
        if (n.production.geode === 1) {
            n.robots.geode += 1
            n.production.geode = 0
        }
    }


    const dedup = [... new Set(next.map(JSON.stringify))].map(JSON.parse)

    const n = narrow(dedup)
    console.log(n)

    return simulate(bp, min + 1, n)
}

// const t1 = simulate(test2);
console.log('t1', simulate(test1))
// console.log('t2', simulate(test2))


// p1 = aoc.sum(data.map(t => simulate(t)))

// console.log(narrow(tt))

p1 = p2 = 0;
console.log('Part 1 : ', p1); // 
// console.log('Part 2 : ', p2); //x/