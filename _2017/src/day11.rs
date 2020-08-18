
pub fn day11() {
    let filename = "data/day11.txt";
    for line in common::common::FileLines::new(filename.to_string()) {
        // println!("{}", line);

        let words: Vec::<&str> = line.split(",").collect();
        // println!("{:?}", words);

        assert_eq!(dist(travel(&"ne,ne,ne".split(",").collect())), 3);
        assert_eq!(dist(travel(&"ne,ne,sw,sw".split(",").collect())), 0);
        assert_eq!(dist(travel(&"ne,ne,s,s".split(",").collect())), 2);
        assert_eq!(dist(travel(&"se,sw,se,sw,sw".split(",").collect())), 3);
        
        
        // ne,ne,ne is 3 steps away.
        // ne,ne,sw,sw is 0 steps away (back where you started).
        // ne,ne,s,s is 2 steps away (se,se).
        // se,sw,se,sw,sw is 3 steps away (s,s,sw).

        println!("Part 1 : {}", dist(travel(&words))); // pencil

        println!("{:?} ", travel(&words)); // th 913


    }
}

fn travel(words: &Vec::<&str>) -> (i32, i32) {
    let t = words.iter().fold((0,0), |acc, &x| {
        match x {
            "n" => (acc.0 + 1 ,acc.1),
            "s" => (acc.0 - 1 ,acc.1),
            "nw" => (acc.0 + 1 ,acc.1 - 1),
            "se" => (acc.0 - 1 ,acc.1 + 1),
            "ne" => (acc.0 ,acc.1 + 1),
            "sw" => (acc.0 ,acc.1 - 1),
            _ => panic!((0,0))
        } 
    });
    return t;
}

fn dist(pos: (i32, i32)) -> u32 {
    let (x,y) = pos;
    if x * y >= 0 {
        return (pos.0 + pos.1).abs() as u32;
    } else {
        if x.abs() >= y.abs() {
            return x.abs() as u32;
        } else {
            return y.abs() as u32;
        }
    }
}

// fn dist2(words: Vec::<&str>) -> usize {
//     let n = words.iter().filter(|&x| *x == "n").count();
//     let s = words.iter().filter(|&x| *x == "s").count();

//     let nw = words.iter().filter(|&x| *x == "nw").count();
//     let se = words.iter().filter(|&x| *x == "se").count();

//     let ne = words.iter().filter(|&x| *x == "ne").count();
//     let sw = words.iter().filter(|&x| *x == "sw").count();
//     println!("{} {}     {} {}     {} {}",n,s,nw,se,ne,sw);
//     let p1 = ((n as i32) - (s as i32)).abs();
//     let p2 = ((nw as i32) - (se as i32)).abs();
//     let p3 = ((ne as i32) - (sw as i32)).abs();
//     println!("{} {} {}", p1,p2,p3);
//     return p1 as usize + p2 as usize + p3 as usize;
// }