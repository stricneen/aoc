
pub fn day24() {
    let filename = "data/day24.txt";
    let mut comps = vec![];
    for line in common::common::FileLines::new(filename.to_string()) {

        let mut iter = line.split('/');

        let a = iter.next().unwrap().parse::<u8>().unwrap();
        let b = iter.next().unwrap().parse::<u8>().unwrap();
        comps.push((a,b));
    }

    println!("{:?}", comps);

}
