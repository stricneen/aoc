f = open('data/day2.txt')
l = f.read()
lines = l.split('\n')

pos = 5
pos2 = 5

for l in lines:
    if l == '@':
        break
    print(l)
    
    # Part 1
    for c in l:
        # print(c)
        if c == 'U' and pos > 3 :
            pos -= 3
        elif c == 'D' and pos < 7:
            pos += 3
        elif c == 'L' and pos not in [1,4,7]:
            pos -= 1
        elif c == 'R' and pos not in [3,6,9]:
            pos += 1   
            
        
        if c == 'U' and pos2 in [3,13]:
            pos2 -= 2
        elif c == 'U' and pos2 in [6,7,8,10,11,12]:
            pos2 -= 4
        elif c == 'D' and pos2 in [1,11]:
            pos2 += 2
        elif c == 'D' and pos2 in [2,3,4,6,7,8]:
            pos2 += 4
        elif c == 'L' and pos2 not in [1,2,5,10,13]:
            pos2 -= 1
        elif c == 'R' and pos2 not in [1,4,9,12,13]:
            pos2 += 1   
#     1
#   2 3 4
# 5 6 7 8 9
#   A B C
#     D

           
         
            
            
            
    #print (pos)
    print (pos2)
    
    
        
        