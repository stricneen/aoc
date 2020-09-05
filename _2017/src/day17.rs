pub fn day17() {
    let input_step = 337;

    let mut spin_lock = vec![0];
    let mut pos = 0;
    for i in 1..=2017 {
        pos = (pos + input_step) % spin_lock.len() + 1;
        spin_lock.insert(pos, i);
    }

    let pos_2017 = spin_lock.iter().position(|&r| r == 2017).unwrap();
    println!("Part 1 : {:?}", spin_lock[pos_2017 + 1]);
}

