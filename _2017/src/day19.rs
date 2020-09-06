
pub fn day19() {
    let filename = "data/day.txt";
    let mut arr = vec![];
    
    for line in common::common::FileLines::new(filename.to_string()) {
        //println!("{}", line);
        let r = line.chars().collect::<Vec<char>>();
        arr.push(r);
    }
    // println!("{:?}", arr);

    // Get entrance
    let pos = (arr[0].iter().position(|&x| x == '|').unwrap(), 0);
    let dir = 's';
    
    println!("{:?}", pos);
}