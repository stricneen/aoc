f = open('data/day11.txt')
l = f.read()
lines = l.split('\n')

for l in lines:
    if l == '@':
        break
    print (l)