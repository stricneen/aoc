from os import name


f = open('data/day24.txt')
l = f.read()
lines = l.split('\n')

lns = []
for l in lines:
    if l == '@':
        break
    lns.append(l)
    # print(l)
    
dists = {}
pos = {}
matrix = [['' for x in range(len(lines[1]))] for y in range(len(lns))] 
for i in range(len(lns[0])):
    for j in range(len(lns)):
        matrix[j][i] = lns[j][i]
        if matrix[j][i].isnumeric():
            dists[matrix[j][i]] = []
            pos[matrix[j][i]] = (j,i)

for start in pos:
    
    dist = 0
    vlen = 0
    visited = { (start,pos[start][0], pos[start][1], dist) : True }
    x, y = pos[start]
    
    while vlen != len(visited):
        
        dist += 1
        vlen = len(visited)
        add = []
        for _,x,y,d in visited:
            if d+1 < dist:
                continue
            
            if (matrix[x-1][y].isnumeric() or matrix[x-1][y] == '.') and not any(v[1] == x-1 and v[2]==y for v in visited):
                add.append((matrix[x-1][y],x-1,y, dist))
            if (matrix[x+1][y].isnumeric() or matrix[x+1][y] == '.') and not any(v[1] == x+1 and v[2]==y for v in visited):
                add.append((matrix[x+1][y],x+1,y, dist))
            if (matrix[x][y-1].isnumeric() or matrix[x][y-1] == '.') and not any(v[1] == x and v[2]==y-1 for v in visited):
                add.append((matrix[x][y-1],x,y-1, dist))
            if (matrix[x][y+1].isnumeric() or matrix[x][y+1] == '.') and not any(v[1] == x and v[2]==y+1 for v in visited):
                add.append((matrix[x][y+1],x,y+1, dist))
        
        for a in add:
            visited[a] = True
    
    for i,_,_,d in visited:
        if i.isnumeric(): # and not any(i == x for x,_ in dists[start]):
            dists[start].append((i,d))
              

start = dists['0']

def tick(states):
    nextstate = []
    for path, dist in states:
        nxt = dists[path[-1]]
        
        for key, ndist in nxt:
            if key not in path:
                
                step = (path + key, dist + ndist)
                
                if len(step[0]) < len(dists):
                    nextstate += tick([step])
                else :
                    nextstate.append(step)
        
    return nextstate
                
        
        


nxt = tick([('0', 0)])

shortest = sorted(nxt, key=lambda tup: tup[1])

print (shortest)

# ('0', 0)
# ('4', 2)
# ('1', 2)
# ('2', 8)
# ('3', 10)

# '0', 0

# 04, 2
# 01, 3
# 02, 8
# 03, 10


