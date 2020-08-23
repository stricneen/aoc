use crate::day10;

pub fn day14() {

    let i = "jzgqcdpd";
    let t = "flqrgnkx";
    let input =  String::from(t);

    let mut p1 = 0;
    let mut grid = vec![];

    for i in 0..128 {

        let l = format!("{}-{}", input, i);
        let hash = day10::knot_hash(&l);

        let bin = hash.chars().fold("".to_string(), |acc,x| {
            let hex = i32::from_str_radix(&x.to_string(), 16).unwrap();
            let bin = to_binary(hex, 4);
            return format!("{}{}", acc, bin);
        });        

        p1 += bin.matches("1").count();
        grid.push(bin);
    }
    println!("Part 1 : {}", p1);

    for x in grid {
        println!("{}", x);
    }

}

fn to_binary(i: i32, l: usize) -> String{
    return format!("{:01$b}", i, l);
}