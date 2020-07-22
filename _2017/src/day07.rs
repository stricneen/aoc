use std::collections::HashSet;
use std::collections::HashMap;


pub fn day7() {
    let filename = "data/day.txt";

    let mut under = HashSet::<String>::new();
    let mut over = HashSet::<String>::new();

    let mut weights = HashMap::new();

    for line in common::common::FileLines::new(filename.to_string()) {
        let words: Vec::<&str> = line.split_whitespace().collect();

        under.insert(words[0].to_string());
        let mut o = Vec::<String>::new();
        if words.len() > 3 {
            for w in words.iter().skip(3) {
                o.push(w.to_string().replace(",", ""));
                over.insert(w.to_string().replace(",", ""));    
            }
        }


        weights.insert(words[0].to_string(), (words[1].replace("(","").replace(")","").parse::<i32>().unwrap(), o));
    }

    for (k,v) in &weights {
        println!("{} : {:?}", k,v );
    }

    for w in under.iter() {
        if over.contains(w) == false {
            println!("Part 1 : {}", w);
        }
    }


    // println!("{:?}", under);
    // println!("{:?}", over);
}
