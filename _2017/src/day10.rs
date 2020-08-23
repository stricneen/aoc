
pub fn day10() {

    let input = "197,97,204,108,1,29,5,71,0,50,2,255,248,78,254,63";
    let lens: Vec<usize> =  input.split(',')
        .map(|s| s.parse().expect("parse error"))
        .collect();

    // let mut list = [0, 1, 2, 3, 4];
    //let lens = [3, 4, 1, 5];
    
    let p1 = round(lens, 1);

    
    assert_eq!(40132, p1[0] * p1[1]);
    println!("Part 1 : {:?}", p1[0] * p1[1]);

    // let i = "1,2,3";
    let mut conv: Vec<u32> = input.chars().map(|x| x as u32).collect();
    let mut stnd = vec![17, 31, 73, 47, 23];
    conv.append(&mut stnd);


    assert_eq!(knot_hash(""), "a2582a3a0e66e6e86e3812dcb672a272");
    assert_eq!(knot_hash("AoC 2017"), "33efeb34ea91902bb2f59c9920caa6cd");
    assert_eq!(knot_hash("1,2,3"), "3efbe78a8d82f29979031a4aa0b16a9d");
    assert_eq!(knot_hash("1,2,4"), "63960835bcdc130f0b66d7ff4f6a5a8e");

   println!("Part 2 : {}", knot_hash(input))
}


pub fn knot_hash(input: &str) -> String {
    let len2 = parse_ascii(&input);
    let t2 = round(len2, 64);
    let t3 = to_dense(t2);
    return t3;
}

fn to_dense(sparse: Vec<u32>) -> String {
    let mut r = "".to_string();
    for c in 0..16 {
        let p = sparse.iter().skip(c*16).take(16)
            .map(|x| *x as usize)
            .fold(0, |acc, x| acc ^ x);

        r.push_str(&format!("{:0>2x}", &p));
    }

    return r.to_string();
}

fn parse_ascii(input: &str) -> Vec<usize> {
    let mut conv: Vec<usize> = input.chars().map(|x| x as usize).collect();
    let mut stnd = vec![17, 31, 73, 47, 23];
    conv.append(&mut stnd);
    return conv;
}

fn round(lens: Vec<usize>, count: usize) -> Vec<u32> {
    let mut list: Vec<u32> = (0..256).collect();
    let len = list.len();
    let mut skip = 0;
    let mut total = 0;

    for _ in 0..count {
        for l in lens.iter() { 
            &list[0..*l].reverse();
            &list.rotate_left((l + skip) % len);
            total += l + skip;
            skip += 1;
            // println!("{} {:?}",l, list);
        }
    }
    &list.rotate_right(total % len);
    return list;
}
