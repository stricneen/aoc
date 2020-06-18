f = open('data/day3.txt')
l = f.read()
lines = l.split('\n')
c=0
for l in lines:
    if l == '@':
        break
    
    sides = list(filter(None, l.strip().split(" ")))
    print (sides)
    
    s1 = int(sides[0].strip())
    s2 = int(sides[1].strip())
    s3 = int(sides[2].strip())
    
    if s1 + s2 > s3 and s2 + s3 > s1 and s1 + s3 > s2:
        c+=1

    
        # 1034
        
    

print (c)