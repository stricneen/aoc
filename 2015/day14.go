package main

import (
	"fmt"
)

type deer struct {
	name  string
	speed int
	time  int
	rest  int
	score int
	dist  int
}

func distAdfter(secs int, d deer) int {

	section := d.time + d.rest
	remainder := secs % section

	travelledSections := (secs - remainder) / (section)

	timeleft := d.time
	if remainder < timeleft {
		timeleft = remainder
	}
	// 1120
	// 1056
	travelled := (travelledSections * d.time * d.speed) + (timeleft * d.speed)
	fmt.Println(remainder)
	return travelled
}

func scoreAfter(secs int, deers []deer) []deer {

	for i := 1; i < secs; i++ {

		for j, d := range deers {
			deers[j].dist = distAdfter(i, d)
		}

		max := 0
		for _, d := range deers {
			if d.dist > max {
				max = d.dist
			}
		}

		for j, d := range deers {
			if d.dist == max {
				deers[j].score++
			}
		}
	}
	return deers
}

// Day14 is here
func Day14() {

	// for _, d := range test {
	// 	dist := distAdfter(1000, d)
	// 	score := scoreAfter(1000, d)
	// 	fmt.Println(d.name, dist)
	// }
	scoreAfter(1000, test)
	fmt.Println(test)
	// for _, d := range racers {
	// 	dist := distAdfter(2503, d)
	//  score := scoreAfter(2503, d)
	// 	fmt.Println(d.name, dist, score)
	// }
	scoreAfter(2503, racers)
	fmt.Println(racers)
}

var test = []deer{
	deer{"Comet", 14, 10, 127, 0, 0},  // 689
	deer{"Dancer", 16, 11, 162, 0, 0}, // 312
}

var racers = []deer{
	deer{"Vixen", 8, 8, 53, 0, 0},
	deer{"Blitzen", 13, 4, 49, 0, 0},
	deer{"Rudolph", 20, 7, 132, 0, 0},
	deer{"Cupid", 12, 4, 43, 0, 0},
	deer{"Donner", 9, 5, 38, 0, 0},
	deer{"Dasher", 10, 4, 37, 0, 0},
	deer{"Comet", 3, 37, 76, 0, 0},
	deer{"Prancer", 9, 12, 97, 0, 0},
	deer{"Dancer", 37, 1, 36, 0, 0},
}

// Vixen can fly 8 km/s for 8 seconds, but then must rest for 53 seconds.
// Blitzen can fly 13 km/s for 4 seconds, but then must rest for 49 seconds.
// Rudolph can fly 20 km/s for 7 seconds, but then must rest for 132 seconds.
// Cupid can fly 12 km/s for 4 seconds, but then must rest for 43 seconds.
// Donner can fly 9 km/s for 5 seconds, but then must rest for 38 seconds.
// Dasher can fly 10 km/s for 4 seconds, but then must rest for 37 seconds.
// Comet can fly 3 km/s for 37 seconds, but then must rest for 76 seconds.
// Prancer can fly 9 km/s for 12 seconds, but then must rest for 97 seconds.
// Dancer can fly 37 km/s for 1 seconds, but then must rest for 36 seconds.
