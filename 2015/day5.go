package main

import (
	"bufio"
	"fmt"
	"strings"
)

func isNice1(ln string) bool {
	return hasThreeVowels(ln) && isValid(ln) && hasPair(ln)
}

func hasThreeVowels(ln string) bool {
	as := strings.Count(ln, "a")
	es := strings.Count(ln, "e")
	is := strings.Count(ln, "i")
	os := strings.Count(ln, "o")
	us := strings.Count(ln, "u")
	return as+es+is+os+us > 2
}

func isValid(ln string) bool {
	as := strings.Count(ln, "ab")
	es := strings.Count(ln, "cd")
	is := strings.Count(ln, "pq")
	us := strings.Count(ln, "xy")
	return as+es+is+us == 0
}

func hasPair(ln string) bool {
	c := ' '
	for _, rune := range ln {
		if rune == c {
			return true
		}
		c = rune
	}
	return false
}

func isNice2(ln string) bool {
	return twoPair(ln) && surround(ln)
}

func twoPair(ln string) bool {
	for i := 0; i < len(ln)-2; i++ {
		check := ln[i : i+2]
		c := strings.Count(ln, check)
		if c > 1 {
			return true
		}
	}
	return false
}

func surround(ln string) bool {
	for i := 0; i < len(ln)-2; i++ {
		if ln[i] == ln[i+2] {
			return true
		}
	}
	return false
}

func onScan(scan *bufio.Scanner) {
	c1 := 0
	c2 := 0
	for scan.Scan() {
		ln := scan.Text()
		nice1 := isNice1(ln)
		nice2 := isNice2(ln)

		if nice1 {
			c1++
		}
		if nice2 {
			c2++
		}
	}
	fmt.Println("Part 1 : ", c1)
	fmt.Println("Part 2 : ", c2)
}

// Day5 is here
func Day5() {
	scan("data/day5.txt", onScan)
}
