
pub fn day11() {
    let filename = "data/day11.txt";
    for line in common::common::FileLines::new(filename.to_string()) {
        // println!("{}", line);

        let words: Vec::<&str> = line.split(",").collect();
        // println!("{:?}", words);

        assert_eq!(dist("ne,ne,ne".split(",").collect()), 3);
        assert_eq!(dist("ne,ne,sw,sw".split(",").collect()), 0);
        assert_eq!(dist("ne,ne,s,s".split(",").collect()), 2);
        assert_eq!(dist("se,sw,se,sw,sw".split(",").collect()), 3);
        
        
        // ne,ne,ne is 3 steps away.
        // ne,ne,sw,sw is 0 steps away (back where you started).
        // ne,ne,s,s is 2 steps away (se,se).
        // se,sw,se,sw,sw is 3 steps away (s,s,sw).

        println!("{} ", dist(words)); // th 913
    }
}

fn dist(words: Vec::<&str>) -> usize {
    let n = words.iter().filter(|&x| *x == "n").count();
    let s = words.iter().filter(|&x| *x == "s").count();

    let nw = words.iter().filter(|&x| *x == "nw").count();
    let se = words.iter().filter(|&x| *x == "se").count();

    let ne = words.iter().filter(|&x| *x == "ne").count();
    let sw = words.iter().filter(|&x| *x == "sw").count();

    let p1 = ((n as i32) - (s as i32)).abs();
    let p2 = ((nw as i32) - (se as i32)).abs();
    let p3 = ((ne as i32) - (sw as i32)).abs();

    return p1 as usize + p2 as usize + p3 as usize;
}