use std::collections::HashMap;

pub fn day12() {
    let filename = "data/day.txt";
    
    let mut pipes = HashMap::new();
    for line in common::common::FileLines::new(filename.to_string()) {
        parse(&line, &mut pipes);
    }

    println!("{:?}", pipes);
}


fn parse(line : &str, map: &mut HashMap<usize, Vec<usize>>)  {
    let words: Vec::<&str> = line.split(" <-> ").collect::<Vec<&str>>();
    let root = words[0];
    let pipe = words[1].split(",").map(|x| x.trim().parse::<usize>().unwrap()).collect();
    map.insert(root.parse::<usize>().unwrap(), pipe);
}