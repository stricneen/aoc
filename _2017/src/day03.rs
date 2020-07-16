
pub fn day3() {
    
    let input = 361527;

    // let v: Vec<i32> = Vec::new();
    // 1     9    17   25  33  

    let mut e = vec![1, 2];
    for i in 1..10 {
        e.push(  e.last().unwrap() + (i * 8) + 1 );
    }

// 1   2   11   28    53   86

//     1    9   17    25

    pv(e);
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