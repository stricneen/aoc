#!/usr/bin/env python3

import sys
from collections import defaultdict
from itertools import permutations


class computer:
    def __init__(self, program):
        self.program = defaultdict(int)
        for i, v in enumerate(list(map(int, program.split(",")))):
            self.program[i] = v
        self.eip = 0
        self.rel_base = 0

    def get_param(self, mode, reg):
        value = self.program[self.eip + reg]
        if mode == "0":
            return self.program[value]
        elif mode == "1":
            return value
        elif mode == "2":
            return self.program[self.rel_base + value]
        else:
            print("Error: Invalid Parameter Mode")
            sys.exit()

    def get_address(self, mode, reg):
        value = self.program[self.eip + reg]
        if mode == "0":
            return value
        elif mode == "2":
            return self.rel_base + value
        else:
            print("Error: Invalid Address Mode")
            sys.exit()

    def compute(self, signal):
        while True:
            inst = self.program[self.eip]
            op = inst % 100
            mode3, mode2, mode1 = f"{inst // 100:03d}"
            if op == 1:
                self.program[self.get_address(mode3, 3)] = self.get_param(
                    mode1, 1
                ) + self.get_param(mode2, 2)
                self.eip += 4
            elif op == 2:
                self.program[self.get_address(mode3, 3)] = self.get_param(
                    mode1, 1
                ) * self.get_param(mode2, 2)
                self.eip += 4

                print(self.get_param(mode1, 1) * self.get_param(mode2, 2))

            elif op == 3:
                self.program[self.get_address(mode1, 1)] = signal
                self.eip += 2
            elif op == 4:
                print(self.get_param(mode1, 1))
                self.eip += 2
            elif op == 5:
                if self.get_param(mode1, 1) != 0:
                    self.eip = self.get_param(mode2, 2)
                else:
                    self.eip += 3
            elif op == 6:
                if self.get_param(mode1, 1) == 0:
                    self.eip = self.get_param(mode2, 2)
                else:
                    self.eip += 3
            elif op == 7:
                self.program[self.get_address(mode3, 3)] = int(
                    self.get_param(mode1, 1) < self.get_param(mode2, 2)
                )
                self.eip += 4
            elif op == 8:
                self.program[self.get_address(mode3, 3)] = int(
                    self.get_param(mode1, 1) == self.get_param(mode2, 2)
                )
                self.eip += 4
            elif op == 9:
                self.rel_base += self.get_param(mode1, 1)
                self.eip += 2
            elif op == 99:
                self.done = True
                return None
            else:
                print("Error")
                sys.exit()


with open('data/day9.txt') as f:
    program_str = f.readline()

# print(program_str)

print("Part 1:")
comp = computer(program_str)
comp.compute(1)

# print("Part 2:")
# comp = computer(program_str)
# comp.compute(2)