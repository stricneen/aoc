use std::collections::HashSet;

pub fn day22() {
    let filename = "data/day22.txt";
    let mut infected: HashSet<(i32,i32)>= HashSet::new();
    let mut weakened: HashSet<(i32,i32)>= HashSet::new();
    let mut flagged: HashSet<(i32,i32)>= HashSet::new();


    let mut map = vec![];
    let mut y = 0;
    for line in common::common::FileLines::new(filename.to_string()) {
        for (i,c) in line.chars().enumerate() {
            if c == '#' {
                infected.insert((i as i32,y));
            }
        }
        y += 1;
        map.push(line);
    }

    let w = map.first().unwrap().len();
    let h = map.len();


    let mut position = ((w/2) as i32,(h/2) as i32);
    let mut facing = 0;

    // n, e, s, w  = 0 ,1 ,2,3

    let mut infection_count = 0;

    // Part 2
    for _ in 0..10000000 {

        // Turn 
        if weakened.contains(&position) {
            // do nothing
        } else if infected.contains(&position) {
            facing = (facing + 1) % 4;
        } else if flagged.contains(&position) {
            facing = (facing + 2) % 4;
        } 
        else {
            facing -=1;
            if facing == -1 {
                facing = 3;
            }
        }

        // Clean nodes become weakened.
        // Weakened nodes become infected.
        // Infected nodes become flagged.
        // Flagged nodes become clean.
        // Clean / infect

        if weakened.contains(&position) {
            weakened.remove(&position);
            infected.insert(position);
            infection_count +=1;
        } else if infected.contains(&position) {
            infected.remove(&position);
            flagged.insert(position);
        } else if flagged.contains(&position) {
            flagged.remove(&position);
        } else {
            weakened.insert(position);
        }

        // Move 
        position = match facing {
            0 => (position.0, position.1-1),
            1 => (position.0+1, position.1),
            2 => (position.0, position.1+1),
            3 => (position.0-1, position.1),
            _ => panic!()
        };
    }


    // see commit for p1
    println!("Part 2: {:?}", infection_count);
}