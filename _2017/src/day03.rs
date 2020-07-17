
pub fn day3() {
    
    let input: i32 = 361527;

    let (n,d) = dist(input);

    let p1 = d + (input - n); // add north

    println!("Part 1 : {}", p1);
}

fn dist(to: i32) -> (i32, i32) {
    let mut e = vec![1, 2];
    let mut d = 0;
    let mut r = 0;
    for i in 1..10000 {
        let east =  e.last().unwrap() + (i * 8) + 1;
        if east > to {
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

3.16
0.0316

fn dist2(to: i32) -> i32 {

    return 0;
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