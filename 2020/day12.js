const { maxHeaderSize } = require('http');
const aoc = require('./aoc');
const buffer = aoc.readfile('day12.txt');
const text = buffer.split(/\n/);

const dirs = text.map(x => {return {d:x[0], dist: parseInt(x.substring(1))} });
    
const p2 = dirs.reduce((a,e) => {
    
    if (e.d == 'F') {
        return { ...a,  pos: {x: a.pos.x + a.waypoint.x * e.dist, y:  a.pos.y + a.waypoint.y * e.dist }};
    }

    if (e.d == 'R') {
        if (e.dist == 90)  return { ...a,  waypoint: {x: -a.waypoint.y, y: a.waypoint.x}};
        if (e.dist == 180) return { ...a,  waypoint: {x: -a.waypoint.x, y: -a.waypoint.y}};
        if (e.dist == 270) return { ...a,  waypoint: {x: a.waypoint.y, y: -a.waypoint.x}};
    }
 
    if (e.d == 'L') {
        if (e.dist == 90)  return { ...a,  waypoint: {x: a.waypoint.y, y: -a.waypoint.x}};
        if (e.dist == 180) return { ...a,  waypoint: {x: -a.waypoint.x, y: -a.waypoint.y}};
        if (e.dist == 270) return { ...a,  waypoint: {x: -a.waypoint.y, y: a.waypoint.x}};
    }

    if (e.d == 'N') return { ...a, waypoint: {x: a.waypoint.x, y: a.waypoint.y - e.dist}};    
    if (e.d == 'S') return { ...a, waypoint: {x:a.waypoint.x, y: a.waypoint.y + e.dist}};
    if (e.d == 'E') return { ...a, waypoint: {x:a.waypoint.x + e.dist, y: a.waypoint.y}};
    if (e.d == 'W') return { ...a, waypoint: {x:a.waypoint.x - e.dist, y: a.waypoint.y}};
    
 
}, { pos: {x:0, y:0}, waypoint:{x: 10, y: -1}, facing: 'e'} );

console.log("Part 2  : " , Math.abs(p2.pos.x) + Math.abs(p2.pos.y));
