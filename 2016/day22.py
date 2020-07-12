f = open('data/day22.txt')
l = f.read()
lines = l.split('\n')


for l in lines:
    if l == '@':
        break
    print(l)
    