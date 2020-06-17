
f = open('data/day1.txt')
l = f.read()

print (l.split(','))

for val in l.split(','):
    val = val.strip()
    print (val[0])
    print (val[1])
    # print (val[2])