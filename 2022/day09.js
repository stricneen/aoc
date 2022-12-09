const aoc = require('./aoc');
const buffer = aoc.readfile('day09.txt');
const text = buffer.split(/\n/);

const steps = text.map(x => x.split(' ')).map((x) => [x[0], parseInt(x[1])])

head = [0, 0]
tail = [0, 0]

visited = [tail]
for (const step of steps) {
    console.log(step)
    for (let i = 0; i < step[1]; i++) {

        direction = step[0]

        // console.log(direction)
        console.log(head,tail)
        // move the head
        switch (direction) {
            case 'U': head = [head[0], head[1] + 1]; break;
            case 'R': head = [head[0] + 1, head[1]];break;
            case 'D': head = [head[0], head[1] - 1];break;
            case 'L': head = [head[0] - 1, head[1]];break;
        }

        // calc dist
        needsToMove = (tail[0] > head[0] + 1) || (tail[0] < head[0] - 1) ||  (tail[1] > head[1] + 1) || (tail[1] < head[1] - 1) 
        console.log(needsToMove)
      
        // should move ?


        // dist = Math.abs(head[0] - tail[0]) + Math.abs(head[1] - tail[1])
        

        //move
        if(needsToMove) {

            if (head[0] < tail[0]) tail = [tail[0] - 1 , tail[1]]
            if (head[0] > tail[0]) tail = [tail[0] + 1 , tail[1]]
            if (head[1] < tail[1]) tail = [tail[0] , tail[1] - 1]
            if (head[1] > tail[1]) tail = [tail[0] , tail[1]  +1]


            visited.push(tail)
        }
        console.log(head,tail)
console.log()


    }
    console.log(visited)
    console.log()

}


visited = [...new Set(visited.map(JSON.stringify))]
console.log(visited.length)

// console.log(steps)






p1 = p2 = 0

console.log("Part 1 : ", (p1)) // 
console.log("Part 2 : ", (p2)) // 
