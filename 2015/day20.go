package main

import "fmt"

// House 1 got 10 presents.    1
// House 2 got 30 presents.    1 2
// House 3 got 40 presents.    1 3
// House 4 got 70 presents.    1 2   4
// House 5 got 60 presents.    1 5
// House 6 got 120 presents.   1 2 3   6
// House 7 got 80 presents.    1         7
// House 8 got 150 presents.   1
// House 9 got 130 presents.

func presents(house int) int {
	c := 0
	for i := 1; i <= house; i++ {
		if house%i == 0 {
			c += i
		}
	}
	return c * 10
}

/// 1 * 50

func lazy(house int) int {
	c := 0
	//h := 0

	//	fmt.Println("House", house)
	for elf := 1; elf <= house; elf++ {
		if elf*50 >= house && house%elf == 0 {
			c += elf
			//			fmt.Println(elf, c)
		}
	}
	return c * 11
}

// Day20 is
func Day20() {

	input := 29000000
	house2 := 718200

	p := lazy(house2)
	fmt.Println("Total", p)

	for p != input {
		if p > input {
			fmt.Println(house2, p)
			//fmt.Println("Total", p)

		}
		house2--
		p = lazy(house2)

	}

	// th 816120
	// 718200
	// 705600 - day 2 answer

	// Part 1
	// for p != input {
	// 	if p > input {
	// 		fmt.Println(house, p)
	// 	}
	// 	house++
	// 	p = presents(house)
	// }

	// fmt.Println(house)

	// 665280
}
