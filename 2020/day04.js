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
        var val = its[j].split(':')[1];
console.log(name,val);

if (fields.includes(name)) {
    
    // byr (Birth Year) - four digits; at least 1920 and at most 2002.
    // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
            if (name == 'byr') {
                if (val.length == 4 && parseInt(val) >= 1920 && parseInt(val) <= 2002) {
                items++
                }
            }

            if (name == 'iyr') {
                if (val.length == 4 && parseInt(val) >= 2010 && parseInt(val) <= 2020) {
                items++
            }
            }

            if (name == 'eyr') {
                if (val.length == 4 && parseInt(val) >= 2020 && parseInt(val) <= 2030) {
                items++
                }
            }
            
            // hgt (Height) - a number followed by either cm or in:
            // If cm, the number must be at least 150 and at most 193.
            // If in, the number must be at least 59 and at most 76.
            if (name == 'hgt') {

                var uom = val.slice(-2);

                if (uom == 'cm' || uom == 'in') {

                    var num = parseInt(val.substring(0, val.length - 2));

                    if (uom == 'cm' && num >= 150 && num <=193){
                        items ++

                    }

                    if (uom == 'in' && num >= 59 && num <=76){
                        items ++

                    }
                    

                }

                // if (val.length == 4 && parseInt(val) >= 2020 && parseInt(val) <= 2030) {
                // items++
                // }
            }

// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
            if(name == 'hcl') {
                if(val.length == 7 && val[0] == '#'){
                items++}
            }


// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
if (name == 'ecl') {
    if (['amb','blu','brn','gry','grn','hzl','oth'].includes(val)) {
    items++
    }
}

// pid (Passport ID) - a nine-digit number, including leading zeroes.
if (name == 'pid') {
    if (val.length == 9 && /^\d+$/.test(val)) {


    items++
    }
}


// cid (Country ID) - ignored, missing or not.



            // // items++;
            // used.push(name);
        }
        console.log(name);
        
    }

}




console.log(valid);
    