f = open('data/day22.txt')
l = f.read()
lines = l.split('\n')

nodes = []
for l in lines:
    if l == '@':
        break
    

    
    if l.startswith('/dev/'):
        s = [x for x in l.split(' ') if x]
        tn = lambda x: int(x[:-1])
        x = (s[0], tn(s[1]), tn(s[2]), tn(s[3]), tn(s[4]))
        nodes.append(x)

viable = 0
for a in nodes:
    
    for b in nodes:
        
        if a[0] == b[0] or a[2] == 0:
            continue
        
        # Filesystem              Size  Used  Avail  Use%
        # /dev/grid/node-x0-y0     85T   69T    16T   81%
        if a[2] <= b[3]:
            viable += 1


print("Part 1", viable)

# 918729