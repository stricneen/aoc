use std::collections::HashSet;

pub fn day6() {

    let input = "2	8	8	5	4	2	3	1	5	5	1	2	15	13	5	14";
    let banks = common::common::split_to_int(input);
    //let mut banks = vec![0, 2, 7 ,0]; // test
    let r = step(banks);
    println!("Part 1 : {}", r.1);

    let r2 = step(r.0);
    println!("Part 2 : {}", r2.1);

}

fn step(mut banks: Vec<i32>) -> (Vec<i32>, i32) {

    let count = banks.len();
    let mut set = HashSet::new();
    let mut state = banks.iter().map(|x| format!("-{}", x)).collect::<String>();

    while set.contains(&state) == false {
        set.insert(state.to_string());

        let i = banks.iter().fold((0, 0, 0), | acc, val| {
            if *val > acc.0 {
                (*val, acc.2, acc.2 + 1)
            } else {
                (acc.0, acc.1, acc.2 + 1)
            }
        });

        std::mem::replace(&mut banks[i.1], 0);

        for n in 1..=i.0 as usize {
            let x = banks[(i.1 + n) % count];
            std::mem::replace(&mut banks[(i.1 + n) % count], x + 1);
        }

        state = banks.iter().map(|x| format!("-{}", x)).collect::<String>();
        // println!("{}", state);

    }

    return (banks, set.len() as i32);

}