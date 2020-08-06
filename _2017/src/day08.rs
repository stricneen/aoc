
pub fn day8() {
    let filename = "data/day08.txt";
    for line in common::common::FileLines::new(filename.to_string()) {
        println!("{}", line);
    }
}