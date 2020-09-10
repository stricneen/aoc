use itertools::Itertools;

// .#.
// ..#
// ###

//          ../.# => ##./#../...
//    .#./..#/### => #..#/..../..../#..#
#[derive(Debug)]
struct Rule {
    from: String,
    to: String
}


pub fn day21() {
    let filename = "data/day.txt";
    let mut rules = vec![];
    for line in common::common::FileLines::new(filename.to_string()) {
        let words: Vec::<&str> = line.split(" => ").collect();
    
        rules.push(Rule {
            from: words[0].to_string(),
            to: words[1].to_string()
        });
    }

    
    let mut state2 = "#..#..../......../......../.#.....#/.#.....#/##..####/.#.....#/##..####";
    //let mut state2 = "#..#/..../..../#..#";
    //let mut state2 = "#./..";
   // let mut state2 = ".#./..#/###/.#./..#/###/.#./..#/###/.#./..#/###";
  //  let mut state2 = ".#...#.#./.#..#...#/..##.#.##/.#..#...#/.#..#...#/#...##.##/.#...#.#./.#....#.#/#...##.##";
    
    let split2 = split(state2);
    let combine2 = combine(split2);

    assert_eq!(state2, combine2);

    println!("{:?}", rules);
}

fn combine(transformed: Vec<String>) -> String {
    if transformed.len() % 4 == 0 {
        let rows = transformed.len() / 4;
        let mut r = vec!["".to_string(); rows];
        for (i ,t) in transformed.into_iter().enumerate() {
            r[i % rows].push_str(&t[0..2]);
        }
        return r.iter().join("/");
    } else {
        let rows = transformed.len() / 3;
        let mut r = vec!["".to_string(); rows];
        for (i ,t) in transformed.into_iter().enumerate() {
            r[i % rows].push_str(&t[0..3]);
        }
        return r.iter().join("/");
    }
}

fn split(grid: &str) -> Vec<String>
{
    let mut ret = vec![];
    if grid.split('/').collect::<String>().len() % 2 == 0 {
        for (fst, sec) in grid.split('/').tuples() {
            let mut pos = 0;
            while pos < fst.len() {
                let n = format!("{}/{}", 
                    fst.chars().skip(pos).take(2).collect::<String>(), 
                    sec.chars().skip(pos).take(2).collect::<String>());
                ret.push(n);
                pos += 2;
            }
        }
    } else {
        for (fst, sec, thr) in grid.split('/').tuples() {
            let mut pos = 0;
            while pos < fst.len() {
                let n = format!("{}/{}/{}", 
                    fst.chars().skip(pos).take(3).collect::<String>(), 
                    sec.chars().skip(pos).take(3).collect::<String>(), 
                    thr.chars().skip(pos).take(3).collect::<String>());
                ret.push(n);
                pos += 3;
            }
        }
    }
    return ret;
}