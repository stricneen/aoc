const aoc = require('./aoc');
const buffer = aoc.readfile('day09.txt');
const text = buffer.split(/\n/);

const steps = text.map(x => x.split(' ')).map((x) => [x[0], parseInt(x[1])])

// head = [0, 0]
// tail = [0, 0]



const simulate = (rope) => {
    visited = [[0, 0]]
    for (const step of steps) {
        // console.log(step)
        for (let i = 0; i < step[1]; i++) {

            direction = step[0]
            head = rope[0]

            switch (direction) {
                case 'U': head = [head[0], head[1] + 1]; break;
                case 'R': head = [head[0] + 1, head[1]]; break;
                case 'D': head = [head[0], head[1] - 1]; break;
                case 'L': head = [head[0] - 1, head[1]]; break;
            }

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

        visited = [...new Set(visited.map(JSON.stringify))].map(JSON.parse)
        // console.log(visited)
        // ?    console.log()

    }
    return visited.length
}


p1rope = [[0, 0], [0, 0]]
p2rope = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]

p1 = simulate(p1rope)
p2 = simulate(p2rope)

console.log("Part 1 : ", (p1)) // 
console.log("Part 2 : ", (p2)) // 
