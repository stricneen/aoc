package main

import (
	"bufio"
	"fmt"
	"sort"
	"strconv"
)

// 	25
// 	20 15 10 5 5

func try(score *int, min *int, containers []int, amount int, used []int) {

	for i, f := range containers {
		if f == amount {

			// Found one
			//fmt.Println("found")
			temp := append(used, amount)

			if len(temp) == 4 {

				*score++
			}

			if len(temp) < *min {
				*min = len(temp)
				fmt.Println("******MIN", *min)
			}

			//fmt.Println(temp)
		}

		if f < amount {
			//newC := removeAt(containers, i)
			newC := removeTo(containers, i)

			newAmount := amount - f
			u := append(used, f)

			try(score, min, newC, newAmount, u)
		}
	}

}

func removeTo(a []int, index int) []int {
	b := make([]int, 0)

	for i, f := range a {
		if i > index {
			b = append(b, f)
		}
	}
	return b
}

func removeAt(a []int, index int) []int {
	b := make([]int, len(a)-1)

	c := 0
	for i, f := range a {
		if i != index {
			b[c] = f
			c++
		}
	}
	return b
}

func calc(containers []int, amount int) int {

	sort.Ints(containers)
	reverse(containers)

	used := make([]int, 0)

	score := 0
	min := 100
	try(&score, &min, containers, amount, used)

	fmt.Println(score)
	// 	25
	// 	20 15 10 5 5

	//    	 5
	// 25	15 10 5 5
	// 	 5
	// 	 5

	// 	-----
	// 	25
	// 	15 10 5 5

	//	10

	//fmt.Println(containers)

	return 0
}

func reverse(s []int) {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
}

func onScan17(scan *bufio.Scanner) {

	// 20, 15, 10, 5, and 5
	// test := make([]int, 5)
	// test[0] = 5
	// test[1] = 10
	// test[2] = 15
	// test[3] = 5
	// test[4] = 20

	// testResult := calc(test, 25)
	// fmt.Println(testResult)

	// return
	c := make([]int, 0)
	for scan.Scan() {
		ln := scan.Text()
		if ln == "#" {
			break
		}

		i, _ := strconv.Atoi(ln)
		c = append(c, i)
		fmt.Println(ln)
	}

	result := calc(c, 150)
	fmt.Println(result)

	// for i := 0; i < len(c)/2; i++ {
	// 	perm(c, func(s []string) {
	// 		//fmt.Println(s)
	// 	}, i)
	// }

}

// Day17 is here
func Day17() {
	scan("data/day17.txt", onScan17)
}
