use std::collections::HashMap;
use crate::day18::Arg::Value;
use crate::day18::Arg::Register;

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

pub fn day18() {
    let filename = "data/day18.txt";
    
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
        registers:  [].iter().cloned().collect(),
        pointer: 0,
        input: vec![],
        output: vec![]
    };
    cycle(&mut state_p1, &program);
    println!("Part 1 : {:?}", state_p1.output.last().unwrap());
    

    // Part 2
    let mut state_p2_1 = State {
        registers:  [('p', 0)].iter().cloned().collect(),
        pointer: 0,
        input: vec![],
        output: vec![]
    };

    let mut state_p2_2 = State {
        registers:  [('p', 1)].iter().cloned().collect(),
        pointer: 0,
        input: vec![],
        output: vec![]
    };

    let mut r1 = 1;
    let mut r2 = 1;

    let mut prog1_sends = 0;


    while r1 != 0 && r2 != 0 {

        cycle(&mut state_p2_1, &program);
        r1 = state_p2_1.output.len();
        state_p2_2.input.append(&mut state_p2_1.output.clone());
        state_p2_1.output.clear();

        cycle(&mut state_p2_2, &program);
        r2 = state_p2_2.output.len();
        state_p2_1.input.append(&mut state_p2_2.output.clone());
        state_p2_2.output.clear();

        prog1_sends += r2;
    }

    //println!("{:?}", state_p2_1.registers);
    //println!("{:?}", state_p2_2.registers);

    println!("Part 2 : {}", prog1_sends);
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

            "snd" => { 
                let try_int = curr.register.to_string().parse::<i64>();
                if try_int.is_err() { 
                    &state.output.push(state.registers[&curr.register]);
                } else {
                    &state.output.push(try_int.unwrap());
                }
            },

            "set" => {
                match curr.argument {
                    Arg::Value(v) => &state.registers.insert(curr.register, v),
                    Arg::Register(v) => &state.registers.insert(curr.register, state.registers[&v])
                };
            },

            "add" => {
                match curr.argument {
                    Arg::Value(v) => &state.registers.insert(curr.register, state.registers[&curr.register] + v),
                    Arg::Register(v) => &state.registers.insert(curr.register, state.registers[&curr.register] + state.registers[&v]),
                };
            },

            "mul" => {
                match curr.argument {
                    Arg::Value(v) => &state.registers.insert(curr.register, state.registers[&curr.register] * v),
                    Arg::Register(v) => &state.registers.insert(curr.register, state.registers[&curr.register] * state.registers[&v]),
                };
            },

            "mod" =>  {    
                match curr.argument {
                    Arg::Value(v) => &state.registers.insert(curr.register, state.registers[&curr.register] % v),
                    Arg::Register(v) => &state.registers.insert(curr.register, state.registers[&curr.register] % state.registers[&v]),
                };
            },

            "rcv" => {
                if state.input.len() > 0 {
                    let inp = state.input.remove(0);
                    state.registers.insert(curr.register, inp);
                } else {
                  //  println!("Insts  : {}", counter);
                    break; // no more input
                }
            },

            "jgz" => {
                match curr.argument {
                    Arg::Value(v) => {
                        if curr.register == '1' {
                            inc = v;
                        } else {
                            if state.registers[&curr.register] > 0 {
                                inc = v;
                            }
                        }
                    },
                    Arg::Register(v) => {
                        if state.registers[&curr.register] > 0 {
                            inc = state.registers[&v]
                        }
                    },
                };
            },

            &_ => ()
        }
        // println!("{:?}", state.registers);
        state.pointer += inc;
    }
}


