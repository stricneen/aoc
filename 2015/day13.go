package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

type seating struct {
	diner  string
	nextTo string
	happy  int
}

func happiness(order []string, s []seating) int {
	// fmt.Println(order)
	// fmt.Println(s)

	// fmt.Println()

	//[Alice David Bob Carol]
	//[{Alice Bob. 54} {Alice Carol. -79} {Alice David. -2} {Bob Alice. 83} {Bob Carol. -7} {Bob David. -63} {Carol Alice. -62} {Carol Bob. 60} {Carol David. 55} {David Alice. 46} {David Bob. -7} {David Carol. 41}]
	r := 0

	for i := 0; i < len(order); i++ {
		n := i + 1
		if n == len(order) {
			n = 0
		}
		//	fmt.Println(order[i], order[n])

		for _, neighbours := range s {
			if neighbours.diner == order[i] && neighbours.nextTo == order[n] {
				r += neighbours.happy
			}
		}
	}

	for i := len(order) - 1; i >= 0; i-- {
		n := i - 1
		if n < 0 {
			n = len(order) - 1
		}
		//fmt.Println(order[i], order[n])
		for _, neighbours := range s {
			if neighbours.diner == order[i] && neighbours.nextTo == order[n] {
				r += neighbours.happy
			}
		}
	}

	return r
}

func solve13(s []seating) {

	// Add me
	for _, v := range s {
		s = append(s, seating{"Me", v.diner, 0})
		s = append(s, seating{v.diner, "Me", 0})
	}

	// fmt.Println(s)
	var people []string
	for _, seat := range s {
		if contains(people, seat.diner) == false {
			people = append(people, seat.diner)
		}
	}

	max := 0
	for i := 0; i < len(people)/2; i++ {
		perm(people, func(p []string) {

			c := happiness(p, s)
			if c > max {
				max = c
			}
		}, i)
	}
	fmt.Println(max)
}

func onScan13(scan *bufio.Scanner) {
	var s []seating
	//s := make(map[seating]string)
	for scan.Scan() {
		ln := scan.Text()
		if ln == "#" {
			break
		}
		seat := parse13(ln)
		//s[seat] = seat.diner
		s = append(s, seat)
	}

	solve13(s)
}

// Day13 is here
func Day13() {
	scan("data/day13.txt", onScan13)
}

func parse13(ln string) seating {
	s := strings.Split(ln, " ")
	t, _ := strconv.Atoi(s[3])
	if s[2] == "lose" {
		t *= -1
	}
	next := s[10][:len(s[10])-1]
	return seating{s[0], next, t}
}
