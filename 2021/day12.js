const aoc = require('./aoc');
const buffer = aoc.readfile('day.txt');
const text = buffer.split(/\n/);
const tunnels = text.map(x => x.split('-')).map(y => ({ from: y[0], to: y[1] }));

const pathCount = (tunnels, paths, allowPair) => {

  if (paths.length === 0) {
    return pathCount([...tunnels, ...tunnels.map(x => ({ from: x.to, to: x.from }))],
      [...tunnels.filter(x => x.from === 'start').map(x => ['start', x.to]),
      ...tunnels.filter(x => x.to === 'start').map(x => (['start', x.from]))], allowPair);
  }

  if (paths.every(x => x[x.length - 1] === 'end')) {
    return paths;
  }

  const next = paths.filter(x => x[x.length - 1] === 'end');

  paths.filter(x => x[x.length - 1] !== 'end').forEach(path => {
    tunnels.filter(x => x.from === path[path.length - 1] && x.to !== 'start' && x.from !== 'start').forEach(tunnel => {
      

      const lc = path.filter(x => x === x.toLowerCase());
      const hasPair = (lc.length !== aoc.dedup(lc).length) || !allowPair;

      if ((tunnel.to == tunnel.to.toLowerCase() && (!path.includes(tunnel.to)) || !hasPair) || tunnel.to === tunnel.to.toUpperCase()) {
        
      // console.log('ad')
        next.push([...path, tunnel.to]);
      }
    });
  });
  return pathCount(tunnels, next, allowPair);
}

console.log('Part 1 :', pathCount(tunnels, [], false).length);
console.log('Part 2 :', pathCount(tunnels, [], true).length);