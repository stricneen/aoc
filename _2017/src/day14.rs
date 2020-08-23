use crate::day10;

pub fn day14() {

    let _i = "jzgqcdpd";
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

    // for x in &grid {
    //     println!("{}", x);
    // }

        print_grid(&grid);

    let p2 = count_clusters(&grid);
    // assert_eq!(1242, p2);
    println!("Part 2 : {}", p2);

}

fn count_clusters(grid: &Vec<String>) -> i32 {

    for row in grid {
        if row.matches('1').count() > 0 {



        }
    }
    return 0;
}

    // 11010100111101110110101111011100101111111000001110001111100001000001011011001100111110101000101111000110110100011111100111100110
    // 01010101111010101011001111000100111110111111111011011110000101101101110011101100001011000110011011011101101000100110010001100100
    // 00001010110111110001001111111010010000001110100011101010100000010101001101110110011101110110101011110011101101111011001000110001
    // 10101101001111011010001010001100110101111011100011111011100110010111010000101100000011100110001101100111001011001010111101100010
    // 01101000001011111110010010001100010101011000011101101010101010101010000100011101111100100110001101001111100101101101001100011010
    // 11001001111101011111111111111100010001100100101001010110010111111001111010010100111100110010001110101000101010101010100101001011
    // 01000100110000000

fn to_binary(i: i32, l: usize) -> String{
    return format!("{:01$b}", i, l);
}

fn print_grid(grid: &Vec<String>) {
    for row in grid {
        for cell in row.chars() {
            if cell == '0' {
                print!("\x1b[0;30m{}\x1b[0m", cell);
            } else {
                print!("\x1b[0;33m{}\x1b[0m", cell);
            }
        }
        println!();
    }
}
