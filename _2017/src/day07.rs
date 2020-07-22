
pub fn day7() {
    let filename = "data/day07.txt";
    for line in common::common::FileLines::new(filename.to_string()) {
        println!("{}", line);
    }
}