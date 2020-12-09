const aoc = require('./aoc');
const buffer = aoc.readfile('day09.txt');
const text = buffer.split(/\n/);
const input = text.map(x => parseInt(x));

const preambleCount = 25;

const findSum = (val, pre) => {
    for(var i = 0; i< pre.length; i++) 
        for(var j = 0; j< pre.length; j++) 
            if (pre[i] + pre[j] == val && i != j) 
                return true;
    return false;
}

for (var i = 0; i < input.length; i++) {
    const pre = input.slice(i, i +preambleCount);
    const val = input[i + preambleCount]

    // console.log(pre);
    // console.log(val);

    const sum = findSum(val,pre);
    if (!sum) {
        console.log("Part 1 : ", val);
        break;
    }
}


 const find = 14144619;
//const find = 127;

for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < input.length; j++) {

    
        var s = input.slice(i,j);

        var sum = aoc.sum(s);

        if (sum > find){
            break;
        }

        if (sum == find) {
            console.log(s);
            console.log(Math.max(...s) + Math.min(...s));
            break;
        }

    }

}

// console.log(s);