f = open('data/day22.txt')
l = f.read()
lines = l.split('\n')

nodes = []
for l in lines:
    if l == '@':
        break
    
    # Filesystem              Size  Used  Avail  Use%
    # /dev/grid/node-x0-y0     85T   69T    16T   81%
    
    if l.startswith('/dev/'):
        s = [x for x in l.split(' ') if x]
        tn = lambda x: int(x[:-1])
        x = (s[0], tn(s[1]), tn(s[2]), tn(s[3]), tn(s[4]))
        nodes.append(x)

print(nodes[0])