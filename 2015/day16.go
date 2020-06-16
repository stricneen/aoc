package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

type aunt struct {
	no     int
	traits map[string]int
}

func parse16(in string) aunt {

	tm := func(s string) string {
		s = strings.ReplaceAll(s, ":", "")
		s = strings.ReplaceAll(s, ",", "")
		return s
	}

	p := strings.Split(in, " ")
	for i := range p {
		p[i] = tm(p[i])
	}
	i, _ := strconv.Atoi(p[1])

	t1, _ := strconv.Atoi(p[3])
	t2, _ := strconv.Atoi(p[5])
	t3, _ := strconv.Atoi(p[7])

	m := make(map[string]int)
	m[p[2]] = t1
	m[p[4]] = t2
	m[p[6]] = t3

	return aunt{i, m}
}

func onScan16(scan *bufio.Scanner) {
	c := 0
	for scan.Scan() {
		ln := scan.Text()
		if ln == "#" {
			break
		}

		p := parse16(ln)

		// children: 3
		// cats: 7
		// trees: 3
		// cars: 2
		// perfumes: 1
		// goldfish: 5

		// samoyeds: 2
		// pomeranians: 3
		// akitas: 0
		// vizslas: 0

		hasCount := func(s string, i int) bool {
			x, y := p.traits[s]
			return x == i || !y
		}

		hasLess := func(s string, i int) bool {
			x, y := p.traits[s]
			return x < i || !y
		}
		hasMore := func(s string, i int) bool {
			x, y := p.traits[s]
			return x > i || !y
		}

		if hasCount("children", 3) &&
			hasMore("cats", 7) &&
			hasMore("trees", 3) &&
			hasCount("cars", 2) &&
			hasCount("perfumes", 1) &&
			hasLess("goldfish", 5) &&
			hasCount("samoyeds", 2) &&
			hasLess("pomeranians", 3) &&
			hasCount("akitas", 0) &&
			hasCount("vizslas", 0) {
			fmt.Println(p)
			c++
		}
		// if (children == 3 || !cok) && (cats == 7 || !caok) && (trees == 3 || !tok) && (cars == 2 || !carok) && (goldfish == 5 || !fok) {

		// 	fmt.Println(p)
		// 	c++
		// }
	}
	fmt.Println(c)

}

// Day16 is here
func Day16() {
	scan("data/day16.txt", onScan16)
}
