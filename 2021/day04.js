const aoc = require('./aoc');
const buffer = aoc.readfile('day04.txt');
const text = buffer.split(/\n/);
const numbers = text[0].split(',').map(x => parseInt(x));

let card = 1;
let lines = [];
let cols = [[], [], [], [], []];
let firstFound = false;
for (let i = 2; i <= text.length - 1; i++) {

  if (text[i].length === 0) {
    lines.push({ card: card + 1000, line: cols[0] })
    lines.push({ card: card + 1000, line: cols[1] })
    lines.push({ card: card + 1000, line: cols[2] })
    lines.push({ card: card + 1000, line: cols[3] })
    lines.push({ card: card + 1000, line: cols[4] })
    cols = [[], [], [], [], []];
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

for (const num of numbers) {

  lines.forEach((l) => {
    l.line = l.line.filter(x => x !== num);
  })

  const first = lines.find(x => x.line.length === 0)
  if (first && !firstFound) {
    firstFound = true;
    const firstLines = lines
      .filter(x => x.card === first.card)
      .reduce((a, e) => a + aoc.sum(e.line), 0);
    console.log('Part 1 : ', firstLines * num);
  }

  // get all completed cards
  const done = lines.filter(x => x.line.length === 0).map(x => x.card);
  if (done.length > 0 && lines.length === 10) {
    const w = lines.filter(x => x.card === done[0])
    const sum = w.reduce((a, e) => {
      return a + aoc.sum(e.line);
    }, 0);
    console.log('Part 2 : ', sum * num);
    break;
  }

  if (done.length > 0) {

    lines = lines.filter(x => !done.includes(x.card));
    lines = lines.filter(x => !done.includes(x.card + 1000));
    lines = lines.filter(x => !done.includes(x.card - 1000));
  }
}
