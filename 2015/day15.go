package main

import "fmt"

// Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
// Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3

// func generate(process func(x int) bool) {
// 	for i := 0; i < 10; i++ {
// 		if process(i) {
// 			break
// 		}
// 	}
// }

func generate(total int, cols int, process func(x []int)) {
	signal := make([]int, cols)

	valid := func(x []int) bool {
		t := 0
		for _, v := range x {
			t += v
		}
		return t == total
	}

	inc := func(x []int) []int {
		carry := true

		for i := range x {
			if carry {
				x[i]++
				carry = false
				if x[i] > total {
					x[i] = 0
					carry = true
				}
			}

		}
		return x
	}

	breakafter := false
	for {

		if signal[len(signal)-1] == total {
			breakafter = true
		}
		if valid(signal) {
			process(signal)
			if breakafter {
				break
			}
		}
		signal = inc(signal)

	}
}

// Day15 is
func Day15() {

	max := 0
	p := func(x []int) {

		ingredients[0].amount = x[0]
		ingredients[1].amount = x[1]
		ingredients[2].amount = x[2]
		ingredients[3].amount = x[3]

		s, c := score(ingredients)
		//fmt.Println(c)
		if s > max && c == 500 {
			max = s
		}
	}

	generate(100, 4, p)

	fmt.Println(max)

}

func score(in []ingredient) (int, int) {
	s := ingredient{"score", 0, 0, 0, 0, 0, 0}
	for _, i := range in {
		s.capacity += i.capacity * i.amount
		s.durability += i.durability * i.amount
		s.flavor += i.flavor * i.amount
		s.texture += i.texture * i.amount
		s.calories += i.calories * i.amount
	}

	pos := func(i int) int {
		if i < 0 {
			return 0
		}
		return i
	}

	s.capacity = pos(s.capacity)
	s.durability = pos(s.durability)
	s.flavor = pos(s.flavor)
	s.texture = pos(s.texture)
	s.calories = pos(s.calories)

	return s.capacity * s.durability * s.flavor * s.texture, s.calories
}

var test15 = []ingredient{
	ingredient{"Butterscotch", -1, -2, 6, 3, 8, 0},
	ingredient{"Cinnamon", 2, 3, -2, -1, 3, 0},
}

var ingredients = []ingredient{
	ingredient{"Sprinkles", 5, -1, 0, 0, 5, 0},
	ingredient{"PeanutButter", -1, 3, 0, 0, 1, 0},
	ingredient{"Frosting", 0, -1, 4, 0, 6, 0},
	ingredient{"Sugar", -1, 0, 0, 2, 8, 0},
}

type ingredient struct {
	name       string
	capacity   int
	durability int
	flavor     int
	texture    int
	calories   int
	amount     int
}
