const aoc = require('./aoc');
const buffer = aoc.readfile('day09.txt');
const text = buffer.split(/\n/);
const input = text.map(x => parseInt(x));

const preamble = 25;

const findSum = (val, pre) => {
    for(var i = 0; i < pre.length; i++) 
        for(var j = 0; j < pre.length; j++) 
            if (pre[i] + pre[j] == val) 
                return true;
    return false;
}

const weakness = () => {
    for (var i = 0; i < input.length; i++) {
        const pre = input.slice(i, i + preamble);
        const val = input[i + preamble];
        const sum = findSum(val,pre);
        if (!sum) return val;
    }
}

const contiguous = (p1) => {
    for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < input.length; j++) {
            var slice = input.slice(i,j);
            var sum = aoc.sum(slice);
            if (sum > p1) break;
            if (sum == p1) return Math.min(...slice) + Math.max(...slice);
        }
    }
}

const p1 = weakness();
console.log("Part 1 : ", p1)
console.log("Part 2 : ", contiguous(p1));
                