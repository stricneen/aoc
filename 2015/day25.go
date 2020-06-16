package main

import "fmt"

//To continue, please consult the code grid in the manual.
//Enter the code at row 2981, column 3075.

func day25() {
	fmt.Println("Happy Christmas")

	// row := 2981
	// col := 3075

	fmt.Println(number(4, 2))
	fmt.Println(number(1, 5))

	pos := number(2981, 3075)
	fmt.Println(pos)

	fmt.Println(countTo(pos))

	for i := 1; i < 10; i++ {
		fmt.Println(i, countTo(i))
	}
}

func countTo(to int) int {

	acc := 20151125

	for i := 1; i < to; i++ {
		acc *= 252533
		acc = acc % 33554393
	}

	return acc
}

// th 28836990

func number(r int, c int) int {

	ctop := addDown(c)
	acc := c
	for i := 1; i < r; i++ {
		ctop += acc
		acc++
	}

	return ctop
}

func addDown(i int) int {
	if i == 1 {
		return 1
	}
	return i + addDown(i-1)
}
