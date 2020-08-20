
pub fn day() {
    let filename = "data/day13.txt";
    for line in common::common::FileLines::new(filename.to_string()) {
        println!("{}", line);

        let _words: Vec::<&str> = line.split_whitespace().collect();
    }
}