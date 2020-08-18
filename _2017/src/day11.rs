
pub fn day11() {
    let filename = "data/day11.txt";
    for line in common::common::FileLines::new(filename.to_string()) {
        // println!("{}", line);

        let words: Vec::<&str> = line.split(",").collect();
        // println!("{:?}", words);

        assert_eq!(dist(travel(&"ne,ne,ne".split(",").collect()).0), 3);
        assert_eq!(dist(travel(&"ne,ne,sw,sw".split(",").collect()).0), 0);
        assert_eq!(dist(travel(&"ne,ne,s,s".split(",").collect()).0), 2);
        assert_eq!(dist(travel(&"se,sw,se,sw,sw".split(",").collect()).0), 3);

        println!("Part 1 : {}", dist(travel(&words).0));
        println!("Part 2 : {}", travel(&words).1);
    }
}

fn travel(words: &Vec::<&str>) -> ((i32, i32), u32) {
    let mut mx = 0;
    let t = words.iter().fold((0,0), |acc, &x| {

        let step = match x {
            "n" => (acc.0 + 1, acc.1),
            "s" => (acc.0 - 1, acc.1),
            "nw" => (acc.0 + 1, acc.1 - 1),
            "se" => (acc.0 - 1, acc.1 + 1),
            "ne" => (acc.0, acc.1 + 1),
            "sw" => (acc.0, acc.1 - 1),
            _ => panic!((0,0))
        };
        let d = dist(step);
        if d > mx {
            mx = d;
        }
        return step;
    });
    return (t, mx);
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
