package main

import (
	"bufio"
	"fmt"
	"strings"
)

func parse8(ln string) (int, int, int) {
	var x, y, z int
	for _, r := range ln {
		x++
		y++
		z++
		if r == '\\' {
			y--
		}

		if r == '"' || r == '\\' {
			z++
		}

	}

	ds := strings.Count(ln, "\\\\")
	xs := strings.Count(ln, "\\x")
	xs2 := strings.Count(ln, "\\\\x")

	return x, y - 2 + ds - (xs * 2) + xs2, z + 2
}

//1377
//1505
func onScan8(scan *bufio.Scanner) {

	var x, y, z int

	for scan.Scan() {
		ln := scan.Text()

		xx, yy, zz := parse8(ln)
		x += xx
		y += yy
		z += zz
		fmt.Println(ln)
		fmt.Println(xx, yy, zz)
	}
	fmt.Println(x, y, z)
	fmt.Println(x - y)
	fmt.Println(z - x)

}

// Day8 is here
func Day8() {
	scan("data/day8.txt", onScan8)
}
