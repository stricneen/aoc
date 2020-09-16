#[derive(Debug)]
struct Bridge {
    bridge: Vec<(u32, u32)>,
    remaining: Vec<(u32, u32)>
}

pub fn day24() {
    let filename = "data/day24.txt";
    let mut comps = vec![];
    for line in common::common::FileLines::new(filename.to_string()) {
        let mut iter = line.split('/');
        let a = iter.next().unwrap().parse::<u32>().unwrap();
        let b = iter.next().unwrap().parse::<u32>().unwrap();
        comps.push((a,b));
    }
    // println!("{:?}", comps);

    // Setup 
    let mut candidates = vec![];
    for (a,b) in &comps {
        if a == &0 {
            
            let mut br = vec![];
            let mut re = comps.clone();

            let index = re.iter().position(|&x| x == (*a,*b)).unwrap();
            re.remove(index);
            
            br.push((*a,*b));

            let bridge = Bridge {
                remaining: re,
                bridge: br
            };
            candidates.push(bridge);
        }
        if b == &0 {
            
            let mut br = vec![];
            let mut re = comps.clone();

            let index = re.iter().position(|&x| x == (*a,*b)).unwrap();
            re.remove(index);
            
            br.push((*b,*a));

            let bridge = Bridge {
                remaining: re,
                bridge: br
            };
            candidates.push(bridge);
        }
    }

    // println!("{:?}", candidates);

    let mut max = 0;
    let mut maxlen = (0,0);

    loop {
        let mut next = vec![];
        for c in &candidates {
            next.append(&mut expand(&c));
        }

        candidates = next;

        if candidates.len() == 0 {
            break;
        }

        for b in &candidates {
            
            let m = b.bridge.iter().fold(0, |acc,x| { 
                acc + x.0 + x.1 
            });
            if m > max {
                max = m;
            }

            if b.bridge.len() > maxlen.0 {
                maxlen.1 = 0;
            }

            if b.bridge.len() >= maxlen.0 {
                maxlen.0 = b.bridge.len();
                if m > maxlen.1 {
                    maxlen.1 = m;
                }
            }

        }
    

        println!("{:?}", candidates.len());
    }

    println!("Part 1 : {}", max);
    println!("Part 2 : {:?}", maxlen);
    
}
//  [Bridge { 
//    bridge: [(0, 2)], 
//    remaining: [(2, 2), (2, 3), (3, 4), (3, 5), (0, 1), (10, 1), (9, 10)] }

// poss > [(2, 2), (2, 3),] }
fn expand(bridge: &Bridge) -> Vec<Bridge> {
  
    let possibles = bridge.remaining
    .iter()
    .filter(|x| x.0 == bridge.bridge.last().unwrap().1 || x.1 == bridge.bridge.last().unwrap().1)
    .map(|(a,b)| {

        let mut br = bridge.bridge.clone();
        let mut re = bridge.remaining.clone();

        if bridge.bridge.last().unwrap().1 == *a {
            br.push((*a, *b));
        } else {
            br.push((*b, *a));
        }

        let index = re.iter().position(|&x| x == (*a,*b)).unwrap();
        re.remove(index);
        
        Bridge {
            bridge: br,
            remaining: re
        }
    });

    return possibles.collect();
}

// let mut counts = HashMap::new();
// for (x,y) in comps {
//     if counts.contains_key(&x) {
//         counts.insert(y, counts[&x] + 1);
//     } else {
//         counts.insert(x, 1);
//     }
//     if counts.contains_key(&y) {
//         counts.insert(y, counts[&y] + 1);
//     } else {
//         counts.insert(y, 1);
//     }
// }

// println!("{:?}", counts);