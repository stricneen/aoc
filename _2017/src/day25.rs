pub fn xmas() {

    let iters = 12399302;

    let mut tape = vec![0; 10000];
    let mut pos: usize = 5000;
    let mut state = 'A';

    for _ in 0..iters {

        match state {
            'A' => {
                if tape[pos] == 0 {
                    tape[pos] = 1;  pos += 1; state = 'B';
                } else {
                    tape[pos] = 0;  pos += 1; state = 'C';
                }
            },

            'B' => {
                if tape[pos] == 0 {
                    tape[pos] = 0;  pos -= 1; state = 'A';
                } else {
                    tape[pos] = 0;  pos += 1; state = 'D';
                }
            },

            'C' => {
                if tape[pos] == 0 {
                    tape[pos] = 1;  pos += 1; state = 'D';
                } else {
                    tape[pos] = 1;  pos += 1; state = 'A';
                }
            },

            'D' => {
                if tape[pos] == 0 {
                    tape[pos] = 1;  pos -= 1; state = 'E';
                } else {
                    tape[pos] = 0;  pos -= 1; state = 'D';
                }
            },

            'E' => {
                if tape[pos] == 0 {
                    tape[pos] = 1;  pos += 1; state = 'F';
                } else {
                    tape[pos] = 1;  pos -= 1; state = 'B';
                }
            },

            'F' => {
                if tape[pos] == 0 {
                    tape[pos] = 1;  pos += 1; state = 'A';
                } else {
                    tape[pos] = 1;  pos += 1; state = 'E';
                }
            },

            _ => panic!()
        }
        //println!("{}", pos);
   }

    let ones = tape.iter().fold(0, |acc,x| { acc + x });
    println!("Part 1 : {}", ones);

}