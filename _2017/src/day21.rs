use itertools::Itertools;

// .#.
// ..#
// ###


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

    
    // let state3 = "#..#..../......../......../.#.....#/.#.....#/##..####/.#.....#/##..####";
    // let split3 = split(state3);
    // let combine3 = combine(split3);
    // assert_eq!(state3, combine3);

    // let state2 = "#..#..#../....#..../.....#.../.##.....#/.#....#.#/##.#.####/.#..#...#/###..####/###..####";
    // let split2 = split(state2);
    // let combine2 = combine(split2);
    // assert_eq!(state2, combine2);

    // let sparse = vec!["##./#../...".to_owned(), "##./#../...".to_owned(), "##./#../...".to_owned(),"##./#../...".to_owned()];
    // let com = combine(sparse);
    // assert_eq!("##.##./#..#../....../##.##./#..#../......", com);

    // let spare2 = vec!["##./#../...".to_string(); 9];
    // let com2 = combine(spare2);
    // assert_eq!("##.##./#..#../....../##.##./#..#../......", com);




    let mut state = ".#./..#/###".to_string();
    for _ in 0..4 {

        let split = split(&state);
        let apply = apply(split);
        let combine = combine(apply);
        let cpy = combine.clone();
        state = cpy;
        
        print(&state);
    }
    println!("Part 1 : {:?}", state);
}

fn print(rows: &String) {
    for r in rows.split('/') {
        println!("{}", r);
    }
    println!();

}

fn apply(rows: Vec<String>) -> Vec<String> {
    let mut r = vec![];

//          ../.# => ##./#../...
//    .#./..#/### => #..#/..../..../#..#

    for i in rows.iter() {
        if i.len() == 5 {
            r.push("##./#../...".to_string());
        } else {
            r.push("#..#/..../..../#..#".to_string());
        }
    }
    return r;
}

// x x x
// x x x
// x x x

// x x x x 
// x x x x
// x x x x 
// x x x x 

fn combine(transformed: Vec<String>) -> String {

    let l = transformed.first().unwrap().chars().fold(0, |acc, x| {if x == '/' {acc} else {acc + 1}});
    let rows = ((transformed.len() as f32 * l as f32).sqrt()) as usize;

    let mut r = vec!["".to_string(); rows];
    let sub = transformed.first().unwrap().split('/').next().unwrap().len();
    //let rows = (transformed.len() as f32).sqrt()  as usize * sub;

    let mut ix = 0;
    for (i ,t) in transformed.into_iter().enumerate() {

        let mut x = t.split('/');
        for j in 0..sub {
            r[ix+j].push_str(x.next().unwrap());
        }

        if r[ix].len() == rows {
            ix += sub;
        }


    }
    return r.iter().join("/");


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