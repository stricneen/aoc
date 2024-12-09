f = open("./data/day.txt", "r").read().splitlines()
# f = open("./data/day16.txt", "r").read().splitlines()

nodes = {} 

for l in f:
    lr = l.split(' ')
    c = [(x.replace(',', '')) for x in lr[9:]]
    nodes[lr[1]] = (int(lr[4][5:].replace(';','')), c)

print(nodes)

def create_graph():
    visit = [(['AA'],0)]
    moves = []
    seen =  []
    while visit:
        at, dist = visit.pop()
        if at[-1] in seen:
            continue

        seen.append(at[-1])
        
        open, tunnels = nodes[at[-1]]
        for tunnel in tunnels:
            o, dest = nodes[tunnel]
            visit.append(([tunnel], 0))
            if o > 0 or tunnel == 'AA':
                moves.append((at + [tunnel], dist + 1))
            else:        
                visit.append((at + [tunnel], dist + 1))

    moves = list(filter(lambda r: r[0][0] != r[0][-1], moves))
    moves = list(map((lambda r: ([r[0][0], r[0][-1]],r[1])), moves))
    moves =  [r for r in moves if r[0][0] != r[0][-1]]
    return moves

def get_nodes(graph):
    temp = []
    for n in graph:
        temp.append(n[0][0])
        temp.append(n[0][1])
    temp = list(filter(lambda r: r != 'AA', temp))
    return set(temp)

graph = create_graph()
nodes = get_nodes(graph)
print()
print(graph)
print(nodes)



# pos, open, closed, minute, pressure
robots = [('AA', set(['AA']), nodes, 0, 0)]

while robots:
    pos, open, closed, minute, pressure = robots.pop()


print(robots)

# print(seen)
