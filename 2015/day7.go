package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

type wire struct {
	name  string
	value int
}

type cmd struct {
	inWire1 string
	inWire2 string
	command string
	output  string
}

type rcmd struct {
	inVal1  int
	inVal2  int
	command string
	output  string
}

func parse7(ln string) cmd {
	command := strings.Split(ln, " -> ")
	in := strings.Split(command[0], " ")
	// fmt.Println(in)
	switch len(in) {
	case 1:
		return cmd{in[0], "", "INPUT", command[1]}

	case 2:
		return cmd{in[1], "", "NOT", command[1]}
	case 3:
		return cmd{in[0], in[2], in[1], command[1]}
	}
	return cmd{"", "", "INVALID", command[1]}
}

func run(wires map[string]int, cmd rcmd) {

	if cmd.command == "INPUT" {
		wires[cmd.output] = cmd.inVal1
	}

	if cmd.command == "AND" {
		wires[cmd.output] = cmd.inVal1 & cmd.inVal2
	}

	if cmd.command == "OR" {
		wires[cmd.output] = cmd.inVal1 | cmd.inVal2
	}

	if cmd.command == "NOT" {
		wires[cmd.output] = 65536 + ^cmd.inVal1
	}

	if cmd.command == "LSHIFT" {
		wires[cmd.output] = cmd.inVal1 << cmd.inVal2
	}

	if cmd.command == "RSHIFT" {
		wires[cmd.output] = cmd.inVal1 >> cmd.inVal2
	}

}

func resolve(wires map[string]int, a string, b string) (int, int, bool) {
	x := -1
	y := -1

	i, err := strconv.Atoi(a)
	if err == nil {
		x = i
	} else {
		i, e := wires[a]
		if e {
			x = i
		}
	}

	if b == "" {
		y = 0
	} else {

		i, err = strconv.Atoi(b)
		if err == nil {
			y = i
		} else {
			i, e := wires[b]
			if e {
				y = i
			}
		}
	}

	return x, y, x >= 0 && y >= 0
}

func onScan7(scan *bufio.Scanner) {

	instr := make(map[cmd]bool)

	for scan.Scan() {
		ln := scan.Text()
		if ln == "#" {
			break
		}

		cmd := parse7(ln)
		instr[cmd] = true
	}

	wires := make(map[string]int)
	for {
		x := isComplete(instr)
		if x == 0 {
			fmt.Println(wires["a"])
			break
		}

		for k, v := range instr {

			if v {

				if k.command == "INPUT" {

					x, y, r := resolve(wires, k.inWire1, "")
					if r {
						run(wires, rcmd{x, y, k.command, k.output})
						instr[k] = false
					}

				} else if k.command == "NOT" || k.command == "LSHIFT" || k.command == "RSHIFT" {
					x, y, r := resolve(wires, k.inWire1, k.inWire2)
					if r {
						run(wires, rcmd{x, y, k.command, k.output})
						instr[k] = false
					}
				} else {
					x, y, r := resolve(wires, k.inWire1, k.inWire2)
					if r {
						run(wires, rcmd{x, y, k.command, k.output})
						instr[k] = false
					}
				}

			}

		}

	}

}

func isComplete(m map[cmd]bool) int {
	c := 0
	for _, v := range m {
		if v {
			c++
			//fmt.Println(k)
		}
	}
	//fmt.Println()
	return c
}

// Day7 is here
func Day7() {
	scan("data/day7.txt", onScan7)
}
