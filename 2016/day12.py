f = open('data/day12.txt')
l = f.read()
lines = l.split('\n')

a,b,c,d = 0,0,1,0
prog = []
counter = 0
for l in lines:
    if l == '@':
        break
    # print (l)
    prog.append(l)
    
def decide(a,b,c,d,inst):
    if inst == 'a':
        return a
    if inst == 'b':
        return b
    if inst == 'c':
        return c
    if inst == 'd':
        return d
    return int(inst)
    
        
while counter < len(prog):
    inc = 1
    inst = prog[counter].split(' ')
    
    
    if inst[0] == 'jnz':
        if inst[1] == 'a' and a != 0:
            inc = int(inst[2])
        if inst[1] == 'b' and b != 0:
            inc = int(inst[2])
        if inst[1] == 'c' and c != 0:
            inc = int(inst[2])
        if inst[1] == 'd' and d != 0:
            inc = int(inst[2])
        if inst[1].isnumeric() and int(inst[1]) > 0:
            inc = int(inst[2])
            
    
    if inst[0] == 'cpy':
        if inst[2] == 'a':
            a = decide(a,b,c,d,inst[1])
        if inst[2] == 'b':
            b = decide(a,b,c,d,inst[1])
        if inst[2] == 'c':
            c = decide(a,b,c,d,inst[1])
        if inst[2] == 'd':
            d = decide(a,b,c,d,inst[1])
    
    if inst[0] == 'inc':
        if inst[1] == 'a':
            a += 1
        if inst[1] == 'b':
            b += 1
        if inst[1] == 'c':
            c += 1
        if inst[1] == 'd':
            d += 1
        
    if inst[0] == 'dec':
        if inst[1] == 'a':
            a -= 1
        if inst[1] == 'b':
            b -= 1
        if inst[1] == 'c':
            c -= 1
        if inst[1] == 'd':
            d -= 1
            
    counter += inc
    
#    print(inst)
print (a,b,c,d)
    
# 34
# 9227661
    