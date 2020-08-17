
pub fn day10() {

    let input = "197,97,204,108,1,29,5,71,0,50,2,255,248,78,254,63";
    let lens: Vec<usize> =  input.split(',')
        .map(|s| s.parse().expect("parse error"))
        .collect();

        // let mut list = [0, 1, 2, 3, 4];
        //let lens = [3, 4, 1, 5];
        let list: Vec<u32> = (0..256).collect();
        
        let p1 = round(list, lens);

        
        println!("Part 1 : {:?}", p1[0] * p1[1]);
        assert_eq!(40132, p1[0] * p1[1]);
    // let len = list.len();
    // let mut skip = 0;
    // let mut total = 0;

    // for l in lens.iter() { 
    //     &list[0..*l].reverse();
    //     &list.rotate_left((l + skip) % len);
    //     total += l + skip;
    //     skip += 1;
    //     // println!("{} {:?}",l, list);
    // }
    // &list.rotate_right(total % len);


    // let i = "1,2,3";
    // let mut conv: Vec<u32> = input.chars().map(|x| x as u32).collect();
    // let mut stnd = vec![17, 31, 73, 47, 23];
    // conv.append(&mut stnd);

    // println!("{:?}", conv);
}

fn round(mut list: Vec<u32>, lens: Vec<usize>) -> Vec<u32> {

    let len = list.len();
    let mut skip = 0;
    let mut total = 0;

    for l in lens.iter() { 
        &list[0..*l].reverse();
        &list.rotate_left((l + skip) % len);
        total += l + skip;
        skip += 1;
        // println!("{} {:?}",l, list);
    }
    &list.rotate_right(total % len);
    return list;
}
