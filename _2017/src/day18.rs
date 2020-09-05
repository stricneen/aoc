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

pub fn day18() {
    let filename = "data/day18.txt";
    
    let mut program = HashMap::new();
    let mut c = 0;

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
    c = 0;
    let mut registers = HashMap::new();

    loop {

        let curr = &program[&c];
        println!("{}  {}\t{}\t{:?}", c, curr.command, curr.register, curr.argument);


        c += 1;


        match curr.command.as_ref() {

            "snd" => {},

            "set" => {
                match curr.argument {
                    Arg::Value(v) => &registers.insert(curr.register, v),
                    Arg::Register(v) => &registers.insert(curr.register, registers[&v])
                };
            },

            "add" => {
                if registers.contains_key(&curr.register) == false {
                    registers.insert(curr.register, 0);
                }
                match curr.argument {
                    Arg::Value(v) => &registers.insert(curr.register, registers[&curr.register] + v),
                    Arg::Register(v) => &registers.insert(curr.register, registers[&curr.register] + registers[&v]),
                };
            },

            "mul" => {
                if registers.contains_key(&curr.register) == false {
                    registers.insert(curr.register, 0);
                }
                match curr.argument {
                    Arg::Value(v) => &registers.insert(curr.register, registers[&curr.register] * v),
                    Arg::Register(v) => &registers.insert(curr.register, registers[&curr.register] * registers[&v]),
                };
            },

            "mod" =>  {
                if registers.contains_key(&curr.register) == false {
                    registers.insert(curr.register, 0);
                }
                match curr.argument {
                    Arg::Value(v) => &registers.insert(curr.register, registers[&curr.register] % v),
                    Arg::Register(v) => &registers.insert(curr.register, registers[&curr.register] % registers[&v]),
                };
            },

            "rcv" => {},

            "jgz" => {
                match curr.argument {
                    Arg::Value(v) => {
                        if curr.register == '1' {
                            c += v - 1;
                        } else {
                            if registers[&curr.register] > 0 {
                                c += v - 1;
                            }
                        }
                    },
                    Arg::Register(_) => (),
                };
            },

            &_ => ()
        }
        // snd X plays a sound with a frequency equal to the value of X.
        // set X Y sets register X to the value of Y.
        // add X Y increases register X by the value of Y.
        // mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
        // mod X Y sets register X to the remainder of dividing the value contained in register X by the value of Y (that is, it sets X to the result of X modulo Y).
        // rcv X recovers the frequency of the last sound played, but only when the value of X is not zero. (If it is zero, the command does nothing.)
        // jgz X Y jumps with an offset of the value of Y, but only if the value of X is greater than zero. (An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)




        println!("{:?}\n", registers);
        

    }


    
}

