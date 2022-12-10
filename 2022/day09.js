const aoc = require('./aoc');
const buffer = aoc.readfile('day09.txt');
const text = buffer.split(/\n/);
const steps = text.map(x => x.split(' ')).map((x) => [x[0], parseInt(x[1])])

const simulate = (rope) => {
    visited = [[0, 0]]
    for (const step of steps) {
        for (let i = 0; i < step[1]; i++) {

            direction = step[0]
            head = rope[0]

            switch (direction) {
                case 'U': head = [head[0], head[1] + 1]; break;
                case 'R': head = [head[0] + 1, head[1]]; break;
                case 'D': head = [head[0], head[1] - 1]; break;
                case 'L': head = [head[0] - 1, head[1]]; break;
            }

            // move two knots
            const moveKnot = (head, tail) => {
                needsToMove = (tail[0] > head[0] + 1) || (tail[0] < head[0] - 1) || (tail[1] > head[1] + 1) || (tail[1] < head[1] - 1)
                if (needsToMove) {
                    if (head[0] < tail[0]) tail = [tail[0] - 1, tail[1]]
                    if (head[0] > tail[0]) tail = [tail[0] + 1, tail[1]]
                    if (head[1] < tail[1]) tail = [tail[0], tail[1] - 1]
                    if (head[1] > tail[1]) tail = [tail[0], tail[1] + 1]
                }
                return tail
            }

            next = [head]
            for (let i = 0; i < rope.length - 1; i++) {
                nextTail = moveKnot(next[i], rope[i + 1])
                next.push(nextTail)
            }

            // add tail to end
            visited.push(rope[rope.length - 1])
            rope = next
        }

        // dedup the visited list
        visited = [...new Set(visited.map(JSON.stringify))].map(JSON.parse)

    }
    // console.log(visited)
    return visited.length
}

p1 = simulate(Array(2).fill([0,0]))
console.log("Part 1 : ", (p1)) // 6332

p2 = simulate(Array(10).fill([0,0]))
console.log("Part 2 : ", (p2)) // 2511
