package main

import "fmt"

type player struct {
	name      string
	hitPoints int
	damage    int
	armor     int
}

// 112

// Day21 is
func Day21() {

	henry := player{"henry", 100, 0, 0}
	boss := player{"boss", 100, 8, 2}

	for d := 4; d < 13; d++ {
		for a := 0; a < 11; a++ {

			henry.hitPoints = 100
			henry.damage = d
			henry.armor = a

			boss.hitPoints = 100

			winner := fight(henry, boss)
			if winner.name == "boss" {

				//	fmt.Println(winner, damageCost(henry.damage)+armorCost(henry.armor))
				fmt.Println(winner, henry.damage, henry.armor, maxCost(henry.damage, henry.armor))
			}
		}
	}

}

func damageCost(amount int) int {
	damage := make(map[int]int)
	damage[4] = 8
	damage[5] = 10
	damage[6] = 25
	damage[7] = 40
	damage[8] = 65
	damage[9] = 90
	damage[10] = 124
	damage[11] = 174

	damage[12] = 200
	return damage[amount]
}

func armorCost(amount int) int {
	armor := make(map[int]int)
	armor[1] = 13
	armor[2] = 31
	armor[3] = 51
	armor[4] = 71
	armor[5] = 93
	armor[6] = 115
	armor[7] = 142
	armor[8] = 182

	armor[9] = 300
	armor[10] = 300

	return armor[amount]
}

func maxCost(damage int, armor int) int {
	gold := 0

	return gold
}

// Rings:      Cost  Damage  Armor
// Damage +1    25     1       0
// Damage +2    50     2       0
// Damage +3   100     3       0

// Weapons:    Cost  Damage  Armor
// Dagger        8     4       0
// Shortsword   10     5       0
// Warhammer    25     6       0
// Longsword    40     7       0
// Greataxe     74     8       0

// Armor:      Cost  Damage  Armor
// Leather      13     0       1
// Chainmail    31     0       2
// Splintmail   53     0       3
// Bandedmail   75     0       4
// Platemail   102     0       5

// Defense +1   20     0       1
// Defense +2   40     0       2
// Defense +3   80     0       3

func fight(p1 player, p2 player) player {

	p1Attack := p1.damage - p2.armor
	p2Attack := p2.damage - p1.armor

	if p1Attack < 1 {
		p1Attack = 1
	}
	if p2Attack < 1 {
		p2Attack = 1
	}

	for true { // someone died

		p2.hitPoints -= p1Attack
		if p2.hitPoints < 1 {
			return p1
		}

		p1.hitPoints -= p2Attack
		if p1.hitPoints < 1 {
			return p2
		}

	}

	return player{"", 0, 0, 0}
}
