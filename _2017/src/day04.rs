use std::fs::File;
use std::io::{BufRead, BufReader};
// use itertools::Itertools; 

// Our struct will only iterator over odd numbers.
struct Odd {
    current: String,
}

// Nothing fancy in here...
impl Odd {
    fn new() -> Odd {
        Odd {
            // The first positive is 1, so let's start at 1.
            current: "".to_string(),
        }
    }
}

impl Iterator for Odd {
    type Item = String;

    fn next(&mut self) -> Option<Self::Item> {
        // We go to the next odd number.
        self.current += "a";
        // We return the current one.
        Some(self.current.to_string())
    }
}
pub fn day4() {

    let filename = "data/day04.txt";


    for x in Odd::new().take(3) {
        println!("=> {}", x);
    }
    // Open the file in read-only mode (ignoring errors).
    let file = File::open(filename).unwrap();
    let reader = BufReader::new(file);

    let mut total = 0;
    let mut total2 = 0;

    for (_, line) in reader.lines().enumerate() {
        let line = line.unwrap(); 

        // let mut nums:Vec<i32> = line
        //                     .split_whitespace()
        //                     .map(|s| s.parse().expect("parse error"))
        //                     .collect();
        // nums.sort();
        // nums.reverse();                                        
     
        //println!(">  {}", line);

    }


}