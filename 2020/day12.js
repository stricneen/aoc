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


dirs.map(e => {
    console.log();
console.log(e);
console.log("Facing", facing);

    if (e.d == 'F') {
        if (facing == 'n') { pos =  {x: pos.x,         y: pos.y - e.dist}}
        if (facing == 's')  { pos = {x: pos.x,         y: pos.y + e.dist}}
        if (facing == 'e') { pos = {x: pos.x + e.dist ,  y: pos.y}}
        if (facing == 'w'){ pos = {x: pos.x -e.dist, y: pos.y}}

    }

    if (e.d == 'R') {
        if (facing == 'n') {
            if (e.dist == 90) facing = 'e';
            if (e.dist == 180) facing = 's';
            if (e.dist == 270) facing = 'w';
        }
       else  if (facing == 's'){
            if (e.dist == 90) facing = 'w';
            if (e.dist == 180) facing = 'n';
            if (e.dist == 270) facing = 'e';
        }
        else if (facing == 'e') {
            if (e.dist == 90) facing = 's';
            if (e.dist == 180) facing = 'w';
            if (e.dist == 270) facing = 'n';
        }
        else if (facing == 'w') {
            if (e.dist == 90) facing = 'n';
            if (e.dist == 180) facing = 'e';
            if (e.dist == 270) facing = 's';
        }

// 1706

    }
 
    if (e.d == 'L') {
        if (facing == 'n') {
            if (e.dist == 90) facing = 'w';
            if (e.dist == 180) facing = 's';
            if (e.dist == 270) facing = 'e';
        }
 

        else if (facing == 's'){
            if (e.dist == 90) facing = 'e';
            if (e.dist == 180) facing = 'n';
            if (e.dist == 270) facing = 'w';
        }
    else if (facing == 'e') {
            if (e.dist == 90) facing = 'n';
            if (e.dist == 180) facing = 'w';
            if (e.dist == 270) facing = 's';
        }
        else if (facing == 'w') {
            if (e.dist == 90) facing = 's';
            if (e.dist == 180) facing = 'e';
            if (e.dist == 270) facing = 'n';
        }



    }
    if (e.d == 'N') {
        pos = {x: pos.x, y: pos.y - e.dist}
    }
    
    if (e.d == 'S') {
        pos = {x:pos.x, y: pos.y + e.dist}
    }
    if (e.d == 'E') {
        pos = {x:pos.x + e.dist, y: pos.y};
    }
    
    if (e.d == 'W') {
        pos = {x:pos.x -e.dist, y: pos.y}
    }
    
    //2998
console.log(pos);
    

//710
})

console.log("Part 1  : " , Math.abs(pos.x) + Math.abs(pos.y));

// console.log(pos);