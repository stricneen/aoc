from collections import deque

valves = {}
tunnels = {}

for line in open("./data/day.txt", "r"):
    line = line.strip()
    valve = line.split()[1]
    flow = int(line.split(";")[0].split("=")[1])
    targets = line.split("to ")[1].split(" ", 1)[1].split(", ")
    valves[valve] = flow
    tunnels[valve] = targets

dists = {}
nonempty = []

for valve in valves:
    if valve != "AA" and not valves[valve]:
        continue
    
    if valve != "AA":
        nonempty.append(valve)

    dists[valve] = {valve: 0, "AA": 0}
    visited = {valve}
    
    queue = deque([(0, valve)])
    
    while queue:
        distance, position = queue.popleft()
        for neighbor in tunnels[position]:
            if neighbor in visited:
                continue
            visited.add(neighbor)
            if valves[neighbor]:
                dists[valve][neighbor] = distance + 1
            queue.append((distance + 1, neighbor))

    del dists[valve][valve]
    if valve != "AA":
        del dists[valve]["AA"]

indices = {}

for index, element in enumerate(nonempty):
    indices[element] = index

print(dists)
print()
print(indices)


# thh={'AA': {'DD': 1, 'BB': 1, 'CC': 2, 'EE': 2, 'JJ': 2, 'HH': 5}, 
#      'BB': {'CC': 1, 'DD': 2, 'EE': 3, 'JJ': 3, 'HH': 6}, 
#      'CC': {'DD': 1, 'BB': 1, 'EE': 2, 'JJ': 4, 'HH': 5}, 
#      'DD': {'CC': 1, 'EE': 1, 'BB': 2, 'JJ': 3, 'HH': 4}, 
#      'EE': {'DD': 1, 'CC': 2, 'HH': 3, 'BB': 3, 'JJ': 4}, 
#      'HH': {'EE': 3, 'DD': 4, 'CC': 5, 'BB': 6, 'JJ': 7}, 
#      'JJ': {'DD': 3, 'BB': 3, 'CC': 4, 'EE': 4, 'HH': 7}}


cache = {}

def dfs(time, valve, bitmask):
    if (time, valve, bitmask) in cache:
        return cache[(time, valve, bitmask)]
    
    maxval = 0
    for neighbor in [valve]:
        bit = 1 << indices[neighbor]
        if bitmask & bit:
            continue
        remtime = time - dists[valve][neighbor] - 1
        if remtime <= 0:
            continue
        maxval = max(maxval, dfs(remtime, neighbor, bitmask | bit) + valves[neighbor] * remtime)
        
    cache[(time, valve, bitmask)] = maxval
    return maxval

# print(valves)
print(dfs(30, "AA", 0))