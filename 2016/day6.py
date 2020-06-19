from collections import Counter

f = open('data/day6.txt')
l = f.read()
lines = l.split('\n')
out= ''
for pos in range(0, len(lines[0])):
    s = []
    for l in lines:
        s.append(l[pos])
    t = Counter(s)
    print(t)
    max = 10000
    l = ''
    for tt in t:
        if t[tt] < max:
            l = tt
            max = t[tt]
    out += l
print (out)

    
#    wkbvmikb
#    evakwaga
        