package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"strconv"
)

// Day4 is here
func Day4() {

	input := "bgvyzdsv"
	c := 1

	for c > 0 {
		data := input + strconv.Itoa(c)
		hash := md5Hash(data)
		if hash[0:7] == "0000000" {
			break
		}
		c++
	}
	fmt.Println(c)
}

func md5Hash(text string) string {
	algorithm := md5.New()
	algorithm.Write([]byte(text))
	return hex.EncodeToString(algorithm.Sum(nil))
}
