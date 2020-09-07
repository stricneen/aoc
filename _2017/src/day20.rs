
struct Position {
    x: i32,
    y: i32,
    z: i32
}

struct Particle {
    position: Position,
    velocity: Position,
    acceleration: Position
}

pub fn day20() {
    let filename = "data/day20.txt";
    let mut particles = vec![];
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
                x: x, y:y, z:z
            }
        };

        let particle = Particle {
            position: dim(words[0]),
            velocity: dim(words[1]),
            acceleration: dim(words[2])
        };

        particles.push(particle);

    }

    let x = particles.first();
}


