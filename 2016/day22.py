import time
import cm


def tomatrix(nodes):
    w, h = 0, 0
    for n in nodes:
        if n[0][0] > w:
            w = n[0][0]
        if n[0][1] > h:
            h = n[0][1]

    matrix = [[0 for x in range(h + 1)] for y in range(w + 1)] 

    def find(x,y):
        for n in nodes:
            if n[0][0] == x and n[0][1] == y:
                return n

    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            n = find(i,j)
            matrix[i][j] = (str(n[2]) + '/' + str(n[1]) ,n)
    
    return matrix

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

        p = s[0].split('-')
        coords = (int(p[1][1:]), int(p[2][1:]))
        x = (coords, tn(s[1]), tn(s[2]), tn(s[3]), tn(s[4]))
        nodes.append(x)

matrix = tomatrix(nodes)

cm.ptm(matrix)

print("Part 2")










# viable = 0
# for a in nodes:
#     for b in nodes:
#         if a[0] == b[0] or a[2] == 0:
#             continue
#         if a[2] <= b[3]:
#             viable += 1

# Filesystem              Size  Used  Avail  Use%
# /dev/grid/node-x0-y0     85T   69T    16T   81%
# print("Part 1", viable)


