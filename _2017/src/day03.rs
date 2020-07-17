
pub fn day3() {
    
    let input: i32 = 361527;

    let (n,d) = dist(input);

    let p1 = d + (input - n); // add north

    let p2 = dist2(40); // 747

    println!("Part 1 : {}", p1);
    println!("Part 2 : {}", p2);
    
}

fn dist(to: i32) -> (i32, i32) {
    let mut e = vec![1, 2];
    let mut d = 0;
    let mut r = 0;
    for i in 1..10000 {
        let east =  e.last().unwrap() + (i * 8) + 1;
        if east > to {
            r = *e.last().unwrap();
            d = i;
            break;
        }
        e.push(east);
    }

    return (r,d);
    // let east =  e.last().unwrap() + (i * 8) + 1;
    // return 34;
}



fn dist2(to: i32) -> i32 {

    let width = 20;
    let height = 20;
    let mut next = 1;
    let mut dir = 'e';
    let mut array = vec![vec![0; width]; height];


    let mut loc = (10, 11);
    array[10][10] = 1;
    array[10][11] = 1;


    while next < to {
        array[loc.0][loc.1] = next;
        next += 1;

        if dir == 'e'{
            if array[loc.0 - 1][loc.1] == 0 {
                loc = (loc.0 - 1, loc.1);
                dir = 'n';
                continue;
            } else {
                loc = (loc.0, loc.1 + 1);
            }
        }

        if dir == 'n' {
            if array[loc.0][loc.1 - 1] == 0 {
                loc = (loc.0, loc.1 - 1);
                dir = 'w';
                continue;
            } else {
                loc = (loc.0 - 1, loc.1);
            }
        }

        if dir == 'w' {
            if array[loc.0 + 1][loc.1] == 0 {
                loc = (loc.0 + 1, loc.1);
                dir = 's';
                continue;
            } else {
                loc = (loc.0, loc.1 - 1);
            }
        }

        if dir == 's' {
            if array[loc.0][loc.1 + 1] == 0 {
                loc = (loc.0, loc.1 + 1);
                dir = 'e';
                continue;
            } else {
                loc = (loc.0 + 1, loc.1);
            }
        }


      
    
    }

    pma(array);

    return 0;
}




fn pma(t: Vec<std::vec::Vec<i32>>) {

    for r in t {
        println!("{:?}", r);
    }

}

fn ps(t: &str) {
    println!("{}", t)
}

fn pv(t: Vec<i32>) {
    for n in t {
        println!("{}", n);
    }
    println!();
}