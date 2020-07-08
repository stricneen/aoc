inp = 3004953

def calc(num):
    n = 1
    while num >= (2 ** n):
        n += 1
    a = num + (num - (2 ** (n)) + 1)
    return a


def calc2(num):
    elf = 1
    c = []
    for i in range(1, num+1):
        #  what is opposite
        c.append(i)

    while(len(c)>1):
        indx = int((len(c)/2 + c.index(elf)) % len(c))
        
        op = c[indx]
        # print(elf,op)
        c.remove(op)
        ei = c.index(elf)
        if elf > op:
            elf = c[(ei+1)%len(c)]         
        else:
            elf = c[(ei+1)%len(c)]
        
        
    #print(num, c)       
        
    return c[0]
#    1   2 3 4   5 6    7 8 9
def calc2a(num):
    n = 1
    while num >= (3 ** n):
        n += 1
    a = num - 3**(n-1)
    return a

print("Part 1", calc(inp))



# for i in range(3, 300,3):
#      print(i, ',',calc2(i), calc2a(i))
    
    
print("Part 2", calc2a(3004953))
    
# print("Part 2", calc2(inp))