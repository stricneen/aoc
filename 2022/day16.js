const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
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
// 2651 -- 
// 2586
// 2675 ****


const dedup = (a) => {

    s = a.map(x => JSON.stringify(x))
    s1 = [...new Set(s)]
    return s1.map(x => JSON.parse(x))


}

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
// 1798 l

// Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
// Valve BB has flow rate=13; tunnels lead to valves CC, AA
// Valve CC has flow rate=2; tunnels lead to valves DD, BB
// Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
// Valve EE has flow rate=3; tunnels lead to valves FF, DD
// Valve FF has flow rate=0; tunnels lead to valves EE, GG
// Valve GG has flow rate=0; tunnels lead to valves FF, HH
// Valve HH has flow rate=22; tunnel leads to valve GG
// Valve II has flow rate=0; tunnels lead to valves AA, JJ
// Valve JJ has flow rate=21; tunnel leads to valve II

// { at1: 'II', at2: 'DD', total: 0, open: [] },
// { at1: 'JJ', at2: 'DD', total: 0, open: [ 'DD' ] },
// { at1: 'JJ', at2: 'EE', total: 20, open: [ 'DD', 'JJ' ] },






const p2 = () => {
    let robots = [{ at1: 'AA', at2: 'AA', total: 0, open: [] }]

    for (let min = 1; min <= 26; min++) {
        // console.log(`--- Minute ${min}`)
        // // console.log(robots)
        // console.log()

        const next = []
        for (const robot of robots) {

            // add pressure
            robot.total += robot.open.reduce((a, e) => {
                return a + map.find(x => x.valve === e).flow
            }, 0)

            const loc1 = map.find(x => x.valve === robot.at1);
            const loc2 = map.find(x => x.valve === robot.at2);
     
            r1open = undefined
            r2open = undefined
            // robot 1
            if (!robot.open.includes(loc1.valve) && loc1.flow > 0) { // worth opening
                next.push({ ...robot, open: robot.open.concat(loc1.valve) })
                // r1open = loc1.valve
            } 

            // robot 2
            if (!robot.open.includes(loc2.valve) && loc2.flow > 0) { // worth opening
                next.push({ ...robot, open: robot.open.concat(loc2.valve) })
                // r2open = loc2.valve
            } 

                    // robot 2
            if (!robot.open.includes(loc1.valve) && loc1.flow > 0 && !robot.open.includes(loc2.valve) && loc2.flow > 0) { // worth opening
                        next.push({ ...robot, open: [...new Set(robot.open.concat([loc1.valve, loc2.valve]))] })
                        // r2open = loc2.valve
                    } 
            
            // r1paths = r1open ? [robot.at1] : loc1.paths
            // r2paths = r2open ? [robot.at2] : loc2.paths

            // for (const n1 of r1paths) {
            //     for (const n2 of r2paths) {
            //         next.push({ ...robot, at1: n1, at2: n2,  open: [... new Set(robot.open.concat([r1open, r2open]).filter(x => !!x))] })
            //         // next.push({ ...robot, at1: n1, at2: n2})
            //     }
            // }
            
            // add all moves (no opens)
            for (const n1 of loc1.paths) {
                for (const n2 of loc2.paths) {
                    // next.push({ ...robot, at1: n1, at2: n2,  open: [... new Set(robot.open.concat([r1open, r2open]).filter(x => !!x))] })
                    next.push({ ...robot, at1: n1, at2: n2})
                }
            }
        }

        robots = [...next]

//        robots = []

        // for (const loc of map) {
        //     const robs = next.filter(x => x.at1 === loc.valve)
        //     for (const v of robs) {
        //         const n = robots.find(x =>
        //             x.at1 === v.at1 &&
        //             x.at2 === v.at2 &&
        //             x.open.sort().join('') === v.open.sort().join(''))
        //         if (n) {
        //             if (n.total < v.total) n.total = v.total
        //         } else {
        //             robots.push(v)
        //         }
        //     }
        // }

        // for (const loc of map) {
        //     const robs = next.filter(x => x.at2 === loc.valve)
        //     for (const v of robs) {
        //         const n = robots.find(x =>
        //             x.at1 === v.at1 &&
        //             x.at2 === v.at2 &&
        //             x.open.sort().join('') === v.open.sort().join(''))
        //         if (n) {
        //             if (n.total < v.total) n.total = v.total
        //         } else {
        //             robots.push(v)
        //         }
        //     }
        // }

        robots = dedup(robots)
        robots.sort((a, b) => b.total - a.total)
// console.log('>', robots.length)
        if (robots.length > 500000) {
            robots = robots.slice(0, 500000)
        }

        console.log(`--- Minute ${min}`)
        // console.log(robots)
        // console.log(Math.max(...robots.map(x => x.total)))
        console.log()
        // console.log(robots)
    }
    robots.sort((a, b) => b.total - a.total)
    robots = robots.slice(0, 100000)
    return Math.max(...robots.map(x => x.total))
}

//          1707
//          2586


console.log('Part 1 : ', p1()); //
console.log('Part 2 : ', p2()); //