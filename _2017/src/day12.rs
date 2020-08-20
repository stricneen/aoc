use std::collections::HashMap;

pub fn day12() {
    let filename = "data/day12.txt";
    
    let mut pipes = HashMap::new();
    for line in common::common::FileLines::new(filename.to_string()) {
        parse(&line, &mut pipes);
    }
    //println!("{:?}", pipes); // 33

    let mpipes = pipes;

    struct Count<'s> { f: &'s dyn Fn(&Count, Vec<usize>) -> usize }

    let func = Count {
        f: &|func, x| {

            let mut nodes: Vec<usize> = vec![];
            nodes.extend(&x);

            for c in &x {
                let pipes = mpipes.get(&c).unwrap();
                nodes.extend(pipes);
            }
            nodes.sort();
            nodes.dedup();


            if &x.len() != &nodes.len() {
                //println!("{:?}", &nodes);
                return (func.f)(func, nodes); 
            } else {
                return nodes.len();
            }


            //return nodes.len() as u32;
        }
    };
    
    let c = (func.f)(&func, vec![0]);

    // struct Fact<'s> { f: &'s Fn(&Fact, u32) -> u32 }

    // let fact = Fact {
    //     f: &|fact, x| if x == 0 {1} else {x * (fact.f)(fact, x - 1)}
    // };

    println!("{:?}", c);
}




fn parse(line : &str, map: &mut HashMap<usize, Vec<usize>>)  {
    let words: Vec::<&str> = line.split(" <-> ").collect::<Vec<&str>>();
    let root = words[0];
    let pipe = words[1].split(",").map(|x| x.trim().parse::<usize>().unwrap()).collect();
    map.insert(root.parse::<usize>().unwrap(), pipe);
}