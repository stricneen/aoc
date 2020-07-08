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
for k in sorted(ranges):
    if t + 2<= k:
        print (t+1)
        break
    t = ranges[k]
    
    
# print (sorted(ranges))
    
    