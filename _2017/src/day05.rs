
pub fn day5() {
    let filename = "data/day05.txt";
    let mut inst = Vec::<i32>::new();
    for line in common::common::FileLines::new(filename.to_string()) {
        // println!("{}", line);
        inst.push(line.parse::<i32>().unwrap());
    }
    // println!("{:?}", inst);

    let mut pointer = 0;
    let mut total1 = 0i32;

    while pointer < inst.len()  {
        total1 += 1;
        let jmp = inst[pointer];
        if jmp >= 3 {
            inst[pointer] = inst[pointer] - 1; // added for part 2
        } else {
            inst[pointer] = inst[pointer] + 1;
        }
        pointer = (pointer as i32 + jmp) as usize;
    }

    println!("Part 2 : {}", total1);
        

}