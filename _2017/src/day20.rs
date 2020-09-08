use std::collections::HashMap;

#[derive(Copy, Clone)]
#[derive(Debug)]
struct Position {
    x: i32,
    y: i32,
    z: i32
}

#[derive(Copy, Clone)]
#[derive(Debug)]
struct Particle {
    number: i32,
    position: Position,
    velocity: Position,
    acceleration: Position
}

pub fn day20() {
    let filename = "data/day20.txt";
    let mut particles = vec![];
    let mut c = 0;
    for line in common::common::FileLines::new(filename.to_string()) {
        //println!("{}", line);
        
        let words: Vec::<&str> = line.split(", ").collect();
        
        // p=<2366,784,-597>, v=<-12,-41,50>, a=<-5,1,-2>
        // p=<-2926,-3402,-2809>, v=<-55,65,-16>, a=<11,4,8>
        let dim = |x: &str| {
            let mut f = x.chars().skip(3).collect::<String>();
            f.pop();
            let mut r = f.split(',');
            let x = r.next().unwrap().parse::<i32>().unwrap();
            let y = r.next().unwrap().parse::<i32>().unwrap();
            let z = r.next().unwrap().parse::<i32>().unwrap();
            return Position {
                x:x, y:y, z:z
            }
        };

        let particle = Particle {
            number: c,
            position: dim(words[0]),
            velocity: dim(words[1]),
            acceleration: dim(words[2])
        };

        c += 1;
        particles.push(particle);

    }

    let mut p2 = particles.len();

    for _ in 0..500 {

        particles = particles.into_iter().map(|p| {
            return Particle {
                number: p.number,
                position: Position {
                    x: p.position.x + p.velocity.x + p.acceleration.x,
                    y: p.position.y + p.velocity.y + p.acceleration.y,
                    z: p.position.z + p.velocity.z + p.acceleration.z
                },
                velocity: Position {
                    x: p.velocity.x + p.acceleration.x,
                    y: p.velocity.y + p.acceleration.y,
                    z: p.velocity.z + p.acceleration.z
                },
                acceleration: p.acceleration
            };
        }).collect();

        // Part 2
        let count = particles.iter().fold(HashMap::new(), |mut acc , x| {
            let key = (x.position.x, x.position.y, x.position.z);
            let mut c = 1;
            if acc.contains_key(&key) {
                c = acc[&key] + 1;
            }
            acc.insert(key, c);
            return acc;
        });

        let dupes = count.iter().fold(vec![], |mut acc , x| {
            if x.1 > &1 {
                acc.push(x.0);
            }
            return acc;
        });

        particles = particles.iter().fold(vec![], |mut acc , x| {
            let mut found = false;
            for i in &dupes {
                if x.position.x == i.0 &&
                    x.position.y == i.1 &&
                    x.position.z == i.2 {
                    found = true;
                    break;
                }
            };
            if found == false {
                acc.push(*x);
            }
            return acc;
        });
        // Part 2

        

        p2 = particles.len();    
    }

    let mut distances: Vec<(i32,i32)>= particles.into_iter().map(|p| {
        return (p.number, p.position.x.abs() + p.position.y.abs() + p.position.z.abs());
    }).collect();

    distances.sort_by(|a, b| a.1.cmp(&b.1));

    println!("Part 1 : {:?}", distances.first().unwrap().0);
    println!("Part 2 : {:?}", p2);
    
    

}
