package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"log"
	"os"
)

type pair struct {
	a, b interface{}
}

func input(filename string) string {
	dat, err := ioutil.ReadFile(filename)
	check(err)
	return string(dat)
}

type onScanFunc func(*bufio.Scanner)

// Permute the values at index i to len(a)-1.
func perm(a []string, f func([]string), i int) {
	if i > len(a) {
		f(a)
		return
	}
	perm(a, f, i+1)
	for j := i + 1; j < len(a); j++ {
		a[i], a[j] = a[j], a[i]
		perm(a, f, i+1)
		a[i], a[j] = a[j], a[i]
	}
}

func contains(a []string, i string) bool {
	for _, ii := range a {
		if ii == i {
			return true
		}
	}
	return false
}

func scan(filename string, f onScanFunc) {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	f(scanner)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func ps(s string) {
	fmt.Println(s)
}

func psi(s string, col int) {
	fmt.Printf("%80v", s)
	//fmt.Println(s)
}

func pi(s int) {
	fmt.Println(s)
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}
