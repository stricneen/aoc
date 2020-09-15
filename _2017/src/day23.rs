use std::collections::HashMap;
use crate::day23::Arg::Value;
use crate::day23::Arg::Register;

#[derive(Debug)]
pub enum Arg {
    Register(char),
    Value(i64)
}

pub struct Instruction {
    command: String,
    register: char,
    argument: Arg
}

pub struct State {
    registers: HashMap<char, i64>,
    pointer: i64,
    input: Vec<i64>,
    output: Vec<i64>
}

pub fn day23() {
    let filename = "data/day23.txt";
    
    let mut program = HashMap::new();
    let mut c: i64 = 0;

    // Parse program
    for line in common::common::FileLines::new(filename.to_string()) {

        let mut iter = line.split_whitespace();

        let cmd = iter.next().unwrap().to_string();
        let reg = iter.next().unwrap().chars().nth(0).unwrap();
        
        let arg = match iter.next() {
            Some(x) => {
                let try_int = x.parse::<i64>();
                if try_int.is_err() { Register(x.to_string().chars().nth(0).unwrap()) }
                else { Value(try_int.unwrap()) } 
            },
            None => Value(0)
        };

        let i = Instruction { 
            command: cmd, 
            register: reg, 
            argument: arg
        };

        program.insert(c, i);    
        c += 1;
    }

    // Part 1 : Execute program
    let mut state_p1 = State {
        registers:  [('!', 0), ('a', 0)].iter().cloned().collect(),
        pointer: 0,
        input: vec![],
        output: vec![]
    };
    //cycle(&mut state_p1, &program);
    println!("Part 1 : {:?}", state_p1.registers);
    

    // Part 2
    // 914 tl

    let mut non_primes = 0;
    for c in (105_700..=122_700).step_by(17) {
        //println!("{}", c);
         if is_prime(c) == false{
             non_primes += 1;
            // println!("{} {} ", primes, c);
         }

    }
    println!("Part 2 : {}", non_primes);
    // // Part 2
    // let mut state_p2_1 = State {
    //     registers:  [('p', 0)].iter().cloned().collect(),
    //     pointer: 0,
    //     input: vec![],
    //     output: vec![]
    // };

    // let mut state_p2_2 = State {
    //     registers:  [('p', 1)].iter().cloned().collect(),
    //     pointer: 0,
    //     input: vec![],
    //     output: vec![]
    // };

    // let mut r1 = 1;
    // let mut r2 = 1;

    // let mut prog1_sends = 0;


    // while r1 != 0 && r2 != 0 {

    //     cycle(&mut state_p2_1, &program);
    //     r1 = state_p2_1.output.len();
    //     state_p2_2.input.append(&mut state_p2_1.output.clone());
    //     state_p2_1.output.clear();

    //     cycle(&mut state_p2_2, &program);
    //     r2 = state_p2_2.output.len();
    //     state_p2_1.input.append(&mut state_p2_2.output.clone());
    //     state_p2_2.output.clear();

    //     prog1_sends += r2;
    // }

    // //println!("{:?}", state_p2_1.registers);
    // //println!("{:?}", state_p2_2.registers);

    // println!("Part 2 : {}", prog1_sends);
}

fn is_prime(n: u32) -> bool {
    if n <= 1 {
        return false;
    }
    for a in 2..n {
        if n % a == 0 {
            return false; 
        }
    }
    true 
}

fn cycle(state: &mut State, program: &HashMap<i64, Instruction>) {

    loop {

        let mut inc = 1;
        if state.pointer >= program.len() as i64{
            break;
        }

        let curr = &program[&state.pointer];
        if curr.register.is_alphabetic() && state.registers.contains_key(&curr.register) == false {
            state.registers.insert(curr.register, 0);
        }
        // println!("{}  {}\t{}\t{:?}", state.pointer, curr.command, curr.register, curr.argument);
        
        match curr.command.as_ref() {



            "set" => {
                match curr.argument {
                    Arg::Value(v) => &state.registers.insert(curr.register, v),
                    Arg::Register(v) => &state.registers.insert(curr.register, state.registers[&v])
                };
            },

            "sub" => {

                match curr.argument {
                    Arg::Value(v) => { 
                        if v == -17 {
                            println!("{:?}", state.registers);
                        }
                        &state.registers.insert(curr.register, state.registers[&curr.register] - v)
                    },
                    Arg::Register(v) => &state.registers.insert(curr.register, state.registers[&curr.register] - state.registers[&v]),
                };
            },

            "mul" => {
                &state.registers.insert('!', &state.registers[&'!'] + 1);
                match curr.argument {
                    Arg::Value(v) => &state.registers.insert(curr.register, state.registers[&curr.register] * v),
                    Arg::Register(v) => &state.registers.insert(curr.register, state.registers[&curr.register] * state.registers[&v]),
                };
            },

            "jnz" => {
                match curr.argument {
                    Arg::Value(v) => {
                        if curr.register == '1' {
                            //println!("< {} {} >", curr.register, v);
                            inc = v;
                        } else {
                            if state.registers[&curr.register] != 0 {
                                //println!("< {} {} >", curr.register, v);
                                inc = v;
                            }
                        }
                    },
                    Arg::Register(v) => {
                        if state.registers[&curr.register] != 0 {
                            //println!("< {} {} >", curr.register, &v);
                            inc = state.registers[&v]
                        }
                    },
                };
            },


            &_ => panic!()
        }
        // println!("{:?}", state.registers);
        state.pointer += inc;
    }
}


