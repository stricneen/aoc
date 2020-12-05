const aoc = require('./aoc');    
const buffer = aoc.readfile('day04.txt');
const text = buffer.split(/\n/);

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

var part1ValidPassports = 0, p1Valid = 0;
var part2ValidPassports = 0, p2Valid = 0;

for(var i=0;i<text.length;i++) {

    if (text[i].length == 0) {
        if (p1Valid == 7) part1ValidPassports++;
        if (p2Valid == 7) part2ValidPassports++;
        p1Valid = 0;
        p2Valid = 0;
        continue;
    }

    var fields = text[i].split(' ');
    for(var j = 0; j<fields.length; j++) {

        var name = fields[j].split(':')[0];
        var val = fields[j].split(':')[1];

        // Part 1 check
        if (requiredFields.includes(name)) {
            p1Valid++;
        }


        if (requiredFields.includes(name)) {
            
            // byr (Birth Year) - four digits; at least 1920 and at most 2002.
            if (name == 'byr' && parseInt(val) >= 1920 && parseInt(val) <= 2002) {
                p2Valid++;
            }
            
            // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
            if (name == 'iyr' && parseInt(val) >= 2010 && parseInt(val) <= 2020) {
                p2Valid++;
            }
            
            // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
            if (name == 'eyr' && parseInt(val) >= 2020 && parseInt(val) <= 2030) {
                p2Valid++;
            }
            
            // hgt (Height) - a number followed by either cm or in:
            // If cm, the number must be at least 150 and at most 193.
            // If in, the number must be at least 59 and at most 76.
            if (name == 'hgt') {
                var uom = val.slice(-2);
                var num = parseInt(val.substring(0, val.length - 2));
                if (uom == 'cm' && num >= 150 && num <=193){
                    p2Valid ++;
                }
                if (uom == 'in' && num >= 59 && num <=76){
                    p2Valid ++;
                }
            }

            // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
            if(name == 'hcl' && val.length == 7 && val[0] == '#'){
                p2Valid++;
            }

            // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
            if (name == 'ecl' && ['amb','blu','brn','gry','grn','hzl','oth'].includes(val)) {
                p2Valid++;
            }

            // pid (Passport ID) - a nine-digit number, including leading zeroes.
            if (name == 'pid' && val.length == 9 && aoc.isNumber(val)) {
                p2Valid++;
            }

        }   
    }
}

console.log("Part 1 : ", part1ValidPassports);
console.log("Part 2 : ", part2ValidPassports);
    