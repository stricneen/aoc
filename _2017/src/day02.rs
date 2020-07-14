use std::fs::File;
use std::io::{BufRead, BufReader};

pub fn day2() {

    println!("day 2");

    let filename = "data/day02.txt";
    // Open the file in read-only mode (ignoring errors).
    let file = File::open(filename).unwrap();
    let reader = BufReader::new(file);

    let mut total = 0;
    // Read the file line by line using the lines() iterator from std::io::BufRead.
    for (_, line) in reader.lines().enumerate() {
        let line = line.unwrap(); // Ignore errors.
        // Show the line and its number.
        let mut min = 100000;
        let mut max = 0;

        for nums in line.split("\t"){

            let n = nums.parse::<i32>().unwrap();
            if n > max {
                max = n
            }
            if n < min {
                min = n
            }
        }

        total += max - min

    }
    println!("Part 1 :  {}", total);
}