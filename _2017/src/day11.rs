
pub fn day11() {
    let filename = "data/day11.txt";
    for line in common::common::FileLines::new(filename.to_string()) {
        println!("{}", line);

        let words: Vec::<&str> = line.split(",").collect();
        println!("{:?}", words);


    }
}