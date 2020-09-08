

pub fn day21() {
    let filename = "data/day21.txt";
    for line in common::common::FileLines::new(filename.to_string()) {
        println!("{}", line);

        let words: Vec::<&str> = line.split_whitespace().collect();
    }
}