const { maxHeaderSize } = require('http');
const aoc = require('./aoc');
const buffer = aoc.readfile('day12.txt');
const text = buffer.split(/\n/);
const input = text.map(x => parseInt(x));

// console.log(text);

const dirs = text.map(x => {return {d:x[0], dist: parseInt(x.substring(1))} });
console.log(dirs);
    

pos = { x: 0, y:0 };
var  facing = 'e';
waypoint = { x: 10, y: -1};

dirs.map(e => {
    console.log();
console.log(e);
console.log("Facing", facing);

    if (e.d == 'F') {
        pos =  {x: pos.x + waypoint.x * e.dist,         y:  pos.y + waypoint.y * e.dist}
     
    }

    if (e.d == 'R') {

        if (e.dist == 90) waypoint = {x: -waypoint.y, y: waypoint.x};
        if (e.dist == 180) waypoint = {x: -waypoint.x, y: -waypoint.y};
        if (e.dist == 270) waypoint = {x: waypoint.y, y: -waypoint.x};

    }
 
    if (e.d == 'L') {
        if (e.dist == 90) waypoint = {x: waypoint.y, y: -waypoint.x};
        if (e.dist == 180) waypoint = {x: -waypoint.x, y: -waypoint.y};
        if (e.dist == 270) waypoint = {x: -waypoint.y, y: waypoint.x};



    }
    if (e.d == 'N') {
        waypoint = {x: waypoint.x, y: waypoint.y - e.dist}
    }
    
    if (e.d == 'S') {
        waypoint = {x:waypoint.x, y: waypoint.y + e.dist}
    }
    if (e.d == 'E') {
        waypoint = {x:waypoint.x + e.dist, y: waypoint.y};
    }
    
    if (e.d == 'W') {
        waypoint = {x:waypoint.x -e.dist, y: waypoint.y}
    }
    
    //2998
console.log(pos);
    

//710
})

console.log("Part 1  : " , Math.abs(pos.x) + Math.abs(pos.y));

// console.log(pos);