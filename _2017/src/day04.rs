use std::collections::HashSet;
use std::iter::FromIterator;
use itertools::Itertools;

pub fn day4() {
    
    fn hashset(data: Vec<&str>) -> HashSet<&str> {
        HashSet::from_iter(data.iter().cloned())
    }

    fn hashset2(data: Vec<String>) -> HashSet<String> {
        HashSet::from_iter(data.iter().cloned())
    }

    let mut total1 = 0;
    let filename = "data/day04.txt";
    for line in common::common::FileLines::new(filename.to_string()) {

        //println!("=> {}", line);
        let wordy = "I am a hello world example";

        let s = wordy.chars().collect::<String>();

        let words:Vec<String> = line.split_whitespace()
                .map(|x| x.chars().sorted().collect::<String>())
                .collect();
                
                
        let length = words.len();
        let hash = hashset2(words);

        if length == hash.len() {
            total1 += 1;
        }
        
        
    }
    println!("Part 1 :  {}", total1);
}


