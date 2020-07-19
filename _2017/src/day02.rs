use std::fs::File;
use std::io::{BufRead, BufReader};
use itertools::Itertools;

pub fn day2() {

    let filename = "data/day02.txt";
    // Open the file in read-only mode (ignoring errors).
    let file = File::open(filename).unwrap();
    let reader = BufReader::new(file);

    let mut total = 0;
    let mut total2 = 0;

    for (_, line) in reader.lines().enumerate() {
        let line = line.unwrap(); 

        let mut nums:Vec<i32> = line
                            .split_whitespace()
                            .map(|s| s.parse().expect("parse error"))
                            .collect();
        nums.sort();
        nums.reverse();                                        
        
        total += nums.iter().max().unwrap() - nums.iter().min().unwrap();   

        for i in 0 .. nums.iter().len() {
            for j in (i + 1) .. nums.iter().len() {
                if nums[i] % nums[j] == 0  {
                    total2 += nums[i] / nums[j];
                }
            }
        }
       
    }

    println!("Part 1 :  {}", total);
    println!("Part 2 :  {}", total2);
}