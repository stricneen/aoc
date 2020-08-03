use std::collections::HashSet;
use std::collections::HashMap;


pub fn day7() {
    let filename = "data/day.txt";

    let mut under = HashSet::<String>::new();
    let mut over = HashSet::<String>::new();

    let mut weights = HashMap::new();

    for line in common::common::FileLines::new(filename.to_string()) {
        let words: Vec::<&str> = line.split_whitespace().collect();

        under.insert(words[0].to_string());
        let mut o = Vec::<String>::new();
        if words.len() > 3 {
            for w in words.iter().skip(3) {
                o.push(w.to_string().replace(",", ""));
                over.insert(w.to_string().replace(",", ""));    
            }
        }
        weights.insert(words[0].to_string(), (words[1].replace("(","").replace(")","").parse::<i32>().unwrap(), o));
    }

    // for (k,v) in &weights {
    //     println!("{} : {:?}", k,v );
    // }

    for w in under.iter() {
        if over.contains(w) == false {
            println!("Part 1 : {}", w);
        }
    }

    let mut holds = HashMap::new();

    for w in weights.keys() {
        let bob = calc(0, w, &weights);
        holds.insert(w, bob);
    }

    println!("Weights : {:?}", holds);


    println!("padx : {:?}", holds[&"padx".to_string()])


}

fn calc (mut acc: i32, disc: &String, weights: &HashMap<String, (i32, Vec<std::string::String>)>) -> i32 {
     //let mut total = 0;
   // acc += weights[disc].0;
    
    if &weights[disc].1.len() > &0 {
        acc += weights[disc].0;
        for over in &weights[disc].1 {
            acc += calc(acc, &over, &weights);
        }    
    }
    else {
        acc = weights[disc].0;
    }

    // for over in &weights[disc].1 {
    //     acc += calc(weights[disc].0, &over, &weights);
    // }

    return acc;


}
