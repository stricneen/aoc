const aoc = require('./aoc');
    
const buffer = aoc.readfile('day04.txt');
// 215
const text = buffer.split(/\n/);
// const input = text.map(x => parseInt(x));

// const fold = text.reduce((acc, l) => {

//     if (l.length == 0) {
//         return {l:acc, n: true};
//     }

//     if (l.n) {
//         return {l: acc.push(l), n: false};
//     }
//     else {
//         var t = acc;
//         // t[acc.length] += t[acc.length] + l;
//         return {l: t, n:false}
//     }

//     return l;
// }, {l:[], n:false});

const fields = [
    'byr', 
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'];


    var valid = 0;
var items = 0;
var used = [];

for(var i=0;i<text.length;i++) {

    // byr:1937 iyr:2017 cid:147 hgt:183cm
console.log('o');
    if (text[i].length == 0) {

        if (items == 7) {
            valid++;
            console.log('VALID');
        }

        used = [];
        items = 0;
        
        console.log('');
        continue;

    }

    var its = text[i].split(' ');
    for(var j = 0;j < its.length; j++) {
        var name = its[j].split(':')[0];



        if (fields.includes(name) && !used.includes(name)) {
            items++;
            used.push(name);
        }
        console.log(name);
        
    }

}




console.log(valid);
    