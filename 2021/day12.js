const aoc = require('./aoc');
const buffer = aoc.readfile('day12.txt');
const text = buffer.split(/\n/);
const tunnels = text.map(x => x.split('-')).map(y => ({ from: y[0], to: y[1] }));

const toPath = (path) => {
  const a = path.map(x => x.from);
  return [...a, path[path.length - 1].to];
}

const pathCount = (tunnels, paths, allowPair) => {

  if (paths.length === 0) {
    return pathCount([...tunnels, ...tunnels.map(x => ({ from: x.to, to: x.from }))],
      [...tunnels.filter(x => x.from === 'start').map(x => [x]),
      ...tunnels.filter(x => x.to === 'start').map(x => ([{ from: x.to, to: x.from }]))], allowPair);
  }

  if (paths.every(x => x[x.length - 1].to === 'end')) {
    return paths;
  }

  const next = paths.filter(x => x[x.length - 1].to === 'end');

  paths.filter(x => x[x.length - 1].to !== 'end').forEach(p => {
    tunnels.filter(x => x.from === p[p.length - 1].to && x.to !== 'start' && x.from !== 'start').forEach(y => {
      const path = toPath(p);
      const lc = path.filter(x => x === x.toLowerCase());
      const hasPair = (lc.length !== aoc.dedup(lc).length) || !allowPair;

      if ((y.to == y.to.toLowerCase() && (!path.includes(y.to)) || !hasPair) || y.to === y.to.toUpperCase()) {
        next.push([...p, y]);
      }
    });
  });

  return pathCount(tunnels, next, allowPair);
}

console.log('Part 1 :', pathCount(tunnels, [], false).length);
console.log('Part 2 :', pathCount(tunnels, [], true).length);