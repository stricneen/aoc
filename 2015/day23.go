package main

import (
	"bufio"
	"fmt"
	"strconv"
)

type inst struct {
	cmd string
	prm string
	//offset int
}

func exec(prog []inst) {

	a := 1
	b := 0
	p := 0

	for p < len(prog) {

		i := prog[p]

		fmt.Println(i)

		switch i.cmd {

		case "hlf":
			if i.prm == "a" {
				a = a / 2
			} else {
				b = b / 2
			}
			p++

		case "tpl":
			if i.prm == "a" {
				a *= 3
			} else {
				b *= 3
			}
			p++

		case "inc":
			if i.prm == "a" {
				a++
			} else {
				b++
			}
			p++

		case "jmp":
			offset, err := strconv.Atoi(i.prm)
			if err != nil {
				fmt.Println("ssss")
			}
			p += offset

		case "jie":
			r := string(i.prm[0])
			if (r == "a" && a%2 == 0) || (r == "b" && b%2 == 0) {
				x := i.prm[3:]
				offset, _ := strconv.Atoi(x)
				p += offset
			} else {
				p++
			}

		case "jio":
			r := string(i.prm[0])
			if (r == "a" && a == 1) || (r == "b" && b == 1) {
				x := i.prm[3:]
				offset, _ := strconv.Atoi(x)
				p += offset
			} else {
				p++
			}

		}

	}

	fmt.Println("a", a)
	fmt.Println("b", b)

}

func onScan23(scan *bufio.Scanner) {

	prog := make([]inst, 0)
	for scan.Scan() {
		ln := scan.Text()
		if ln == "#" {
			break
		}

		prog = append(prog, inst{ln[:3], ln[4:]})
		//fmt.Println(ln)
	}

	exec(prog)

}

// Day23 is here
func Day23() {
	scan("data/day23.txt", onScan23)
}
