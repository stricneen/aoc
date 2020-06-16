package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

type dist struct {
	from     string
	to       string
	distance int
}

type route struct {
	visit    []string
	distance int
}

func onScan9(scan *bufio.Scanner) {
	x := make(map[dist]int)
	y := make(map[string]bool)

	for scan.Scan() {
		ln := scan.Text()
		if ln == "#" {
			break
		}
		d := parse9(ln)
		x[d] = d.distance

		y[d.from] = true
		y[d.to] = true
	}

	locations := make([]string, len(y))
	c := 0
	for k := range y {
		locations[c] = k
		c++
	}

	min := 10000
	max := 0
	//var mind dist

	for i := 0; i < len(locations)/2; i++ {
		perm(locations, func(p []string) {

			ft := getDist(p, x)

			if ft < min {
				min = ft
			}

			if ft > max {
				max = ft
			}
		}, i)
	}
	fmt.Println("Min", min)
	fmt.Println("Max", max)
}

func getDist(locs []string, d map[dist]int) int {
	//fmt.Println(locs)
	//fmt.Println(d)
	c := 0
	for i := 1; i < len(locs); i++ {
		d := distBetween(locs[i-1], locs[i], d)
		c += d
	}

	return c
}

func distBetween(a string, b string, d map[dist]int) int {
	for k := range d {
		if (k.from == a && k.to == b) || (k.from == b && k.to == a) {
			return k.distance
		}
	}
	return 0

}

func parse9(ln string) dist {
	p := strings.Split(ln, " ")
	i, _ := strconv.Atoi(p[4])
	return dist{p[0], p[2], i}
}

// Day9 is here
func Day9() {
	scan("data/day9.txt", onScan9)
}
