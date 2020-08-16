
pub fn day10() {

    let input = "197,97,204,108,1,29,5,71,0,50,2,255,248,78,254,63";
    let lens: Vec<usize> =  input.split(',')
        .map(|s| s.parse().expect("parse error"))
        .collect();
    // println!("{:?}", nums);
    
    // let mut list = [0, 1, 2, 3, 4];
    //let lens = [3, 4, 1, 5];
    let mut list: Vec<u32> = (0..256).collect();
    // let mut list = vec!(0..255).iter().map(i32::from).collect::<i32>();
    
    let len = list.len();
    let mut skip = 0;
    let mut total = 0;

    for l in lens.iter() { 

        &list[0..*l].reverse();
        // println!("{}", l);        
        &list.rotate_left((l + skip) % len);
        
        total += l + skip;
        skip += 1;

        // println!("{} {:?}",l, list);
    }
    &list.rotate_right(total % len);

    println!("Part 1 : {:?}", list[0] * list[1]);
}
