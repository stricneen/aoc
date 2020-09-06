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

    // Execute program
    let mut state0 = State {
        registers:  [('p', 0)].iter().cloned().collect(),
        pointer: 0,
        input: vec![],
        output: vec![]
    };
    
    cycle(&mut state0, program);

    println!("Part 1 : {:?}", state0.output);
    
}

fn cycle(state: &mut State, program: HashMap<i64, Instruction>) {

    let mut output = Vec::new();

    loop {

        let curr = &program[&state.pointer];
        if state.registers.contains_key(&curr.register) == false {
            state.registers.insert(curr.register, 0);
        }
        // println!("{}  {}\t{}\t{:?}", c, curr.command, curr.register, curr.argument);

        state.pointer += 1;

        match curr.command.as_ref() {

            "snd" => {
                match curr.argument {
                    Arg::Value(v) => &output.push(v),
                    Arg::Register(v) => &output.push(state.registers[&v])
                };
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
                if state.registers[&curr.register] > 0{
                    break;
                }
            },

            "jgz" => {
                match curr.argument {
                    Arg::Value(v) => {
                        if curr.register == '1' {
                            state.pointer += v - 1;
                        } else {
                            if state.registers[&curr.register] > 0 {
                                state.pointer += v - 1;
                            }
                        }
                    },
                    Arg::Register(_) => (),
                };
            },

            &_ => ()
        }
    }

    state.output = output;

}

