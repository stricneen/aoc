use itertools::Itertools;

// .#.
// ..#
// ###


#[derive(Debug)]
struct Rule {
    from: String,
    to: String
}

fn perms(from: String) -> Vec<String> {
    let mut r = vec![];

//    123 / 456 / 789
//    123      741
//    456      852
//    789      963

//    123 / 456 / 789
//    123      321
//    456      654
//    789      987

    let rotate = |x: &String| {
        let flat = x.replace('/', "");
        let b = flat.as_bytes();
        return format!("{}{}{}/{}{}{}/{}{}{}",
            b[6] as char, b[3] as char, b[0] as char, 
            b[7] as char, b[4] as char, b[1] as char, 
            b[8] as char, b[5] as char, b[2] as char) ;
    };
    let flip = |x: &String| {
        let flat = x.replace('/', "");
        let b = flat.as_bytes();
        return format!("{}{}{}/{}{}{}/{}{}{}",
            b[2] as char, b[1] as char, b[0] as char, 
            b[5] as char, b[4] as char, b[3] as char, 
            b[8] as char, b[7] as char, b[6] as char) 
    };
 
    let r1 = rotate(&from);
    let r2 = rotate(&r1);
    let r3 = rotate(&r2);
    let f1 = flip(&from);
    let f2 = flip(&r1);
    let f3 = flip(&r2);
    let f4 = flip(&r3);

    r.push(r1.clone());
    r.push(r2);
    r.push(r3);

    r.push(f1);
    r.push(f2);
    r.push(f3);
    r.push(f4);
    
    r.sort();
    r.dedup();

    return r;
}

pub fn day21() {
    let filename = "data/day21.txt";
    let mut rules = vec![];
    for line in common::common::FileLines::new(filename.to_string()) {
        let words: Vec::<&str> = line.split(" => ").collect();
    
        rules.push(Rule {
            from: words[0].to_string(),
            to: words[1].to_string()
        });

        if words[0].len() > 5 {
        for ps in perms(words[0].to_string()) {
                rules.push(Rule {
                    from: ps,
                    to: words[1].to_string()
                });
            }
        }

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
    for _ in 0..5 {

        let split = split(&state);
        let apply = apply(split, &rules);
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
    println!("{}", rows.matches('#').count());
    println!();
}

fn apply(rows: Vec<String>, rules: &Vec<Rule>) -> Vec<String> {
    let mut r = vec![];


   

//          ../.# => ##./#../...
//    .#./..#/### => #..#/..../..../#..#
    for i in rows.iter() {

        let mtch = rules.iter().filter(|&x| { &x.from == i }).collect::<Vec<_>>();
        println!("{}", i);
        r.push(mtch.first().unwrap().to.clone());
        

        // let poss= rules.iter().filter(|&x| {
        //     x.from.len() == i.len() && x.from.matches('.').count() == i.matches('.').count()
        // }).collect::<Vec<_>>();

        // if poss.len() == 1 {
        //     r.push(poss.first().unwrap().to.clone());
        // } else {

        //    // let mut trans = rules.iter().filter(|&x| &x.from == i);
        //   //  let rule = trans.next().unwrap();
        //     r.push(poss.first().unwrap().to.clone());
        // }
    }
    return r;
}

fn combine(transformed: Vec<String>) -> String {

    let l = transformed.first().unwrap().chars().fold(0, |acc, x| {if x == '/' {acc} else {acc + 1}});
    let rows = ((transformed.len() as f32 * l as f32).sqrt()) as usize;

    let mut r = vec!["".to_string(); rows];
    let sub = transformed.first().unwrap().split('/').next().unwrap().len();
    //let rows = (transformed.len() as f32).sqrt()  as usize * sub;

    let mut ix = 0;
    for (_ ,t) in transformed.into_iter().enumerate() {

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

//##
// .. 

// ../..   ../..

// ../.#   ../.#   
//         ../#.   
//         .#/..   
//         #./..
        
// ##/..   ##/..
//         #./#.
//         .#/.#.
//         ../##
 
// .#/#.   .#/#.
//         #./.#

// .#
// #.    


//        ../.. => ..#/#.#/###
//        #./.. => .#./#../###
//        ##/.. => #.#/#.#/..#
//        .#/#. => .##/..#/#..
//        ##/#. => #../#.#/#..
//        ##/## => #.#/.#./#..

