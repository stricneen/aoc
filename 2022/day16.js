const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const map = buffer.split(/\n/)
    .map(x => [x.split(' '), aoc.extractNums(x)])
    .map(x => ({
        valve: x[0][1], 
        flow: x[1][0], 
        open: false,
        paths: x[0].slice(x[0].findIndex(y => y.startsWith('valve'))+1)
            .map(x => x.replace(',','')) }))
// console.log(map)
//Valve AA has flow rate=0; tunnels lead to valves DD, II, BB

// 1786 l
pairing = 1
let robots = [{who: 'me', p: 0,at: 'AA', total: 0, open:[]},{who: 'nelly',p: 0,at: 'AA', total: 0, open:[]}]
for (let min = 0; min <= 5; min++) {
    console.log(`--- Minute ${min}`)
    console.log(robots)
    console.log()
    
    const next = []
    for (const robot of robots) {
        
        robot.total += robot.open.reduce((a,e) => {
            return a + map.find(x => x.valve === e).flow
        },0)
        

        const loc = map.find(x => x.valve === robot.at);

        if (!robot.open.includes(loc.valve) && loc.flow > 0) { // worth opening

            next.push({...robot, open: robot.open.concat(loc.valve)})

        } else { //move
            for (const n of loc.paths) {
                next.push({...robot, at: n})
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
    
    console.log(robots)
    // console.log()

   
    
}

// console.log(robots.length)
p1 = Math.max(...robots.map(x => x.total))
p2 = 0
console.log('Part 1 : ', p1); //
console.log('Part 2 : ', p2); //