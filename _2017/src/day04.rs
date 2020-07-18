// use itertools::Itertools; 


pub fn day4() {
    
    let filename = "data/day04.txt";
    for x in common::common::FileLines::new(filename.to_string()) {

        println!("=> {}", x);
    }
}


