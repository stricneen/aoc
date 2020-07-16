
pub fn day3() {
    
    let input: i32 = 361527;

    let (d,y) = dist(input);

    println!("Part 1 : {}\t{}", d, y);
    // let v: Vec<i32> = Vec::new();
    // 1     9    17   25  33  

    // let mut e = vec![1, 2];
    // for i in 1..10000 {

    //     let east =  e.last().unwrap() + (i * 8) + 1;

    //     e.push(east);
    //     // println!("{}\t {}", i + 1,  east);
    //     if east > input { //why?
    //         // println!("{} : {}", e.last().unwrap() , &input);
    //         break;
    //     }
    // }

// 1   2   11   28    53   86

//     1    9   17    25

   // pv(e);
}

fn dist(to: i32) -> (i32, i32) {
    let mut e = vec![1, 2];
    let mut d = 0;
    let mut r = 0;
    for i in 1..10000 {
        let east =  e.last().unwrap() + (i * 8) + 1;
        
        // println!("{}\t {}", i + 1,  east);
        if east > to { //why?
            // println!("{} : {}", e.last().unwrap() , &input);
            r = *e.last().unwrap();
            d = i;
            break;
        }
        e.push(east);
    }

    return (r,d);
    // let east =  e.last().unwrap() + (i * 8) + 1;
    // return 34;
}


fn ps(t: &str) {
    println!("{}", t)
}

fn pv(t: Vec<i32>) {
    for n in t {
        println!("{}", n);
    }
    println!();
}