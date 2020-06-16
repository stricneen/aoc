package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
	"strconv"
	"strings"
)

// Day2 is here
func Day2() {
	file, err := os.Open("data/day2.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	paper := 0
	ribbon := 0
	for scanner.Scan() {
		p, r := wrapping(scanner.Text())
		paper += p
		ribbon += r
	}
	fmt.Println(paper)
	fmt.Println(ribbon)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func wrapping(ln string) (int, int) {
	x, y, z := extract(ln)
	paper := 3*x*y + 2*x*z + 2*y*z
	ribbon := 2*x + 2*y + x*y*z
	return paper, ribbon
}

func extract(ln string) (int, int, int) {
	dims := strings.Split(ln, "x")
	w, err := strconv.Atoi(dims[0])
	check(err)
	h, err := strconv.Atoi(dims[1])
	check(err)
	b, err := strconv.Atoi(dims[2])
	check(err)
	ints := []int{w, h, b}
	sort.Ints(ints)
	return ints[0], ints[1], ints[2]
}
