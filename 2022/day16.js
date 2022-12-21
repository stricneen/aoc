const aoc = require('./aoc');
const buffer = aoc.readfile('day16.txt');
const map = buffer.split(/\n/)
    .map(x => [x.split(' '), aoc.extractNums(x)])
    .map(x => ({
        valve: x[0][1],
        flow: x[1][0],
        open: false,
        paths: x[0].slice(x[0].findIndex(y => y.startsWith('valve')) + 1)
            .map(x => x.replace(',', ''))
    }))
// console.log(map)
//Valve AA has flow rate=0; tunnels lead to valves DD, II, BB

// 1786 l
// pairing = 1
// let robots = [{who: 'me', p: 0,at: 'AA', total: 0, open:[]},{who: 'nelly',p: 0,at: 'AA', total: 0, open:[]}]

const p1 = () => {
    let robots = [{ who: 'me', at: 'AA', total: 0, open: [] }]

    for (let min = 1; min <= 30; min++) {
        // console.log(`--- Minute ${min}`)
        // console.log(robots)
        // console.log()

        const next = []
        for (const robot of robots) {
            robot.total += robot.open.reduce((a, e) => {
                return a + map.find(x => x.valve === e).flow
            }, 0)


            const loc = map.find(x => x.valve === robot.at);

            if (!robot.open.includes(loc.valve) && loc.flow > 0) { // worth opening
                next.push({ ...robot, open: robot.open.concat(loc.valve) })
            } else { //move
                for (const n of loc.paths) {
                    next.push({ ...robot, at: n })
                }
            }
        }

        robots = []
        for (const loc of map) {
            const robs = next.filter(x => x.at === loc.valve)
            for (const v of robs) {
                const n = robots.find(x =>
                    x.at === v.at &&
                    x.who === v.who &&
                    x.p === v.p &&
                    x.open.sort().join('') === v.open.sort().join(''))
                if (n) {
                    if (n.total < v.total) n.total = v.total
                } else {
                    robots.push(v)
                }
            }
        }


        robots.sort((a, b) => b.total - a.total)
        if (robots.length > 1000) {
            robots = robots.slice(0, robots.length / 10)
        }
        // console.log(robots)
    }
    return Math.max(...robots.map(x => x.total))
}

// 1788 l

const p2 = () => {
    let robots = [{ at1: 'AA', at2: 'AA', total: 0, open: [] }]

    for (let min = 1; min <= 26; min++) {
        console.log(`--- Minute ${min}`)
        console.log(robots)
        console.log()

        const next = []
        for (const robot of robots) {

            // add pressure
            robot.total += robot.open.reduce((a, e) => {
                return a + map.find(x => x.valve === e).flow
            }, 0)

            const loc1 = map.find(x => x.valve === robot.at1);
            const loc2 = map.find(x => x.valve === robot.at2);
            // what can open
            // toOpen = []
            // if (!robot.open.includes(loc1.valve) && loc1.flow > 0) {
            //     toOpen.push(loc1.valve)
            // }
            // if (!robot.open.includes(loc2.valve) && loc2.flow > 0) {
            //     toOpen.push(loc2.valve)
            // }

            // robot 1
            if (!robot.open.includes(loc1.valve) && loc1.flow > 0) { // worth opening
                next.push({ ...robot, open: robot.open.concat(loc1.valve) })
            } else { //move
                for (const n of loc1.paths) {
                    next.push({ ...robot, at1: n })
                }
            }

            // robot 2
            if (!robot.open.includes(loc2.valve) && loc2.flow > 0) { // worth opening
                next.push({ ...robot, open: robot.open.concat(loc2.valve) })
            } else { //move
                for (const n of loc2.paths) {
                    next.push({ ...robot, at2: n })
                }
            }
        }

        robots = []
        for (const loc of map) {
            const robs = next.filter(x => x.at1 === loc.valve)
            for (const v of robs) {
                const n = robots.find(x =>
                    x.at1 === v.at1 &&
                    x.at2 === v.at2 &&
                    x.open.sort().join('') === v.open.sort().join(''))
                if (n) {
                    if (n.total < v.total) n.total = v.total
                } else {
                    robots.push(v)
                }
            }
        }
        for (const loc of map) {
            const robs = next.filter(x => x.at2 === loc.valve)
            for (const v of robs) {
                const n = robots.find(x =>
                    x.at1 === v.at1 &&
                    x.at2 === v.at2 &&
                    x.open.sort().join('') === v.open.sort().join(''))
                if (n) {
                    if (n.total < v.total) n.total = v.total
                } else {
                    robots.push(v)
                }
            }
        }

        robots.sort((a, b) => b.total - a.total)
        if (robots.length > 1000) {
            robots = robots.slice(0, robots.length / 10)
        }
        console.log(robots)
    }
    return Math.max(...robots.map(x => x.total))
}


// console.log('Part 1 : ', p1()); //
console.log('Part 2 : ', p2()); //