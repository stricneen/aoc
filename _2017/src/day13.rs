use std::collections::HashMap;

pub fn day() {
    let filename = "data/day13.txt";
    let mut firewall = HashMap::new();
    for line in common::common::FileLines::new(filename.to_string()) {
        
        let words: Vec::<&str> = line
            .split(':')
            .collect();
       
        firewall.insert(
            words[0].parse::<i32>().unwrap(),
            words[1].trim().parse::<i32>().unwrap()
        );
    } 
    // println!("{:?}", firewall);

    let p1 = firewall.iter().fold(0, |acc, x| {
        if x.0 <= &1 {
            return acc
        }

        if  x.0 % ((x.1 -1 ) * 2) == 0 {
            acc + (x.0 * x.1)
        } else {
            acc
        }
    });
    

    println!("Part 1 : {:?}", p1);
}
