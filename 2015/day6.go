package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

type rect struct {
	x1 int
	y1 int
	x2 int
	y2 int
}

func onScan6(scan *bufio.Scanner) {

	var lights [1000][1000]int

	for scan.Scan() {
		ln := scan.Text()
		cmd, r := parse(ln)

		switch cmd {
		case "toggle":
			toggle(&lights, r)
		case "on":
			on(&lights, r)
		case "off":
			off(&lights, r)
		}
	}

	howMany(lights)

}

func toggle(mat *[1000][1000]int, r rect) {
	for i := r.x1; i <= r.x2; i++ {
		for j := r.y1; j <= r.y2; j++ {
			mat[i][j] = mat[i][j] + 2
		}
	}
}

func on(mat *[1000][1000]int, r rect) {
	for i := r.x1; i <= r.x2; i++ {
		for j := r.y1; j <= r.y2; j++ {
			mat[i][j]++
		}
	}
}

func off(mat *[1000][1000]int, r rect) {
	for i := r.x1; i <= r.x2; i++ {
		for j := r.y1; j <= r.y2; j++ {
			mat[i][j]--
			if mat[i][j] < 0 {
				mat[i][j] = 0
			}
		}
	}
}

func parseCoords(coords string) (int, int) {
	c := strings.Split(coords, ",")
	x, err := strconv.Atoi(c[0])
	check(err)
	y, err := strconv.Atoi(c[1])
	check(err)
	return x, y
}

func parse(ln string) (string, rect) {
	s := strings.Split(ln, " ")

	if s[0] == "toggle" {
		x1, y1 := parseCoords(s[1])
		x2, y2 := parseCoords(s[3])
		return "toggle", rect{x1, y1, x2, y2}
	}
	x1, y1 := parseCoords(s[2])
	x2, y2 := parseCoords(s[4])
	return s[1], rect{x1, y1, x2, y2}

}

// 17325717

func howMany(mat [1000][1000]int) {
	var c, i, j int
	for i = 0; i < 1000; i++ {
		for j = 0; j < 1000; j++ {
			c += mat[i][j]

		}
	}
	fmt.Println(c)
}

// Day6 is here
func Day6() {
	scan("data/day6.txt", onScan6)
}
