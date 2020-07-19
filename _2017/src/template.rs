
pub fn dayx() {
    let filename = "data/day0x.txt";
    for line in common::common::FileLines::new(filename.to_string()) {
        println!("{}", line);
    }
}