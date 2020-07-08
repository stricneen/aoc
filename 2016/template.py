f = open('data/day20.txt')
l = f.read()
lines = l.split('\n')

ranges = {}

for l in lines:
    if l == '@':
        break

    