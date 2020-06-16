package main

import (
	"bufio"
	"fmt"
	"strings"
)

func stepGrid(grid [][]string) [][]string {

	// r := len(grid)
	// c := len(grid[0])
	//	ret := makeGrid(len(grid))
	ret := makeGrid(len(grid))
	wrap := wrapGrid(grid)
	//printGrid(wrap)

	for i := 1; i <= len(grid); i++ {
		for j := 1; j <= len(grid); j++ {

			x := wrap[i-1][j-1] + wrap[i][j-1] + wrap[i+1][j-1] + wrap[i-1][j] + wrap[i+1][j] + wrap[i-1][j+1] + wrap[i][j+1] + wrap[i+1][j+1]
			y := strings.Count(x, "#")
			//fmt.Println(x)
			if grid[i-1][j-1] == "#" {

				if y == 2 || y == 3 {
					ret[i-1][j-1] = "#"
				} else {
					ret[i-1][j-1] = "."
				}

			} else {
				if y == 3 {
					ret[i-1][j-1] = "#"
				} else {
					ret[i-1][j-1] = "."
				}

			}

		}
	}

	ret[0][0] = "#"
	ret[0][99] = "#"
	ret[99][0] = "#"
	ret[99][99] = "#"

	// ret2 := unwrapGrid(ret)
	// printGrid(ret2)

	// for x, r := range grid {
	// 	for y := range r {

	// 		//	c := 0
	// 		p := grid[x][y]

	// 		ret[x][y] = p
	// 		// if p != "#" {
	// 		// 	ret[x][y] = "#"
	// 		// } else {
	// 		// 	ret[x][y] = "."
	// 		// }

	// 		//fmt.Println(x, y)
	// 	}

	// }

	return ret
}

func count(grid [][]string) int {
	c := 0
	for _, i := range grid {
		for _, ii := range i {
			if ii == "#" {
				c++
			}
		}
	}
	return c
}

func makeGrid(i int) [][]string {
	a := make([][]string, i)
	for c := range a {
		a[c] = make([]string, i)
	}
	return a
}

func printGrid(i [][]string) {
	fmt.Println()
	for _, r := range i {
		for _, s := range r {
			if len(s) == 1 {

				fmt.Print(s)
			} else {
				fmt.Print("_")
			}
		}
		fmt.Println()
	}
}

func wrapGrid(grid [][]string) [][]string {
	r := len(grid)
	ret := makeGrid(r + 2)
	for x, i := range grid {
		for y := range i {
			ret[x+1][y+1] = grid[x][y]
		}
	}
	return ret
}

func unwrapGrid(grid [][]string) [][]string {
	r := len(grid)
	ret := makeGrid(r - 2)
	for x, i := range ret {
		for y := range i {
			ret[x][y] = grid[x+1][y+1]
		}
	}
	return ret
}

func onScan18(scan *bufio.Scanner) {

	grid := makeGrid(100)

	r := 0
	for scan.Scan() {
		ln := scan.Text()
		if ln == "@" {
			break
		}

		for i, x := range ln {
			grid[r][i] = string(x)
		}
		r++
		//	fmt.Println(ln)
	}

	c := 0
	//printGrid(grid)
	s1 := stepGrid(grid)
	//printGrid(s1)
	for c < 99 {

		s1 = stepGrid(s1)
		//printGrid(s1)

		c++
	}

	fmt.Println(count(s1))
}

// Day18 is here
func Day18() {
	scan("data/day18.txt", onScan18)
}
