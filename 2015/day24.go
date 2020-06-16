package main

import (
	"bufio"
	"fmt"
	"strconv"
)

func pairs(group int, sum int, set []int) [][]int {
	r := make([][]int, 0)
	for i := 0; i < len(set); i++ {
		for j := i + 1; j < len(set); j++ {
			if set[i]+set[j] == sum {
				r = append(r, []int{group - sum, set[i], set[j]})
			}
		}
	}
	return r
}

func bsum(b string, in []int) (int, []int) {

	s := 0
	comps := make([]int, 0)
	for i := 0; i < len(b); i++ {

		if b[len(b)-i-1] == 49 {
			s += in[i]
			comps = append(comps, in[i])
		}
	}

	if s == 1 {
		fmt.Println(s)
	}

	return s, comps

}

func prod(in []int) int {
	c := 1

	for _, v := range in {
		c *= v
	}
	return c
}

func exec24(p []int) {
	t := 0
	for _, v := range p {
		t += v
	}
	group := t / 4

	fmt.Println("Total", t, "Group", group)
	//th 237052772611
	//      98101936603
	var c int64
	b := ""
	min := 10
	minsum := 2370527726110
	for len(b) <= len(p) {

		b = strconv.FormatInt(c, 2)
		sum, comps := bsum(b, p)

		if sum == group {
			// if len(comps) > 6 {
			// 	return
			// }
			//	t := prod(comps)
			if len(comps) < min {
				min = len(comps)
				fmt.Println(min)
			}
			//	fmt.Println(comps)

			if len(comps) == 5 {
				if prod(comps) < minsum {
					minsum = prod(comps)
					fmt.Println(minsum)
				}
			}

		}

		c++
	}
	fmt.Println(min)
	fmt.Println(minsum)
	//	ps := pairs(t/3, p)

	// for i := 0; i < len(p); i++ {

	// 	ps := pairs(group, group-p[i], remove(p[i], p))

	// 	//fmt.Println(group - p[i])
	// 	fmt.Println(ps)
	// 	fmt.Println()
	// }

	// for i := 0; i < len(p); i++ {
	// 	for j := 0; j < len(p)-1; j++ {

	// 		a := remove(p[i], p)
	// 		b := remove(a[j], a)

	// 		subg:= group - p[i] - a[j]
	// 		rs := pairs(subg, , b)

	// 		for _, v := range rs {
	// 			fmt.Println(p[i], a[j], v)
	// 		}

	// 	}
	// }

}

func remove(i int, is []int) []int {
	c := 0
	r := make([]int, len(is)-1)
	for _, v := range is {
		if v != i {
			r[c] = v
			c++
		}
	}
	return r
}

func onScan24(scan *bufio.Scanner) {

	p := make([]int, 0)
	for scan.Scan() {
		ln := scan.Text()
		if ln == "#" {
			break
		}

		t, _ := strconv.Atoi(ln)
		p = append([]int{t}, p...)
		//fmt.Println(ln)
	}
	exec24(p)

}

// Day24 is here
func Day24() {
	scan("data/day24.txt", onScan24)
}
