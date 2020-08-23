use crate::day10::knot_hash;

pub fn day14() {

    let i = "jzgqcdpd";
    let t = "flqrgnkx";
    let input =  String::from(i);

    let mut p1 = 0;
    for i in 0..128 {

        let l = format!("{}-{}", input, i);
        let hash = knot_hash(&l);

        let bin = hash.chars().fold(0, |acc,x| {
            let hex = i32::from_str_radix(&x.to_string(), 16).unwrap();
            let bin = to_binary(hex, 4);
            return acc + bin.matches("1").count();
        });        
        p1 += bin;

    }

    println!("Part 1 : {}", p1);

}

fn to_binary(i: i32, l: usize) -> String{
    return format!("{:01$b}", i, l);
}