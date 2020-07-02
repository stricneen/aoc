# Disc #1 has 17 positions; at time=0, it is at position 1.
# Disc #2 has 7 positions; at time=0, it is at position 0.
# Disc #3 has 19 positions; at time=0, it is at position 2.
# Disc #4 has 5 positions; at time=0, it is at position 0.
# Disc #5 has 3 positions; at time=0, it is at position 0.
# Disc #6 has 13 positions; at time=0, it is at position 5.


# Disc #1 has 5 positions; at time=0, it is at position 4.
# Disc #2 has 2 positions; at time=0, it is at position 1.

discs = [(17, 1), (7, 0), (19, 2), (5, 0), (3, 0), (13, 5)] # part 1
discs = [(17, 1), (7, 0), (19, 2), (5, 0), (3, 0), (13, 5), (11, 0)] # part 2


# discs = [(5, 4), (2, 1)]

ball = 0
started = 0
for time in range(10000000000):
    spin = []
    for disc in discs:
        pos, start = disc
        spin.append((start + time) % pos)
        
    if spin[ball] != 0:
        ball = 0
    else:
        if ball == 0:
            started = time
        ball += 1
    
    # print(time, spin)  
    
    if ball == len(discs):
        break
    

print ("Part 1 : ", started - 1)
    