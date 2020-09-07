
pub fn day20() {
    let filename = "data/day20.txt";
    for line in common::common::FileLines::new(filename.to_string()) {
        println!("{}", line);

        let words: Vec::<&str> = line.split_whitespace().collect();
    }
}



// p=<2366,784,-597>, v=<-12,-41,50>, a=<-5,1,-2>
// p=<-2926,-3402,-2809>, v=<-55,65,-16>, a=<11,4,8>