// Generator A starts with 703
// Generator B starts with 516

fn generator(start: u64, factor: u64, factorof: u64) -> impl std::iter::Iterator<Item = u64> {
    let mut num = start;
    let div = 2147483647;
    std::iter::from_fn(move || {        
        num = (num * factor) % div;
        while num % factorof != 0 {
            num = (num * factor) % div;
        }
        Some(num)
    })
}

pub fn day15() {

    let mut gen_a = generator(703, 16807, 4);
    let mut gen_b = generator(516, 48271, 8);

    // let mut gen_a = generator(65, 16807, 4);
    // let mut gen_b = generator(8921, 48271, 8);

    let mut p1 = 0;
    for _ in 0..5_000_000 {
        let a = gen_a.next().unwrap();
        let b = gen_b.next().unwrap();
        let a_bin = common::common::to_binary(a, 32);
        let b_bin = common::common::to_binary(b, 32);

        //println!("{}\t{}\t{}\t{}", a, b,a_bin,b_bin);

        if a_bin[16..32] == b_bin[16..32] {
            p1 += 1;
            //println!("match");
        }
    }

    println!("Part 2 : {}", p1);

}