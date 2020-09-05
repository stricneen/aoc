use std::collections::HashMap;

pub fn day16() {
    let filename = "data/day16.txt";
    for line in common::common::FileLines::new(filename.to_string()) {
        
        let words: Vec::<&str> = line.split(',').collect();
        let o_row = String::from("abcdefghijklmnop");      
        let mut row = String::from("abcdefghijklmnop");   
        let mut p1 = String::from("");  
        let mut p2 = 0;
         
        
        let mut cycle = HashMap::new();

        for i in 1..1_000_000_000   {
        
            for inst in &words {
                //println!("{}", inst);
                // s1, a spin of size 1: eabcd.
                // ,x3/4 swapping the last two programs: eabdc.
                // pe/b, swapping programs e and b: baedc.


                if inst.starts_with('s') {
                    let spl = inst.chars().skip(1).collect::<String>().parse::<usize>().unwrap();
                    let s = row.chars().skip(16-spl).collect::<String>();
                    let t = row.chars().take(16-spl).collect::<String>();
                    row = s + &t;
                }

                if inst.starts_with('x') {
                    let a1 = inst.chars().skip(1).take_while(|x| x != &'/').collect::<String>().parse::<usize>().unwrap();
                    let b1 = inst.chars().skip_while(|x| x != &'/').skip(1).collect::<String>().parse::<usize>().unwrap();
                                
                    let a = row.chars().nth(a1).unwrap();
                    let b = row.chars().nth(b1).unwrap();

                    unsafe {
                        let bytes = row.as_bytes_mut();
                        bytes[a1] = b as u8;
                        bytes[b1] = a as u8;
                    }
                }

                if inst.starts_with('p') {
                    let a = inst.chars().skip(1).nth(0).unwrap();
                    let b = inst.chars().skip(3).nth(0).unwrap();
                    let a1 = row.find(a).unwrap();
                    let b1 = row.find(b).unwrap();
                    unsafe {
                        let bytes = row.as_bytes_mut();
                        bytes[a1] = b as u8;
                        bytes[b1] = a as u8;
                    }
                }        
            }
        
            cycle.insert(i, row.clone());
            //println!("{} {}",i, row);
            if i == 1 {
                p1 = row.clone();
            }
            if row == o_row {
                p2 = 1_000_000_000 % i;
                break;
            }
        }
        //println!("Insts : {}", instructions.len());
        println!("Part 1 : {}", p1);
        assert_eq!("hmefajngplkidocb", p1);
        println!("Part 2 : {}", cycle[&p2]);
    }
}

