use std::collections::HashSet;

pub fn day7() {
    let filename = "data/day07.txt";

    let mut under = HashSet::<String>::new();
    let mut over = HashSet::<String>::new();

    for line in common::common::FileLines::new(filename.to_string()) {
        // println!("{}", line);

        let words: Vec::<&str> = line.split_whitespace().collect();
            
        under.insert(words[0].to_string());

        if words.len() > 3 {

            for w in words.iter().skip(3) {
                over.insert(w.to_string().replace(",", ""));    
            }

        }

    }

    for w in under.iter() {
        if over.contains(w) == false {
            println!("Part 1 : {}", w);
        }
    }

    // println!("{:?}", under);
    // println!("{:?}", over);

}
