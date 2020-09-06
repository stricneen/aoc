
pub fn day19() {
    let filename = "data/day.txt";
    for line in common::common::FileLines::new(filename.to_string()) {
        println!("{}", line);

        let words: Vec::<&str> = line.split_whitespace().collect();
    }
}