
pub fn day19() {
    let filename = "data/day19.txt";
    let mut arr = vec![];
    
    for line in common::common::FileLines::new(filename.to_string()) {
        //println!("{}", line);
        let r = line.chars().collect::<Vec<char>>();
        arr.push(r);
    }
    // println!("{:?}", arr);

    let value_at = |x: (usize, usize)| -> char {
        return arr[x.1][x.0];
    };

    // Get entrance
    let mut pos = (arr[0].iter().position(|&x| x == '|').unwrap(), 0);
    let mut dir = 's';
    let mut steps = 1;
    loop {

        pos = match dir {
            'n' => (pos.0, pos.1 - 1),
            'e' => (pos.0 + 1, pos.1),
            's' => (pos.0, pos.1 + 1),
            'w' => (pos.0 - 1, pos.1),
            _ => pos
        };

        let x = value_at(pos);

        if x.is_alphabetic() {
            print!("{}", x);
        }

        if x == '+'  {
            if dir == 'n' || dir == 's' {
                let e = value_at((pos.0 + 1, pos.1));
                //let w = value_at((pos.0 - 1, pos.1));
                if e != ' ' {
                    dir = 'e'
                } else {
                    dir = 'w'
                }
            } else if dir == 'e' || dir == 'w' {
                let n = value_at((pos.0, pos.1 - 1));
                //let w = value_at((pos.0, pos.1 + 1));
                if n != ' ' {
                    dir = 'n'
                } else {
                    dir = 's'
                }
            }
        }

        steps +=1;

        if x == 'Y' || x == 'F'{
            break;
        }


    }

    println!();
    println!("Part 2 : {}", steps)
}