use std::collections::HashSet;
use std::iter::FromIterator;

pub fn day4() {
    
    fn hashset(data: Vec<&str>) -> HashSet<&str> {
        HashSet::from_iter(data.iter().cloned())
    }

    let mut total1 = 0;
    let filename = "data/day04.txt";
    for line in common::common::FileLines::new(filename.to_string()) {

        //println!("=> {}", line);

        let words:Vec<&str> = line.split_whitespace().collect();

        let length = words.len();
        let hash = hashset(words);

        if length == hash.len() {
            total1 += 1;
        }
        
        
    }
    println!("Part 1 :  {}", total1);
}


