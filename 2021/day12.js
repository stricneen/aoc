const aoc = require('./aoc');
const buffer = aoc.readfile('day11.txt');
const text = buffer.split(/\n/);
const tunnels = text.map(x => x.split('-')).map(y => ({from:y[0], to:y[1]}));

let p1 = 0, p2 = 0;


  // start-A
    // start-b
    // A-c
    // A-b
    // b-d
    // A-end
    // b-end

const toPath = (path) => {
  //console.log('p',path)
  const a = path.map(x => x.from);
  return [...a, path[path.length-1].to];
}

const filter = (paths) => {

  const str = paths.map(x => JSON.stringify(x));
  const ds = [...new Set(str)].map(x => JSON.parse(x));


  return ds;
}

const pathCount = (tunnels, paths, c) => {
 console.log('')
 console.log(paths.map(x => toPath(x)));
 console.log(paths.length)
//console.log(paths);
  if (c===0) return paths.length;



  if (paths.length === 0) {
    return pathCount([...tunnels, 
      ...tunnels.map(x => ({from: x.to, to: x.from})),
    ],
    [...tunnels.filter(x => x.from === 'start').map(x => [x]),
    ...tunnels.filter(x => x.to === 'start').map(x => ([{from: x.to, to: x.from}]))], c);
  }

  if (paths.every(x => x[x.length - 1].to === 'end')) {
    return paths;
  }

  const next = paths.filter(x => x[x.length-1].to === 'end');

  paths.filter(x => x[x.length-1].to !== 'end').forEach(p => {
    tunnels.filter(x => x.from === p[p.length-1].to).forEach(y => {

      const yc =y.to.split('');
      if ((yc[0] === yc[0].toLowerCase() && !toPath(p).includes(y.to)) || yc[0] === yc[0].toUpperCase())

      next.push([...p, y]);
    });
  });



  return pathCount(tunnels, filter(next), c-1);
}


console.log('Part 1 :', pathCount(tunnels, [], 100).length);
console.log('Part 2 :', p2);