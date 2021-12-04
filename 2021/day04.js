const aoc = require('./aoc');
const buffer = aoc.readfile('day04.txt');

const text = buffer.split(/\n/);



const numbers = text[0].split(',').map(x => parseInt(x));
// Lets never speak of this again...

let card = 1;
let lines = [];
let cols = [[], [], [], [], []]
for (let i = 2; i <= text.length - 1; i++) {

  if (text[i].length === 0) {



    lines.push({ card: card + 1000, line: cols[0] })
    lines.push({ card: card + 1000, line: cols[1] })
    lines.push({ card: card + 1000, line: cols[2] })
    lines.push({ card: card + 1000, line: cols[3] })
    lines.push({ card: card + 1000, line: cols[4] })
    cols = [[], [], [], [], []]


    card += 1;
  } else {
    lines.push({ card, line: text[i].split(' ').filter(x => x).map(x => parseInt(x)) })

    const n = text[i].split(' ').filter(x => x).map(x => parseInt(x));

    cols[0].push(n[0]);
    cols[1].push(n[1]);
    cols[2].push(n[2]);
    cols[3].push(n[3]);
    cols[4].push(n[4]);

  }

}

console.log(numbers)
console.log(lines)
let winner
numbers.forEach((num) => {


  lines.forEach((l) => {

    l.line = l.line.filter(x => x !== num);

  })


console.log(lines.length)

  lines.forEach((l) => {
    if (l.line.length === 0) {

    
console.log('winner')

      const w = lines.filter(x => x.card === l.card)  

      console.log(w)
      
      const sum =  lines.filter(x => x.card === l.card).reduce((a,e) => {
        return a + aoc.sum(e.line);

      },0);


      console.log(sum, num, sum * num);

      process.exit()
    }
  })
})

console.log(winner)


