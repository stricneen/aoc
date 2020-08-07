use std::collections::HashMap;

#[derive(Debug)]
struct Inst {
    reg: String,
    cmd: String,
    cmda: i32,
    chkreg: String,
    chktype: String,
    chk_val: i32
}

pub fn day8() {
    let filename = "data/day08.txt";
    let mut max1 = 0;
    let mut max2 = 0;

    let mut reg = HashMap::new();
    for line in common::common::FileLines::new(filename.to_string()) {
        //println!("{}", line);

        let words: Vec::<&str> = line.split_whitespace().collect();

        let i: Inst = Inst { 
            reg: words[0].to_string(),
            cmd: words[1].to_string(),
            cmda : words[2].parse::<i32>().unwrap(),
            chkreg: words[4].to_string(),
            chktype: words[5].to_string(),
            chk_val: words[6].parse::<i32>().unwrap(),
        };
        println!("{:?}", i);

        if reg.contains_key(&i.chkreg) == false {
            reg.insert(i.chkreg.to_string(), 0);
        }
        if reg.contains_key(&i.reg) == false {
            reg.insert(i.reg.to_string(), 0);
        }

        if check_if(&i, &reg) {
            let c = reg[&i.reg];
            if i.cmd == "inc" {
                reg.insert(i.reg, c + i.cmda);
            } else {
                reg.insert(i.reg, c - i.cmda);
            }

        }
     
        for k in reg.keys() {
            if reg[k] > max2 {
                max2 = reg[k];
            }
        }

    }
    // println!("{:?}", reg);

    

    for k in reg.keys() {
        if reg[k] > max1 {
            max1 = reg[k];
        }
    }

    println!("Part 1 : {}", max1);
    println!("Part 2 : {}", max2);
    
}

fn check_if(inst: &Inst, reg: &HashMap<String, i32>) -> bool{

    let reg_val = reg[&inst.chkreg];

    if inst.chktype == "==" {
        return reg_val == inst.chk_val;
    }
    if inst.chktype == ">" {
        return reg_val > inst.chk_val;
    }
    if inst.chktype == "<" {
        return reg_val < inst.chk_val;
    }
    if inst.chktype == ">=" {
        return reg_val >= inst.chk_val;
    }
    if inst.chktype == "<=" {
        return reg_val <= inst.chk_val;
    }
    if inst.chktype == "!=" {
        return reg_val != inst.chk_val;
    }

    assert!(false);


    
    return false;
}


// b inc 5 if a > 1
// a inc 1 if b < 5
// c dec -10 if a >= 1
// c inc -20 if c == 10
