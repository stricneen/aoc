package main

import (
	"fmt"
	"strconv"
)

// Day10 is here
func Day10() {

	start := "4"
	r := ""
	ps(start)

	// after 50
	// 3
	// 1355550

	// 4
	// 1355550

	var t int
	for i := 0; i < 20; i++ {

		r = step(start)
		fmt.Println("   ", len(r)-t)
		//psi(r, 40)
		//		pi(i)
		t = len(r)
		pi(t)

		ps("")
		start = r
	}

	fmt.Println(len(start))
	//end := step(start)
	// ps(end)
}

func step(in string) string {
	ret := ""
	var cur rune = ' '
	c := 0

	for _, r := range in {
		if r != cur && cur != ' ' {
			ret += strconv.Itoa(c) + string(cur)
			c = 0
		}
		cur = r
		c++
	}
	ret += strconv.Itoa(c) + string(cur)
	return ret
}
