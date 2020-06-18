f = open('data/day1.txt')
l = f.readline()

facing = 1 # north
pos = (0,0)

visited = []


for val in l.split(','):
    val = val.strip()
    print (val)
    print (val[0], val[1:])

    if val[0] == 'L':
        facing -=1
    if val[0] == 'R':
        facing += 1

    if facing == 0:
        facing = 4
    if facing == 5:
        facing = 1

    dist = int(val[1:])
    if facing == 1:
        for i in range(1,dist+1):
            visited.append((pos[0], pos[1] + i))
        pos = (pos[0], pos[1] + dist)
        
    if facing == 2:
        for i in range(1,dist+1):
            visited.append((pos[0] + i, pos[1]))
        pos = (pos[0] + dist, pos[1])
    if facing == 3:
        for i in range(1,dist+1):
            visited.append( (pos[0], pos[1] - i))
        pos = (pos[0], pos[1] - dist)
    if facing == 4:
        for i in range(1,dist+1):
            visited.append((pos[0] -i, pos[1]))
        pos = (pos[0] -dist, pos[1])

# print (pos)

print (abs(pos[0]) + abs(pos[1]) )
# print(visited)

first = set()
for i in visited:
    if i in first:
        print ('First visited')
        print (i)
        print (abs(i[0]) + abs(i[1]) )
        break
    else:
        first.add(i)