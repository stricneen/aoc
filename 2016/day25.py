f = open('data/day25.txt')
l = f.read()
lines = l.split('\n')

a,b,c,d = 7,0,0,0
prog = []



for l in lines:
    if l == '@':
        break
    # print (l)
    prog.append(l)
    

    
def execute(prog, reg):  
    
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
    
    a ,b, c, d = reg
    counter = 0      
    while counter < len(prog):
        inc = 1
        inst = prog[counter].split(' ')
        
        if inst[0] == 'jnz':
            if inst[2] == 'a' and a != 0:
                inc = a
            elif inst[2] == 'b' and b != 0:
                inc = b
            elif inst[2] == 'c' and c != 0:
                inc = c
            elif inst[2] == 'd' and d != 0:
                inc = d
            
            elif inst[1] == 'a' and a != 0:
                inc = int(inst[2])
            elif inst[1] == 'b' and b != 0:
                inc = int(inst[2])
            elif inst[1] == 'c' and c != 0:
                inc = int(inst[2])
            elif inst[1] == 'd' and d != 0:
                inc = int(inst[2])
            elif inst[1].isnumeric() and int(inst[1]) > 0:
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
                
        if inst[0] == 'tgl':
            
            # get inst
            reg = decide(a,b,c,d,inst[1])
            if counter+reg < len(prog):
                tglinst = prog[counter + reg].split(' ')
                
                if len(tglinst) == 2:
                    if tglinst[0] == 'inc':
                        prog[counter + reg] = 'dec ' + tglinst[1]
                    else:
                        prog[counter + reg] = 'inc ' + tglinst[1]
                
                if len(tglinst) == 3:
                    if tglinst[0] == 'jnz':
                        prog[counter + reg] = 'cpy ' + tglinst[1] + ' ' + tglinst[2]
                    else:
                        prog[counter + reg] = 'jnz ' + tglinst[1] + ' ' + tglinst[2]
            
        if inst[0] == 'out':
            if inst[1].isnumeric():
                print(inst[1])
            if inst[1] == 'a':
                print(a)
            if inst[1] == 'b':
                print(b)
            if inst[1] == 'c':
                print(c)
            if inst[1] == 'd':
                print(d)
                    
                
        counter += inc
        
execute(prog, (7,0,0,0))
        


    