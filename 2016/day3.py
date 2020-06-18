def isTri(s1,s2,s3) -> int:
    return s1 + s2 > s3 and s2 + s3 > s1 and s1 + s3 > s2

def checkBuffer(buffer):
    c = 0
    if isTri(buffer[0][0], buffer[1][0], buffer[2][0]):
        c +=1
    if isTri(buffer[0][1], buffer[1][1], buffer[2][1]):
        c +=1
    if isTri(buffer[0][2], buffer[1][2], buffer[2][2]):
        c +=1
    return c

f = open('data/day3.txt')
l = f.read()
lines = l.split('\n')
c=0
c2=0

buffer = []
b = 0
for l in lines:
    if l == '@':
        break

    sides = list(filter(None, l.strip().split(" ")))
    # print (sides)
    
    s1 = int(sides[0].strip())
    s2 = int(sides[1].strip())
    s3 = int(sides[2].strip())
    
    if isTri(s1,s2,s3):
        c+=1

    if b in [0,1,2]:
        buffer.append([s1,s2,s3])
        b+=1
    
    if b == 3:
        c2 += checkBuffer(buffer)
        buffer=[]
        b=0
    

print (c)
print (c2)

