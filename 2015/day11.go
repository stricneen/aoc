package main

// Day11 is here
func Day11() {
	start := "vzbxkghb"
	ps(start)
	n := start
	for i := 0; i < 2; i++ {
		n = next(n)
		ps(n)
	}
}

func isValidPassword(in string) bool {

	hp := false
	for i := 0; i < len(in)-2; i++ {
		if in[i] == in[i+1]-1 && in[i+1] == in[i+2]-1 {
			hp = true
			break
		}
	}

	var pairs [6]byte
	index := 0
	for i := 0; i < len(in)-1; i++ {
		if in[i] == in[i+1] {
			pairs[index] = in[i]
			index++
			i++
		}
	}

	c := 0
	for i := 0; i < len(pairs)-1; i++ {
		if pairs[i] != pairs[i+1] && pairs[i] != 0 {
			c++
		}
	}

	return c > 1 && hp
}

func next(in string) string {
	n := in
	valid := false
	for valid == false {
		n = inc(n)
		n = ilo(n)
		valid = isValidPassword(n)
	}
	return n
}

func ilo(in string) string {
	ret := ""
	f := false
	for k := range in {
		x := in[k]
		if f {
			x = 97
		} else if x == 105 || x == 108 || x == 111 {
			x++
			f = true
		}
		ret += string(x)
	}
	return ret
}

func inc(in string) string {
	ret := ""
	carry := true
	for k := range in {
		x := in[len(in)-1-k]
		n := x
		if carry {
			n++
			if n == 123 {
				n = 97
			} else {
				carry = false
			}
		}
		ret = string(n) + ret
	}
	return ret
}
