from os import killpg


f = open('data/day20.txt')
l = f.read()
lines = l.split('\n')

ranges = {}

for l in lines:
    if l == '@':
        break
    l = l.split('-')
    ranges[int(l[0])] = int(l[1])

t = ranges[0]
free = []

for k in sorted(ranges):
    #print (k, ranges[k])
    if t + 2<= k:
        free.append ((t,k))
        print ("Part 1", t+1)
        break
    t = ranges[k]



combined = {}
# test = { 1:2, 3:4, 6:8, 7:9, 11:16, 12:15, 20:22, 30:35,  }
# test2 = { 11:16, 12:15, 20:22 }
test = ranges
for l in sorted(test):
    u = test[l]
    add = True
    for x in combined:
        y = combined[x]
        
        if l >= x and u <= y:
            add = False
            break
        
        if (l-1) <= y:
            combined[x] = u
            add = False
        
    if add:
        combined[l] = u





part2 = 0
t = combined[0]
for k in sorted(combined):
    #print (k, ranges[k])
    part2 += k - t - 1
    if part2 < 0:
        part2 = 0
    t = combined[k]
    
    
print ("Part 2", part2)


