use std::collections::HashSet;
use std::collections::HashMap;


pub fn day7() {
    let filename = "data/day07.txt";

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

    for (k,v) in &weights {
        println!("{} : {:?}", k,v );
    }

    let mut base = "";
    for w in under.iter() {
        if over.contains(w) == false {
            base = w;
            println!("Part 1 : {}", w);
        }
    }

    let mut holds = HashMap::new();

    for w in weights.keys() {
        let bob = calc(0, w, &weights);
        holds.insert(w, bob);
    }



    println!("Weights : {:?}", holds);

    // println!("padx : {:?}", holds[&"padx".to_string()]);
    // println!("tknk : {:?}", holds[&"tknk".to_string()]);

    println!();

    for l in 0..4 {
        let x = level(l, vec![base.to_string()], &weights);
        println!("{:?}", x);

        // let xxx:Vec<_> = x.into_iter().map(|x| (&weights[&x].0,&holds[&x])).collect();
    
        // //        println!("{:?}", &x);
        //   //      println!("{:?}", xx);
        //         println!("{:?}", xxx);

//        let xx:Vec<_> = x.into_iter().map(|x| &holds[&x]).collect();
    
//        println!("{:?}", &x);
  //      println!("{:?}", xx);
     //   println!("{:?}", xx);
    }
   
    // println!("{:?}", level(1, vec![base.to_string()], &weights));
    // println!("{:?}", level(2, vec![base.to_string()], &weights));
    // println!("{:?}", level(3, vec![base.to_string()], &weights));
    // println!("{:?}", level(4, vec![base.to_string()], &weights));
    // println!("{:?}", level(5, vec![base.to_string()], &weights));
    // println!("{:?}", level(6, vec![base.to_string()], &weights));

    // smaygo : (4616, ["hmgrlpj", "fbnbt", "nfdvsc"])

    // ["avpklqy", "tytbgx", "bdohoaa", "smaygo", "pvvbn", "hgizeb", "tchfafn"]
    // [48284,      48284,     48284,     48292,    48284, 48284, 48284]
    // >>> 4616 - (48292 - 48284)
    // 4153 th
    // 4628 th

}

fn level(lev: i32, base:  Vec<String>, weights: &HashMap<String, (i32, Vec<String>)>) -> Vec<String> {

    if lev == 0 { return  base; }
    let mut r = Vec::<String>::new();

    let mut t = Vec::<String>::new();

    for w in base {
        for x in &weights[&w].1 {
            t.push(x.to_string());
        }
        r.append(&mut t);
    }
   return level(lev-1, r, &weights);
}

fn calc (mut acc: i32, disc: &String, weights: &HashMap<String, (i32, Vec<String>)>) -> i32 {
    
    if &weights[disc].1.len() > &0 {
        acc += weights[disc].0;
        for over in &weights[disc].1 {
            acc = calc(acc, &over, &weights);
        }    
    }
    else {
        acc += weights[disc].0;
    }
    return acc;
}
