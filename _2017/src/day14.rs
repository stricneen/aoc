use crate::day10;

pub fn day14() {

    let _i = "jzgqcdpd";
    let _t = "flqrgnkx";
    let input =  String::from(_i);

    let mut p1 = 0;
    let mut grid = [[0u8; 128]; 128];

    for i in 0..128 {
        let mut j = 0;
        let l = format!("{}-{}", input, i);
        let hash = day10::knot_hash(&l);
        let bin = hash.chars().fold("".to_string(), |acc,x| {
            let hex = i32::from_str_radix(&x.to_string(), 16).unwrap();
            let bin = to_binary(hex, 4);
            for cx in 0 ..4 {
                grid[i][cx + j] = bin.chars().nth(cx).unwrap().to_digit(10).unwrap() as u8;
            }
            j += 4;
            return format!("{}{}", acc, bin);
        });  
        p1 += bin.matches("1").count();
    }
    println!("Part 1 : {}", p1);
    
    //print_grid(&grid);

    let p2 = count_clusters(&mut grid);
    assert_eq!(1242, p2);
    println!("Part 2 : {}", p2);

}

fn count_clusters(grid: &mut [[u8; 128]; 128]) -> usize {

    let find_one = |grid: [[u8; 128]; 128]| {
        for (i, r) in grid.iter().enumerate() {
            for (j, c) in r.iter().enumerate() {
                if c == &1 {
                    return Some((i, j));
                }
            }
        }
        return None;
    };

    let mut c = 0;
    while let Some(i) = find_one(*grid) {
        c += 1;
        flood(grid, i.0 ,i.1);
    }
    return c;
}

fn flood(grid: &mut[[u8; 128]; 128], x: usize, y: usize) {
    let mut cells = vec![(x,y)];
    let mut size: usize = 0;

    while cells.len() !=  size {
        size = cells.len();
        
        let mut adj_cell = vec![];
        for c in &cells {
            adj_cell.append(&mut get_adj(&grid, c.0, c.1));
          
        }
        cells.append(&mut adj_cell);
        cells.sort();
        cells.dedup();
    }

    for f in cells {
        grid[f.0][f.1] = 2;
    }
}

fn get_adj(grid: &[[u8; 128]; 128], x: usize, y: usize) -> Vec<(usize, usize)>{
    let mut cells = vec![];
    if x > 0 && grid[x-1][y] == 1 { cells.push((x-1,y)) }
    if y > 0 && grid[x][y-1] == 1 { cells.push((x,y-1)) }
    if x < grid[0].len() - 1 && grid[x+1][y] == 1 { cells.push((x+1,y)) }
    if y < grid.len() - 1 && grid[x][y+1] == 1 { cells.push((x,y+1)) }
    return cells;
}

fn to_binary(i: i32, l: usize) -> String{
    return format!("{:01$b}", i, l);
}

fn _print_grid(grid: &[[u8; 128]; 128]) {
    println!();
    for row in grid.iter() {
        for cell in row.iter() {
            if *cell == 0 {
                print!("\x1b[0;30m{}\x1b[0m", cell);
            } else if *cell == 1 {
                print!("\x1b[0;33m{}\x1b[0m", cell);
            } else {
                print!("\x1b[0;34m{}\x1b[0m", cell);
            }
        }
        println!();
    }
}
