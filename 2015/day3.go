package main

import "fmt"

// Day3 is here
func Day3() {
	data := input("data/day3.txt")
	set := make(map[pair]bool)

	santa := pair{0, 0}
	robo := pair{0, 0}
	set[santa] = true

	for i, r := range data {
		if i%2 == 0 {
			santa = move(r, santa)
			set[santa] = true
		} else {
			robo = move(r, robo)
			set[robo] = true
		}
	}

	fmt.Println(len(set))
}

func move(r rune, p pair) pair {
	a := p.a.(int)
	b := p.b.(int)

	if r == '^' {
		a++
	}
	if r == 'v' {
		a--
	}
	if r == '>' {
		b++
	}
	if r == '<' {
		b--
	}
	return pair{a, b}
}
