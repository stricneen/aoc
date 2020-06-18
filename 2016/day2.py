f = open('data/day2.txt')
l = f.read()
lines = l.split('\n')

pos = 5

for l in lines:
    if l == '@':
        break
    print(l)
    
    for c in l:
        # print(c)
        if c == 'U' and pos > 3 :
            pos -= 3
        if c == 'D' and pos < 7:
            pos += 3
        if c == 'L' and pos not in [1,4,7]:
            pos -= 1
        if c == 'R' and pos not in [3,6,9]:
            pos += 1
            
    print (pos)
        
        
        
#     1
#   2 3 4
# 5 6 7 8 9
#   A B C
#     D