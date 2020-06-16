package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"strings"
)

func strip(i string) (string, string) {

	if i[1] < 95 {
		return i[0:1], i[1:]
	}
	return i[0:2], i[2:]

}

// calc19("", start, 0, rev)
// ORnPBPMgArCaCaCaSiThCaCaSiThCaCaPBSiRnFArRnFArCaCaSiThCaCaSiThCaCaCaCaCaCaSiRnFYFArSiRnMgArCaSiRnPTiTiBFYPBFArSiRnCaSiRnTiRnFArSiAlArPTiBPTiRnCaSiAlArCaPTiTiBPMgYFArPTiRnFArSiRnCaCaFArRnCaFArCaSiRnSiRnMgArFYCaSiRnMgArCaCaSiThPRnFArPBCaSiRnMgArCaCaSiThCaSiRnTiMgArFArSiThSiThCaCaSiRnMgArCaCaSiRnFArTiBPTiRnCaSiAlArCaPTiRnFArPBPBCaCaSiThCaPBSiThPRnFArSiThCaSiThCaSiThCaPTiBSiRnFYFArCaCaPRnFArPBCaCaPBSiRnTiRnFArCaPRnFArSiRnCaCaCaSiThCaRnCaFArYCaSiRnFArBCaCaCaSiThFArPBFArCaSiRnFArRnCaCaCaFArSiRnFArTiRnPMgArF"

func calc19(mol string, p int, rev map[string]string) {

	if len(mol) < 62 {
		fmt.Println(len(mol))
	}
	// split at p
	if p < len(mol) {
		h := mol[0:p]
		t := mol[p:]

		for k, v := range rev {
			if strings.HasPrefix(t, k) {
				new := h + v + t[len(k):]
				calc19(new, 0, rev)
				//			fmt.Println(k, v)
			}
		}

		//	fmt.Println(h, t)

		calc19(mol, p+1, rev)
	}

}

func devolve(mol string, from string, to string) []string {

	r := make([]string, 0)
	for i := 0; i < len(mol); i++ {

		split := mol[i:]
		if strings.HasPrefix(split, from) {

			new := mol[0:i] + to + mol[i+len(from):]

			if len(new) < 5 {
				fmt.Println(new)
			}

			r = append(r, new)
		}
	}
	return r
}

func calc192(mol map[string]int, rev map[string]string) {

	next := make(map[string]int)

	for m, c := range mol {
		for k, v := range rev {

			devmol := devolve(m, k, v)

			for _, x := range devmol {

				_, there := mol[x]
				if there {
					next[x] = mol[x]
					fmt.Println("lower")
				} else {
					_, ok := next[x]
					if !ok {
						next[x] = c + 1
					}
				}

			}

		}
		if len(next) < 10 {
			fmt.Println(next)
		}
		//reader := bufio.NewReader(os.Stdin)
		//reader.ReadString('\n')

	}
	fmt.Println(len(next))
	calc192(next, rev)
	// c := devolve("HOHOHO", "HOH", "e")
	// fmt.Println(c)
}

func overCount(s string, sub string) int {
	c := 0
	for i := 0; i < len(s)-len(sub)+1; i++ {
		ssub := s[i : i+len(sub)]
		if ssub == sub {
			c++
		}
	}
	return c
}

type reaction struct {
	from string
	to   string
}

func shuffle(src []reaction) []reaction {

	dest := make([]reaction, len(src))
	perm := rand.Perm(len(src))
	for i, v := range perm {
		dest[v] = src[i]
	}

	return dest
}

func calc19_3(mol string, rev []reaction) {

	m := mol
	c := 0
	rev = shuffle(rev)

	min := 1000
	counter := 0

	for len(m) > 1 {

		for _, r := range rev {

			mm := strings.Replace(m, r.from, r.to, 1)
			if mm != m {
				c++ //strings.Count(m, r.from)

			} else {

			}
			m = mm
		}
		rev = shuffle(rev)

		if c < min {
			min = c
		}

		counter++
		if counter > 200 {
			m = mol
			counter = 0
			c = 0
		}

		//	fmt.Println(len(m), c, min)

	}

	fmt.Println("Part 2 : ", m, c)

}

// 185
// 186

func onScan19(scan *bufio.Scanner) {

	reactions := make([]reaction, 0)
	muts := make(map[string]bool)
	rev := make(map[string]string)
	start := "ORnPBPMgArCaCaCaSiThCaCaSiThCaCaPBSiRnFArRnFArCaCaSiThCaCaSiThCaCaCaCaCaCaSiRnFYFArSiRnMgArCaSiRnPTiTiBFYPBFArSiRnCaSiRnTiRnFArSiAlArPTiBPTiRnCaSiAlArCaPTiTiBPMgYFArPTiRnFArSiRnCaCaFArRnCaFArCaSiRnSiRnMgArFYCaSiRnMgArCaCaSiThPRnFArPBCaSiRnMgArCaCaSiThCaSiRnTiMgArFArSiThSiThCaCaSiRnMgArCaCaSiRnFArTiBPTiRnCaSiAlArCaPTiRnFArPBPBCaCaSiThCaPBSiThPRnFArSiThCaSiThCaSiThCaPTiBSiRnFYFArCaCaPRnFArPBCaCaPBSiRnTiRnFArCaPRnFArSiRnCaCaCaSiThCaRnCaFArYCaSiRnFArBCaCaCaSiThFArPBFArCaSiRnFArRnCaCaCaFArSiRnFArTiRnPMgArF"
	//start := ""
	//start := "HOHOHO"
	for scan.Scan() {

		ln := scan.Text()
		if ln == "#" {
			break
		}

		x := strings.Split(ln, " => ")
		rev[x[1]] = x[0]

		reactions = append(reactions, reaction{x[1], x[0]})

		// for i := 0; i < len(start)-len(x[0])+1; i++ {
		// 	ssub := start[i : i+len(x[0])]
		// 	if ssub == x[0] {
		// 		nm := start[0:i] + x[1] + start[i+len(x[0]):]
		// 		muts[nm] = true
		// 	}
		// }

	}

	//	calc19(start, 0, rev)
	// test := "HCaCa"
	// for k, v := range rev {

	// 	devolve(test, k, v)
	// }

	m := make(map[string]int)
	m[start] = 0
	calc19_3(start, reactions)

	fmt.Println("Part 1 : ", len(muts))
}

// Day19 is here
func Day19() {
	scan("data/day19.txt", onScan19)
}
