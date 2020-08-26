
pub fn day16() {
    let filename = "data/day16.txt";
    for line in common::common::FileLines::new(filename.to_string()) {
        
        let words: Vec::<&str> = line.split(',').collect();
        //println!("{:?}", words);

        

        let sp_words = words.iter().fold((0, vec![]), |mut acc, x| {
            if x.starts_with('s') {
                let spl = x.chars().skip(1).collect::<String>().parse::<i32>().unwrap();
                // acc.0 += spl;
                // acc.1.push("s0")
                acc.1.push("s0".to_string());
                return (acc.0 + spl, acc.1);
            } else {
                //acc.1.push(x);
                return acc;
            }
        
        });

        //println!("{:?}", spin);
        println!("{:?}", sp_words.0);

        let mut row = String::from("abcdefghijklmnop");      // let r = row..iter().skip(4).take();
    


        // for inst in words {
        //     // s1, a spin of size 1: eabcd.
        //     // x3/4, swapping the last two programs: eabdc.
        //     // pe/b, swapping programs e and b: baedc.
        //     if inst.starts_with('s') {
        //         let spl = inst.chars().skip(1).collect::<String>().parse::<usize>().unwrap();
        //         let s = row.chars().skip(16-spl).collect::<String>();
        //         let t = row.chars().take(16-spl).collect::<String>();
        //         row = s + &t;
        //     }

        //     if inst.starts_with('x') {
        //         let a1 = inst.chars().skip(1).take_while(|x| x != &'/').collect::<String>().parse::<usize>().unwrap();
        //         let b1 = inst.chars().skip_while(|x| x != &'/').skip(1).collect::<String>().parse::<usize>().unwrap();
        //         let a = row.chars().nth(a1).unwrap().to_string();
        //         let b = row.chars().nth(b1).unwrap().to_string();

        //         row = row.replace(&a, "!");
        //         row = row.replace(&b, &a);
        //         row = row.replace("!", &b);
        //     }

        //     if inst.starts_with('p') {
        //         let a = inst.chars().skip(1).take(1).collect::<String>();
        //         let b = inst.chars().skip(3).take(1).collect::<String>();
                
        //         row = row.replace(&a, "!");
        //         row = row.replace(&b, &a);
        //         row = row.replace("!", &b);
        //     }


            
        // }
        
        // println!("Part 1 : {}", row);

        // x3/15
        // pc/l
        // x13/9
        // pe/f
        // x3/14
        // s2
        // x8/10

        
        
        
        
    }
}