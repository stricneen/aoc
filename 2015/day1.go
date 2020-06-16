package main

import (
	"fmt"
	"strings"
)

// Day1 is here
func Day1() {
	data := input("data/day1.txt")

	// part 1
	up := strings.Count(data, "(")
	down := strings.Count(data, ")")
	fmt.Println(up - down)

	// part 2
	c := 0
	for i, rune := range data {
		if c < 0 {
			fmt.Printf("%d\n", i)
			break
		}
		if rune == '(' {
			c++
		}
		if rune == ')' {
			c--
		}
	}
}
